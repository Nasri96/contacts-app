import AuthForm from "../auth/AuthForm";
import { json, redirect } from "react-router-dom";
import { createUser, createAuthToken, createAuthTokenExpiration } from "../../helpers/manage-auth";

export const action = async({ request, params }) => {
    const formData = await request.formData();

    const registerData = {
        username: formData.get("username"),
        password: formData.get("password")
    }

    const url = "http://localhost:2999/register";
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(registerData),
        credentials: "include"
    }

    const response = await fetch(url, config)

    if(response.status === 401) {
        return response;
    }

    if(response.status === 400) {
        return response;
    }

    const user = await response.json();
    const authToken = user.authToken;
    // Create token, user, and expirationToken local storage items
    createAuthToken(authToken);
    createUser(user.username, user.userid);
    createAuthTokenExpiration();
    return redirect(`/${user.userid}/contacts`);
}

const RegisterPage = () => {
    return (
        <AuthForm pageTitle="Register" buttonName="Register" />
    )
}

export default RegisterPage;