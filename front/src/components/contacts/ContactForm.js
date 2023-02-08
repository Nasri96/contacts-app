import { Form, useActionData, useNavigate, redirect, useNavigation, json } from "react-router-dom";
import Input from "../UI/Input";
import ContentContainer from "../UI/ContentContainer";
import Button from "../UI/Button";
import { getAuthToken, checkAuth } from "../../helpers/manage-auth";
import { useEffect } from "react";
import styles from "./ContactForm.module.css";

export const action = async ({ request, params }) => {
    const isNotAuthenticated = checkAuth();

    if(isNotAuthenticated) {
        return isNotAuthenticated;
    }

    const token = getAuthToken();
    const userId = params.userId;
    const contactId = params.contactId;

    let formData = await request.formData();

    const data = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        contactNumber: formData.get("contactNumber"),
        email: formData.get("email"),
        socials: {
            facebook: formData.get("facebook"),
            twitter: formData.get("twitter"),
            github: formData.get("github")
        }
    }

    let url = `http://localhost:2999/${userId}/contacts`;
    if(request.method === "PATCH") {
        url = `http://localhost:2999/${userId}/contacts/${contactId}`;
    }
    
    const config = {
        method: request.method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data),
        credentials: "include"
    }

    const response = await fetch(url, config);

    if(response.status === 400) {
        return response;
    }

    if(response.status === 403) {
        throw json({message: "U can't do that. Buahhaha!"});
    }

    if(request.method === "PATCH") {
        return redirect(`http://localhost:3000/${userId}/contacts/${contactId}`);
    }

    if(request.method === "POST") {
        return response;
    }
}


const ContactForm = ({ method, pageTitle, contact, buttonName }) => {
    const data = useActionData();
    const navigate = useNavigate();
    const navigation = useNavigation();

    if(navigation.state === "submitting") {
        document.querySelector("body").style.cursor = "wait";
    } else {
        document.querySelector("body").style.cursor = "auto";
    }

    // Navigate to show page after post request
    useEffect(() => {
        if(data && data.contact && data.contact._id) {
            navigate(`/${data.contact.user}/contacts/${data.contact._id}`);
        }
    }, [data, navigate])

    const navigateBackHandler = e =>{
        navigate(-1);
    }

    const inputs = [
        { title: "First Name", name: "firstName", required: true }, 
        { title: "Last Name", name: "lastName"}, 
        { title: "Contact Number", name: "contactNumber", required: true }, 
        { title: "Email", name: "email"}, 
        { title: "Facebook", name: "facebook"}, 
        { title: "Twitter", name: "twitter"}, 
        { title: "Github", name: "github"}
    ];

    let fillInputs = false;
    // Fill inputs if form is in edit mode
    if(contact) {
        fillInputs = [];
        // weird bug when there is no contact.socials
        if(!contact.socials) {
            contact = { ...contact, socials: {} };
        }
        let keys = [...Object.keys(contact), ...Object.keys(contact.socials)];
        const firstLayerKeys = Object.keys(contact).filter(key => {
            const inputName = inputs.find(input => input.name === key);
            return inputName;
        });
        const secondLayerKeys = Object.keys(contact.socials).filter(key => {
            const inputName = inputs.find(input => input.name === key);
            return inputName;
        });
        keys = [...firstLayerKeys, ...secondLayerKeys];
        
        // extract values in first layer of contact object
        inputs.forEach(input => {
            const fillKey = keys.find(key => key === input.name);
            fillInputs.push(contact[fillKey]);
        })
        // extract values in second layer of contact object
        inputs.forEach(input => {
            const fillKey = keys.find(key => key === input.name);
            fillInputs.push(contact.socials[fillKey]);
        })

        // remove undefined values
        fillInputs = fillInputs.filter(fill => fill !== undefined);
    }
    
    return (
        <ContentContainer title={pageTitle}>
            {data && data.error && <p className={styles.textError}>{data.error}</p>}
            <Form method={method}>
                <Input inputs={inputs} layout="column" fill={fillInputs} />
                <Button 
                    buttons={[{name:"Back", type: "primary", handler: navigateBackHandler}, {name: buttonName, type: "primary", submit: true}]} 
                    groupButtons={true}
                />
            </Form>
        </ContentContainer>
    )
}

export default ContactForm;