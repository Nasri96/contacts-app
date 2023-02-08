import ContactForm from "../contacts/ContactForm";
import { json, useLoaderData } from "react-router-dom";
import { getAuthToken, checkAuth } from "../../helpers/manage-auth";

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

    if(response.status === 403) {
        throw json({message: "U can't do that. Buahhaha!"});
    }

    if(!response.ok) {
        throw json({ message: "Something went wrong. Please try again later." });
    } else {
        return response;
    }
}

const EditContactPage = () => {
    const data = useLoaderData();

    return (
         <ContactForm method="PATCH" pageTitle="Edit Contact" contact={data.contact} buttonName="Update Contact" />
    )
}

export default EditContactPage;