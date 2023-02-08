import Contact from "../contacts/Contact";
import { json, redirect, useLoaderData } from "react-router-dom";
import { checkAuth, getUser, getAuthToken } from "../../helpers/manage-auth";

export const loader = async ({ request, params }) => {
    const isNotAuthenticated = checkAuth();

    if(isNotAuthenticated) {
        return isNotAuthenticated;
    }

    const token = getAuthToken();
    const userId = params.userId;
    const contactId = params.contactId;

    const url = `http://localhost:2999/${userId}/contacts/${contactId}`;
    const config = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        },
        credentials: "include"
    }

    const response = await fetch(url, config);

    if(!response.ok) {
        throw { message: "Something went wrong. Please try again later." };
    } else {
        return response;
    }
}

export const action = async ({ request, params }) => {
    const isNotAuthenticated = checkAuth();

    if(isNotAuthenticated) {
        return isNotAuthenticated;
    }

    const token = getAuthToken();
    const userId = params.userId;
    const contactId = params.contactId;

    const url = `http://localhost:2999/${userId}/contacts/${contactId}`;
    const config = {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        },
        credentials: "include"
    }

    const response = await fetch(url, config);

    if(response.status === 403) {
        throw json({message: "U can't do that. Buahhaha!"});
    }

    if(!response.ok) {
        throw json({ message: "Could not delete contact. Try again later." });
    } else {
        return redirect(`/${userId}/contacts`);
    }
}

const ContactPage = () => {
    const { contact } = useLoaderData();

    return (
        <Contact contact={contact} />
    )
}

export default ContactPage;