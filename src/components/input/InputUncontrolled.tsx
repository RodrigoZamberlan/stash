import React from "react";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
}

const InputUncontrolled = React.forwardRef<HTMLInputElement, InputProps>(({
    id,
    label,
    type = "text",
    placeholder = "",
    required = false,
}, ref) => {
    return (
    <div className="field">
        <label htmlFor={id}>{label}</label>
        <input ref={ref} id={id} type={type} name={id} placeholder={placeholder} required={required}/>
    </div>
    );
});

export default InputUncontrolled;