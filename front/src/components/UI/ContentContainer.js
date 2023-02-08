import styles from "./ContentContainer.module.css";
import Input from "./Input";


const ContentContainer = props => {
    return (
        <div className={styles.contentContainer}>
            <div className={props.form ? styles.contentHeaderForm : styles.contentHeader}>
                <h2 className={styles.title}>{props.title}</h2>
                {props.form && 
                    <Input inputs={[{title: "Search Contacts", name: "search"}]} onChange={props.onChange} layout="row" />
                }
            </div>
            <div className={styles.contentContent}>
                {props.children}
            </div>
        </div>
    )
}

export default ContentContainer;