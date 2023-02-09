import Header from "../UI/Header";
import Container from "../UI/Container";
import { Outlet, useLoaderData } from "react-router-dom";
import ContentContainer from "../UI/ContentContainer";
import { Link, useLocation, useSubmit } from "react-router-dom";
import { useEffect } from "react";
import { getAuthTokenExpiration, getUser } from "../../helpers/manage-auth";

const RootLayout = () => {
    const token = useLoaderData();
    const location = useLocation();
    const user = getUser();
    const submit = useSubmit();
    const isRootLocation = location.pathname === "/";
    
    useEffect(() => {
        if(token === "EXPIRED") {
            submit({}, { method: "POST", action: "/logout" });
            return;
        }

        const duration = getAuthTokenExpiration();
        
        setTimeout(() => {
            submit({}, { method: "POST", action: "/logout" });
        }, duration)
        
    }, [token, submit])

    return (
        <Container>
            <Header />
            {isRootLocation &&
            <ContentContainer title="Welcome To Contacts App">
                <p style={{textAlign: "center"}}><Link to={!user ? "/login" : `${user.userid}/contacts/new`}>{!user ? "Login here" : "Click here"}</Link> to start creating contacts.</p>
            </ContentContainer>
            }
            <Outlet />
        </Container>
    )
}

export default RootLayout;

