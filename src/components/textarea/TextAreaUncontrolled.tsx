import styles from "./TextArea.module.css";
import React from "react";

interface TextAreaUncontrolledProps {
    id: string,
    label: string,
    placeholder?: string,
    content?: string,
    required?: boolean
}

const TextAreaUncontrolled = React.forwardRef<HTMLTextAreaElement, TextAreaUncontrolledProps>(({
    id, 
    label, 
    placeholder, 
    content = "",
    required = false,
}, ref) => {
    return (<div className={styles.containerTextArea}>
        <label htmlFor={id}>{label} {required && "*"}</label>
        <textarea ref={ref} id={id} placeholder={placeholder} required={required} defaultValue={content} />
    </div>)
});

export default TextAreaUncontrolled;