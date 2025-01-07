import React from "react";
import styles from './Select.module.css';

export type Option = {
    name: string, 
    value: string | number
}

interface SelectSingleOptionProps {
    id: string,
    label: string,
    required?: boolean,
    options: Option[] | null,
    defaultMsgNoOptions?: string,
    optionSelected: string | number
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectSingleOption: React.FC<SelectSingleOptionProps> = ({
    id,
    label,
    required = false,
    options,
    defaultMsgNoOptions = "No options yet, create one",
    optionSelected,
    handleChange
}) => {
    return (
        <div>
            <label className={styles.selectLabel} htmlFor={id}>{label}</label>
            {options !== null && options.length > 0 ? 
                <select className={styles.select} id={id} name={id} required={required} value={optionSelected} onChange={handleChange}>
                    {options.map((option, index) => (<option key={index} value={option.value}>{option.name}</option>))}
                </select>
            : (<p>{defaultMsgNoOptions}</p>)}
        </div>
    );
};

export default SelectSingleOption;