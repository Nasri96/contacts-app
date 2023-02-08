import styles from "./Dropdown.module.css";
import { forwardRef, useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, Form } from "react-router-dom";

// title = String, links = [{title: String, link: String}]
const Dropdown = ({ title, links}) => {
    const [dropdownIsShown, setdropdownIsShown] = useState(false);
    const dropdownContainerRef = useRef();
    const liDropdownRef = useRef();

    const isMobileTablet = useMediaQuery({
        query: "(max-width: 768px)"
    });

    const displayDropdownHandler = e => {
        setdropdownIsShown(state => {
                return {
                    top: -dropdownContainerRef.current.offSetTop / 2,
                    left: liDropdownRef.current.offsetLeft + liDropdownRef.current.clientWidth + 10
                }
        });
    }

    const hideDropdownHandler = e => {
        setdropdownIsShown(false);
    }

    return (
        <ul className={styles.dropdownContainer} ref={dropdownContainerRef} onMouseEnter={displayDropdownHandler} onMouseLeave={hideDropdownHandler}>
            <li ref={liDropdownRef}><Link to="#">{title}</Link></li>
            {isMobileTablet && <li></li>}
            {dropdownIsShown && links.length > 0 &&
            <ul style={isMobileTablet ? dropdownIsShown : {}} className={styles.dropdown}>
                {links.map((link, i) => {
                    return (
                        <>
                            {link.submit ? <Form key={i} method="POST" action="logout"><button className={styles.logout}>Logout</button></Form> 
                                        : <li key={i}><Link to={link.link}>{link.title}</Link></li> }
                        </>
                    )
                })} 
            </ul>
            }
        </ul>
        
    )
}

export default Dropdown;