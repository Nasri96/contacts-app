import { redirect } from "react-router-dom";
import AuthForm from "../auth/AuthForm";
import { createAuthToken, createUser, createAuthTokenExpiration } from "../../helpers/manage-auth";

export const action = async({ request, params }) => {
    const formData = await request.formData();

    const loginData = {
        username: formData.get("username"),
        password: formData.get("password")
    }

    const url = "http://localhost:2999/login";
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(loginData),
        credentials: "include"
    }

    const response = await fetch(url, config)

    if(response.status === 401) {
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

const LoginPage = () => {
    return (
        <AuthForm pageTitle="Login" buttonName={"Login"} />
    )
}

export default LoginPage;