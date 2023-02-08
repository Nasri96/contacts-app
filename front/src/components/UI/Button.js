import styles from "./Button.module.css";
import { Link } from "react-router-dom";

// buttons => Array[{name: any String, type: "primary", submit: true || false, link: {url: String}, handler: Function}]
// 3 different buttons is possible. Link button, submit button for form and action button which perform onClick event
const Button = ({ buttons, groupButtons }) => {

    return (
        <div className={groupButtons ? styles.controlsContainer : ""}>
            {buttons.map(button => {
                return (
                    <>
                        {button.handler && 
                            <button 
                                key={Math.random() * 1000} 
                                className={styles[button.type]} 
                                type={button.submit ? "submit" : "button"} 
                                onClick={button.handler}>
                                {button.name}
                            </button>
                        }
                        {button.link &&
                            <Link key={Math.random() * 1000} to={button.link.url}>
                                <button 
                                    className={styles[button.type]} 
                                    type={button.submit ? "submit" : "button"}>
                                    {button.name}
                                </button>
                            </Link>
                        }
                        {!button.link && !button.handler &&
                            <button key={Math.random() * 1000} 
                                className={styles[button.type]} 
                                type={button.submit ? "submit" : "button"}>
                                {button.name}
                            </button>
                        }
                    </>
                )
            })}
        </div>
    )
}

export default Button;