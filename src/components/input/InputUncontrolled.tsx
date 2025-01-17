
import React from "react";
import styles from './Input.module.css';

interface InputProps {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

const InputUncontrolled = React.forwardRef<HTMLInputElement, InputProps>(({
    id,
    label = "",
    type = "text",
    placeholder = "",
    required = false,
    style,
    className,
}, ref) => {
    return (
    <div className={styles.field}>
        {label && <label htmlFor={id}>{label} {required && "*"}</label>}
        <input ref={ref} id={id} type={type} name={id} placeholder={placeholder} required={required} className={className} style={style}/>
    </div>
    );
});

export default InputUncontrolled;