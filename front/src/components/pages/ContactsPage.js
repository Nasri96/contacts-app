import Contacts from "../contacts/Contacts";
import { json, useLoaderData } from "react-router-dom";
import { getUser, checkAuth, getAuthToken } from "../../helpers/manage-auth";

export const loader = async({ request, params }) => {
    const querySearch = new URL(request.url).searchParams.get("search");

    const isNotAuthenticated = checkAuth();

    if(isNotAuthenticated) {
        return isNotAuthenticated;
    }

    const token = getAuthToken();
    const userId = params.userId;

    let url = `http://localhost:2999/${userId}/contacts`;
    if(querySearch) {
        url = `http://localhost:2999/${userId}/contacts?name=${querySearch}`;
    }
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
        throw json({ message: "Could not load contacts. Please try again later." });
    } else {
        return response;
    }
}

const ContactsPage = () => {
    const data = useLoaderData();

    return (
        <>
         <Contacts contacts={data.contacts} />
        </>
    )
}

export default ContactsPage;