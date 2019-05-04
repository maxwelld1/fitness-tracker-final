const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const axios = require('axios');

const model = {
    async add(senderID, recipientID){
        console.log('Friend request from ' + senderID + ' to ' + recipientID);
        // Check for request already in db
        const requestExists = (await conn.query("SELECT * FROM 2019Spring_Relationships WHERE (person_1=? AND person_2=?) OR (person_1=? AND person_2=?)", [senderID, recipientID, recipientID, senderID])).length > 0;
        if(requestExists){
            throw Error('Request already in DB.');
        }
        await conn.query(
            "INSERT INTO 2019Spring_Relationships (created_at, person_1, person_2, confirmed) VALUES (?)",
            [[new Date(), senderID, recipientID, 0]] 
        );
        return { fr: 'sent' };
    },
    async getPending(id){
        const data = await conn.query(`SELECT R.*, P.ProfilePic FROM 2019Spring_Relationships R JOIN 2019Spring_Users P
                    ON P.id = R.person_1 WHERE R.person_2=? AND R.confirmed=0`, [id]);
        if(!data) {
            return { pendingRequests: 'none' }
        }
        return data;
    },
    async confirm(id){
        const data = await conn.query(`Update 2019Spring_Relationships
                        SET ? WHERE id=?`, [{confirmed: 1 }, id]);
        if(data.length == 0){
            throw Error('Cannot confirm request: no friend request found');
        }
        return data;
    },
    async deleteRequest(id){
        const data = await conn.query(`DELETE FROM 2019Spring_Relationships
                        WHERE id=?`, id);
        if(data.length == 0){
            throw Error('Cannot delete request: no friend request found');
        }
        return data; 
    }
};

module.exports = model;