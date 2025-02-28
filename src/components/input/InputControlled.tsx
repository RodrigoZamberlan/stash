import React from "react";
import styles from './Input.module.css';

export interface InputProps {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    value: string;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputControlled: React.FC<InputProps> = ({
    id,
    label = "",
    type = "text",
    placeholder = "",
    required = false,
    value,
    handleChange,
}) => {
    return (
    <div className={styles.field}>
        {label && <label htmlFor={id}>{label} {required && "*"}</label>}
        <input id={id} type={type} name={id} placeholder={placeholder} required={required} value={value} onChange={handleChange}/>
    </div>
    );
};

export default InputControlled;