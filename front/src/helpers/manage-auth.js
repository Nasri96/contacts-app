import { redirect } from "react-router-dom";

// store authToken from db
export const createAuthToken = token => {
    localStorage.setItem("authToken", token);
}

// store expiration date for authToken
export const createAuthTokenExpiration = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 10);
    localStorage.setItem("authTokenExpiration", date);
}

// get expiration date for authToken. if returns > 0 authToken is valid
export const getAuthTokenExpiration = () => {
    const expirationStored = localStorage.getItem("authTokenExpiration");
    const expirationDate = new Date(expirationStored);

    const expiration = expirationDate.getTime();
    const now = new Date().getTime();

    return expiration - now;
}

// get auth token
export const getAuthToken = () => {
    const token = localStorage.getItem("authToken");
    const duration = getAuthTokenExpiration();
    
    if(!token) {
        return null;
    }

    if(duration < 0) {
        return "EXPIRED";
    }

    return token;
}

// used in loaders and actions to redirect if authToken is invalid
export const checkAuth = () => {
    const token = getAuthToken();
    const duration = getAuthTokenExpiration();

    if(!token || duration < 0) {
        return redirect("/login");
    } 

    return null;
}

// store logged in user
export const createUser = (username, userid) => {
    localStorage.setItem("username", username);
    localStorage.setItem("userid", userid);
}

// get logged in user
export const getUser = () => {
    const isWrongAuthToken = getAuthToken();

    // Return null user if token is invalid
    if(!isWrongAuthToken) {
        return null;
    }

    const user = {
        username: localStorage.getItem("username"),
        userid: localStorage.getItem("userid"),
    }

    return user;
}