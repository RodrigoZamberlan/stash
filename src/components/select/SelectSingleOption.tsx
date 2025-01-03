import React from "react";
import styles from './Select.module.css';

export type Option = {
    name: string, 
    value: string | number | undefined
}

interface SelectSingleOptionProps {
    id: string,
    label: string,
    required?: boolean,
    options: Option[] | null,
    defaultMsgNoOptions?: string,
}

const SelectSingleOption = React.forwardRef<HTMLSelectElement, SelectSingleOptionProps>(({
    id,
    label,
    required = false,
    options,
    defaultMsgNoOptions = "No options yet, create one"
}, ref) => {
    return (
        <div>
            <label className={styles.selectLabel} htmlFor={id}>{label}</label>
            {options !== null && options.length > 0 ? 
                <select className={styles.select} ref={ref} id={id} required={required}>
                    {options.map((option, index) => (<option key={index} value={option.value}>{option.name}</option>))}
                </select>
            : (<p>{defaultMsgNoOptions}</p>)}
        </div>
    );
});

export default SelectSingleOption;