import ContactForm from "../contacts/ContactForm";

const NewContactPage = () => {
    return (
            <ContactForm method="POST" pageTitle="Add New Contact" buttonName="Create Contact" />
    )
}

export default NewContactPage;