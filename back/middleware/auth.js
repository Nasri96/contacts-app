const { verifyAuthToken } = require("../helpers/auth-helpers");

const middleware = {
    checkIsLoggedIn: (req, res, next) => {
        if(!req.headers.authorization) {
           next({ message: "Authentication failed. Missing Authorization Headers" });
        } else {
            console.log("HEADERS PASSED!");
            const headerValues = req.headers.authorization.split(" ");
            const authToken = headerValues[1];
            try {
                const isValidAuthToken = verifyAuthToken(authToken);
                console.log("Authentication passed!");
            } catch(err) {
                next({err, message: "Authentication failed. Invalid token."});
            }
        }
        
        next();
    },
    checkUserAuthorization: (req, res, next) => {
        const { userid } = req.session;

        if(userid !== req.params.userid) {
            next({ message: "U can't do that. Buahhaha!" });
        } else {
            console.log("Authorization passed!");
            next();
        }
    }
}


module.exports = middleware;