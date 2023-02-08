const jwt = require("jsonwebtoken");
const secretKey = "somesecretkey";

const createAuthToken = username => {
    const token = jwt.sign({ username: username }, secretKey, { expiresIn: "10m"});

    return token;
}

const verifyAuthToken = token => {
    return jwt.verify(token, secretKey);
}


module.exports = {
    createAuthToken,
    verifyAuthToken
}