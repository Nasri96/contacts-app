import styles from "./Input.module.css";

// inputs => [{title: any String, name: String -> name of input name property}]
// layout => "column" || "row"
// fill => [Strings]

const Input = ({ inputs, layout, fill, onChange }) => {
    return (
        <>
            {inputs.map((input,i) => {
                return (
                    <div key={i} className={layout === "row" ? styles.inputContainerRow : layout === "column" ? styles.inputContainerColumn : ""}>
                        <label className={styles.label}>{input.title} {input.required ? " *" : ""}</label>
                        <input onChange={onChange ? onChange : null} name={input.name} className={styles.input} type={input.name === "password" ? "password" : "text"} defaultValue={fill ? fill[i] : undefined} />
                    </div>
                )
            })}
        </>
    )
}

export default Input;