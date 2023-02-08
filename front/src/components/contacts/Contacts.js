import React, { useEffect, useState } from "react";
import styles from "./Contacts.module.css";
import ContentContainer from "../UI/ContentContainer";
import { useMediaQuery } from "react-responsive";
import { Link, useSubmit} from "react-router-dom";
import Button from "../UI/Button";

const Contacts = ({ contacts }) => {
    const [contactsDisplay, setContactsDisplay] = useState({nameMode: 0, emailMode: 0, contacts: contacts});
    const isMobileTablet = useMediaQuery({
        query: "(max-width: 768px)"
    });
    const submit = useSubmit();
    console.log(contactsDisplay);

    const searchHandler = e => {
        const formData = new FormData();

        formData.append("search", e.target.value);
        submit(formData, { method: "GET" });
    }

    // update contacts when search request is sent
    useEffect(() => {
        setContactsDisplay(state => {
            return {
                ...state,
                contacts
            }
        })
    }, [contacts])

    const sortByNameHandler = e => {
        setContactsDisplay(state => {
            const mode = state.nameMode === 0 ? 1 : 0;

            return {
                nameMode: mode,
                emailMode: state.emailMode,
                contacts: state.contacts.sort((a, b) => {
                    const nameA = a.firstName.toLowerCase();
                    const nameB = b.firstName.toLowerCase();
        
                    if(state.nameMode === 0) {
                        if (nameA < nameB) {
                            return -1;
                          }
                        if (nameA > nameB) {
                            return 1;
                        }
            
                        return 0;
                    }
                    if(state.nameMode === 1) {
                        if (nameA < nameB) {
                            return 1;
                          }
                        if (nameA > nameB) {
                            return -1;
                        }
            
                        return 0;
                    }
                })
            }
        })
    }

    const sortByEmailHandler = e => {
        setContactsDisplay(state => {
            const mode = state.emailMode === 0 ? 1 : 0;

            return {
                nameMode: state.nameMode,
                emailMode: mode,
                contacts: state.contacts.sort((a, b) => {
                    const emailA = a.email.toLowerCase();
                    const emailB = b.email.toLowerCase();
        
                    if(state.emailMode === 0) {
                        if (emailA < emailB) {
                            return -1;
                          }
                        if (emailA > emailB) {
                            return 1;
                        }
            
                        return 0;
                    }
                    if(state.emailMode === 1) {
                        if (emailA < emailB) {
                            return 1;
                          }
                        if (emailA > emailB) {
                            return -1;
                        }
            
                        return 0;
                    }
                })
            }
        })
    }

    return (
        <ContentContainer title="All Contacts" form={true} onChange={searchHandler}>
            <div className={styles.contactListHeaders}>
                <h4><Button buttons={[{name: "Name", type: "nostyles", handler: sortByNameHandler}]} /></h4>
                <h4>Mobile</h4>
                {!isMobileTablet && <h4><Button buttons={[{name: "Email", type: "nostyles", handler: sortByEmailHandler}]} /></h4>}
            </div>
            <div className={styles.contactList}>
                {contactsDisplay.contacts.map((contact,i) => {
                    { return (
                        <Link to={contact._id} key={i} className={styles.contactItem}>
                            <p>{contact.firstName} {contact.lastName}</p>
                            <p>{contact.contactNumber}</p>
                            {!isMobileTablet && <p>{contact.email}</p>}
                        </Link>
                    )}
                })}
            </div>
        </ContentContainer>
    );
}

export default Contacts;