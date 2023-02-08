import { redirect } from "react-router-dom";

export const action = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    localStorage.removeItem("authTokenExpiration");
    return redirect("/");
}