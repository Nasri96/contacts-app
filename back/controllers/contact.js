const Contact = require("../models/contact");
const User = require("../models/user");

const contactController = {
    getContacts: (req, res, next) => {
        console.log(req.session);
        User.findById(req.params.userid).populate("contacts")
        .then(user => {
            if(req.query && req.query.name) {
                const queryName = req.query.name;
                return Contact.find({}).where("user").equals(user._id).or([ { firstName: { $regex: queryName, $options: "i" }}, { lastName: { $regex: queryName, $options: "i"}} ])
            }
            res.json({ contacts: user.contacts });
        })
        .then(contacts => {
            res.json( {contacts: contacts });
        })
        .catch(err => {
            return next(err);
        })
    },
    createContact: (req, res, next) => {
        setTimeout(() => {
            User.findById(req.params.userid)
            .then(user => {
                console.log("CONTACT CREATION IN PROCESS!");
                console.log(req.body);
                return Promise.all([user, Contact.create(req.body)])
            })
            .then(data => {
                const [user, contact] = data;
                console.log("CONTACT CREATED", contact);
                user.contacts.push(contact);
                contact.user = user._id;
    
                return Promise.all([user.save(), contact.save()])
            })
            .then(data => {
                const [user, contact] = data;
    
                console.log("User have been updated.", user);
                console.log("New contact have been added to the user.", contact);
                res.json({ contact: contact });
            })
            .catch(err => {
                return next(err);
            })   
        }, 250);
        
    },
    getContact: (req, res, next) => {
        User.findById(req.params.userid)
        .then(user => {
            return Promise.all([user, Contact.findById(req.params.contactid)])
        })
        .then(data => {
            const [user, contact] = data;
            console.log("CONTACT!", contact);
            res.json({ contact: contact });
        })
        .catch(err => {
            return next(err);
        })
    },
    updateContact: (req, res, next) => {
        setTimeout(() => {
            User.findById(req.params.userid).populate("contacts")
            .then(user => {
                return Promise.all([user, Contact.findByIdAndUpdate(req.params.contactid, req.body, { returnDocument: "after", runValidators: true })])
            })
            .then(data => {
                const [user, contact] = data;
                res.json({ contacts: user.contacts});
                
            })
            .catch(err => {
                next(err);
            })
        }, 250)
    },
    deleteContact: (req, res, next) => {
        setTimeout(() => {
            User.findById(req.params.userid)
            .then(user => {
                return Promise.all([user, Contact.findByIdAndDelete(req.params.contactid)])
            })
            .then(data => {
                const [user, contact] = data;
    
                res.json({ message: "Contact Deleted!" });
            })
            .catch(err => {
                next(err);
            })
        }, 250)
    }
}

module.exports = contactController;