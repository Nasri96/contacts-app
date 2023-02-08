import ContentContainer from "../UI/ContentContainer";
import { Form, Link, useNavigate, useActionData, useNavigation } from "react-router-dom";
import Input from "../UI/Input";
import Button from "../UI/Button";
import styles from "./AuthForm.module.css";

const AuthForm = ({ pageTitle, buttonName }) => {
    const navigate = useNavigate();
    const error = useActionData();
    const navigation = useNavigation();

    if(navigation.state === "submitting") {
        document.querySelector("body").style.cursor = "wait";
    } else {
        document.querySelector("body").style.cursor = "auto";
    }

    const navigateBackHandler = e =>{
        navigate(-1);
    }

    const inputs = [
        { title: "Username", name: "username" },
        { title: "Password", name: "password" }
    ]; 


    return (
        <ContentContainer title={pageTitle}>
            {pageTitle === "Register" && 
                <p className={styles.text}>Already have an account? <Link to="/login">Login</Link></p>
            }
            {pageTitle === "Login" && 
                <p className={styles.text}>Don't have an account? <Link to="/register">Register</Link></p>
            }
            {error && error.error &&
                <p className={styles.textError}>{error.error}</p>
            }
            <Form method="POST">
                <Input inputs={inputs} layout="column"/>
                <Button 
                    buttons={[{name:"Back", type: "primary", handler: navigateBackHandler}, {name: buttonName, type: "primary", submit: true}]} 
                    groupButtons={true}
                />
            </Form>
        </ContentContainer>
    )
}

export default AuthForm;