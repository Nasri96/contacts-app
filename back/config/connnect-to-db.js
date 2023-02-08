const mongoose = require("mongoose");

const defaultConnection = "mongodb://127.0.0.1:27017/contacts";

const connectToDb = () => {
    mongoose.connect(defaultConnection)
    .then(() => {
        console.log("Connected to the db");
    })
    .catch(err => {
        console.log("Error connection to the db:", err);
    })
}

module.exports = connectToDb;