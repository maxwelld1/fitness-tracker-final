const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some kong string..';

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM 2019Spring_Users");   
    },
    async get(id){
        const data = await conn.query("SELECT * FROM 2019Spring_Users WHERE Id=?", id);
        if(!data){
            throw Error("User not found");
        }
        return data[0];
    },
    async getFriends(id){
        const data = await conn.query(`SELECT P.* FROM 2019Spring_Users P JOIN 2019Spring_Relationships R 
                ON ((R.person_1 = P.id AND R.person_2 = ?) OR (R.person_2 = P.id AND R.person_1 = ?)) WHERE P.id != ? AND  R.confirmed = 1`, [id, id, id]);
        console.log(data);
        if (data.length == 0) {
            throw Error('No Friends Found')
        }
        return data;
    },
    async add(input){
        if(!input.Password){
            throw Error('Password is Required');
        }
        if(input.Password.length < 8){
            throw Error('A longer Password is Required');
        }
        // Check for duplicate email in fitness_db
        const emailInUse = (await conn.query("SELECT * FROM 2019Spring_ContactMethods WHERE Value=?", input.Email)).length > 0;
        if(emailInUse){
            throw Error('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(input.Password, SALT_ROUNDS)
        const data = await conn.query(
            "INSERT INTO 2019Spring_Users (FirstName,LastName,Password,created_at) VALUES (?)",
            [[input.FirstName, input.LastName, hashedPassword, new Date()]] 
        );
        // Add contact email
        await conn.query(
            "INSERT INTO 2019Spring_ContactMethods (person_id,Type,Value,created_at) VALUES (?)",
            [[data.insertId, 'email', input.Email, new Date()]] 
        );
        return await model.get(data.insertId);
    },
    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    },
    async login(email, password){
        //console.log({ email, password })
        const data = await conn.query(`SELECT * FROM 2019Spring_Users P
                        Join 2019Spring_ContactMethods CM On CM.Person_Id = P.id
                    WHERE CM.Value=?`, [email]);
        if(data.length == 0){
            throw Error('User Not Found');
        }
        const x = await bcrypt.compare(password, data[0].password);
        if(x){
            const user = { ...data[0], password: null };
            return { user, token: jwt.sign(user, JWT_SECRET) };
        }else{
            throw Error('Wrong Password');
        }
    },
    async facebookLogin(token){
        const fbMe = await axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
        console.log({fbMe});
        const data = await conn.query(`SELECT * FROM 2019Spring_Persons P
                        Join 2019Spring_ContactMethods CM On CM.Person_Id = P.id
                    WHERE CM.Type = 'Facebook' AND CM.Value=?`, fbMe.data.id);
        if(data.length == 0){
            throw Error('User Not Found');
        }
        const user = { ...data[0], password: null };
        return { user, token: jwt.sign(user, JWT_SECRET), oAuthUser: fbMe.data };
    },
    async changePassword(email, oldPassword, newPassword){
        const data = await conn.query(`SELECT * FROM 2019Spring_Persons P
                        Join 2019Spring_ContactMethods CM On CM.Person_Id = P.id
                    WHERE CM.Value=?`, email);
        if(data.length == 0){
            throw Error('User Not Found')
        }
        if(data[0].Password == "" || await bcrypt.compare(oldPassword, data[0].password)){
            const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
            await conn.query(`Update 2019Spring_Persons P
                            Set ?
                        WHERE P.id=?`,[ {Password: hashedPassword }, data[0].id]);
            return { status: "success", message: "Password Succesfully Changed" };
        }else{
            throw Error('Wrong Password');
        }
    }
};

module.exports = model;