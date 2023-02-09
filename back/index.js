const express = require("express");
const app = express();
const cors = require("cors");
const util = require("util");
const session = require("express-session");
// connect to db
const db = require("./config/connnect-to-db");
db();

const contactRoutes = require("./routes/contacts");
const authRoutes = require("./routes/index");
const { clearDatabase, printAllContacts, printAllUsers } = require("./helpers/db-helpers");

// Setup cors for fetch
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Setup session
app.use(session({
    secret: "somesecretbuahah",
    resave: false,
    saveUninitialized: true
}));

// Parse json and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// clearDatabase();
// printAllContacts();
// printAllUsers();


app.use(authRoutes);
app.use("/:userid/contacts", contactRoutes);

// Error Handler
app.use((err, req, res, next) => {
    console.log(util.inspect(err));
    if(err.message.toLowerCase().includes("validation failed:")) {
        res.status(400).json({ error: err.message } );
    } 
    if(err.message.includes("Authentication failed.")) {
        res.status(401).json({ error: err.message });
    }
    if(err.message.includes("User validation failed:")) {
        res.status(400).json({ error: "Username and password are required" });
    }
    if(err.message.includes("E11000 duplicate key error")) {
        res.status(400).json({ error: "User with that username already exists"})
    }
    if(err.message === "Password must be at least 6 characters long") {
        res.status(400).json({ error: err.message});
    }
    if(err.message === "U can't do that. Buahhaha!") {
        res.status(403).json({ error: err.message });
    }
    else {
        res.status(500).json({ error: "Something went wrong. Please try again later."});
    }
    
})

app.listen(2999, () => {
    console.log("Server is listening to requests:");
})