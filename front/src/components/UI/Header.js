import { useState } from "react";
import styles from "./Header.module.css";
import Dropdown from "./Dropdown";
import { BsList } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { Link, useRouteLoaderData } from "react-router-dom";
import { getUser } from "../../helpers/manage-auth";

const Header = () => {
    const [hamburgerIconIsClicked, setHamburgerIconIsClicked] = useState(false);
    const user = getUser();

    const isMobileTablet = useMediaQuery({
        query: "(max-width: 768px)"
    })
    const isNotMobileTablet = useMediaQuery({
        query: "(min-width: 768px)"
    })
    const hamburgerMenuIsShown = (isMobileTablet && hamburgerIconIsClicked) || isNotMobileTablet;

    const hamburgerMenuHandler = e => {
        setHamburgerIconIsClicked(!hamburgerIconIsClicked);
    }

    
    return (
        <header className={styles.header}>
           <nav className={styles.nav}>
            {hamburgerMenuIsShown &&
            <>
            {user &&
                <Dropdown   
                title={user.username} 
                links={[{title: "Logout", link: "logout", submit: true}]} />
            }
            {!user &&
            <ul className={styles["nav-auth"]}>
                <li><Link to="login">Login</Link></li>
                {isMobileTablet && <li></li>}
            </ul>
            }
            </>
            }
            <ul className={styles["nav-main"]}>
                <h1>
                    <Link to="/">Contacts App</Link>
                </h1>
                {isMobileTablet && <li className={styles.hamburgerIcon} onClick={hamburgerMenuHandler}><Link to="#"><BsList /></Link></li>}
            </ul>
            {hamburgerMenuIsShown &&
                <Dropdown 
                    title="My Contacts" 
                    links={user ? [{ title: "View Contacts", link: `${user.userid}/contacts` }, { title: "Add New Contact", link: `${user.userid}/contacts/new` }]: [] } 
                />
            }
           </nav>
        </header>
    )
}

export default Header;