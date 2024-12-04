const mongoose = require("mongoose")
require("dotenv").config()

const db = process.env.DB_URL

async function  ConnectDb() {
    try {
        await mongoose.connect(db)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Database Connection failed!!")
    }
}

module.exports = {
	ConnectDb,
};
