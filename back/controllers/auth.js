const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createAuthToken } = require("../helpers/auth-helpers");

const authController = {
    registerUser: (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        if(req.body.password.length < 6) {
            return next({message: "Password must be at least 6 characters long"})
        }

        bcrypt.hash(password, 10)
        .then(hashed => {
            return User.create({ username: username, password: hashed })
        })
        .then(user => {
            console.log("User created", user);
            const token = createAuthToken(user.username);
            req.session.userid = user._id;
            res.json({ username: user.username, userid: user._id, authToken: token });
        })
        .catch(err => {
            return next(err);
        })
    },
    loginUser: (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;

        User.findOne({ username: username })
        .then(user => {
            return Promise.all([user, bcrypt.compare(password, user.password)])
        })
        .then(data => {
            const [user, isValidPassword] = data;
                if(isValidPassword) {
                    const token = createAuthToken(user.username);
                    req.session.userid = user._id;
                    res.json({ username: user.username, userid: user._id, authToken: token });
                } else {
                    return next({message: "Authentication failed. Incorrect Credentials"});
                }
        })
        .catch(err => {
            return next({message: "Authentication failed. Incorrect Credentials"});
        })
    }
}

module.exports = authController;