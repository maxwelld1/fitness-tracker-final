const conn = require('./mysql_connection');

const model = {
    async add(input){
        if(!input.Exercise){
            throw Error('Exercise name is Required');
        }
        if(!input.Sets){
            throw Error('Number of sets is Required');
        }
        if(!input.Reps){
            throw Error('Number of reps is Required');
        }
        if(!input.WorkoutDate){
            throw Error('Workout date required');
        }
        const data = await conn.query(
            "INSERT INTO 2019Spring_exercises (exercise, sets, reps, workout, user) VALUES (?)",
            [[input.Exercise, input.Sets, input.Reps, input.WorkoutDate, input.User]] 
        );
        return await model.get(input.WorkoutDate, input.User);
    },
    async get(date, uid) {
        const data = await conn.query("SELECT * FROM 2019Spring_exercises WHERE workout=? AND user=?", [date, uid]);
        if(!data){
            throw Error("No exercise was done on the specified date.");
        }
        console.log(data);
        return data;
    },
    async getPartial(exercise, uid) {
        const data = await conn.query("SELECT * FROM 2019Spring_exercises WHERE workout LIKE ? AND user=?", ['%'+exercise+'%', uid]);
        if(!data){
            throw Error("No matching exercise names.");
        }
        console.log(data);
        return data;
    },
};

module.exports = model;