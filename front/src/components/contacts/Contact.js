import ContentContainer from "../UI/ContentContainer";
import styles from "./Contact.module.css";
import Button from "../UI/Button";
import { useSubmit, useNavigate, Link, useNavigation } from "react-router-dom";
import { useState } from "react";
import ModalOverlay from "../UI/ModalOverlay";
import { BsFacebook, BsTwitter, BsGithub } from "react-icons/bs";

const Contact = ({ contact }) => {
    const [modalIsShown, setModalIsShown] = useState(false);
    const submit = useSubmit();
    const navigate = useNavigate();
    const navigation = useNavigation();

    if(navigation.state === "submitting") {
        document.querySelector("body").style.cursor = "wait";
    } else {
        document.querySelector("body").style.cursor = "auto";
    }

    const navigateBackHandler = e =>{
        navigate(-1);
    }

    const deleteContactHandler = () => {
        submit(null, {
            method: "POST"
        })
    }

    const modalDisplayHandler = e => {
        setModalIsShown(true);
    }

    const modalCancelHandler = e => {
        setModalIsShown(false);
    }

    const modalConfirmHandler = e => {
        setModalIsShown(false);
        deleteContactHandler();
    }

    return (
        <ContentContainer title={`${contact.firstName} ${contact.lastName}`}>
            {modalIsShown && 
                <ModalOverlay 
                    title={`Deleting ${contact.firstName} ${contact.lastName}`} 
                    text="Are you sure you want to delete this contact?" 
                    onClickCancel={modalCancelHandler} 
                    onClickConfirm={modalConfirmHandler} 
                />
            }
            <div className={styles.contact}>
                <div className={styles.contactBasics}>
                    <h3>Basic Info</h3>
                    <p>Name - {contact.firstName}</p>
                    {contact.lastName && <p>{`Last Name - ${contact.lastName}`}</p>}
                    <p>Number - {contact.contactNumber}</p>
                    {contact.email && <p>{`Email - ${contact.email}`}</p>}
                </div>
                <div className={styles.contactSocials}>
                    <h3>Socials</h3>
                    <div className={styles.contactSocialsIcons}>
                        <p><Link to={contact.socials.facebook ? `${contact.socials.facebook}` : "#"}>{contact.socials.facebook && <BsFacebook style={{fontSize: "1.5rem", margin: "6px"}} />}</Link></p>
                        <p><Link to={contact.socials.twitter ? `${contact.socials.twitter}` : "#"}>{contact.socials.twitter && <BsTwitter style={{fontSize: "1.5rem", margin: "6px"}} />}</Link></p>
                        <p><Link to={contact.socials.github ? `${contact.socials.github}`: "#"}>{contact.socials.github && <BsGithub style={{fontSize: "1.5rem", margin: "6px"}} />}</Link></p>
                    </div>
                    
                </div>
            </div>
            <Button 
            buttons={[
                { name:"Back", type: "primary", handler: navigateBackHandler},
                { name: "Edit", type: "primary", submit: false, link: { url: "edit" } }, 
                { name: "Delete", type: "primary", submit: true, link: false, handler: modalDisplayHandler }
                ]} 
            groupButtons={true}
            />
            
        </ContentContainer>
    );
}

export default Contact;