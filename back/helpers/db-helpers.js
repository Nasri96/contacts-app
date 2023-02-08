const Contact = require("../models/contact");
const User = require("../models/user");

const removeAllContacts = () => {
    Contact.deleteMany({})
    .then(() => {
        console.log("All contacts have been removed.");
    })
    .catch(err => {
        console.log("Something went wrong with deleting contacts", err);
    })
}

const removeAllUsers = () => {
    User.deleteMany({})
    .then(() => {
        console.log("All users have been removed.");
    })
    .catch(err => {
        console.log("Something went wrong with deleting users", err);
    })
}

const printAllUsers = () => {
    User.find({}).populate("contacts")
    .then(users => {
        console.log("ALL USERS", users);
    })
    .catch(err => {
        console.log("Something went wront with printing All Users", err);
    })
}

const printAllContacts = () => {
    Contact.find({})
    .then(contacts => {
        console.log("ALL CONTACTS", contacts);
    })
    .catch(err => {
        console.log("Something went wront with printing All Contacts", err);
    })
}

const clearDatabase = () => {
    removeAllContacts();
    removeAllUsers();
}

module.exports = {
    clearDatabase,
    printAllUsers,
    printAllContacts
}