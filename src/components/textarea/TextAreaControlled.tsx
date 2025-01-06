import styles from "./TextArea.module.css";

interface TextAreaControlledProps {
    id: string,
    label: string,
    placeholder?: string,
    required?: boolean
    value: string;
    handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const TextAreaControlled: React.FC<TextAreaControlledProps> = ({
    id, 
    label, 
    placeholder,
    required = false,
    value = "",
    handleChange
}) => {
    return (<div className={styles.containerTextArea}>
        <label htmlFor={id}>{label} {required && "*"}</label>
        <textarea id={id} placeholder={placeholder} required={required} defaultValue={value} value={value} onChange={handleChange} />
    </div>)
}

export default TextAreaControlled;