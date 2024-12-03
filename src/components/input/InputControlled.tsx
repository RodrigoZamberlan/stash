import React from "react";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    value: string | number;
    handleChange: React.ChangeEventHandler<HTMLInputElement>
}

const InputControlled: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    placeholder = "",
    required = false,
    value,
    handleChange
}) => {
    return (
    <div className="field">
        <label htmlFor={id}>{label}</label>
        <input id={id} type={type} name={id} placeholder={placeholder} required={required} value={value} onChange={handleChange}/>
    </div>
    );
};

export default InputControlled;