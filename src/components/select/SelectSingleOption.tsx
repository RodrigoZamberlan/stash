import styles from './SelectSingleOption.module.css';

export type Option = {
    name: string, 
    value: string
}

interface SelectSingleOptionProps {
    id: string,
    label: string,
    required?: boolean,
    options: Option[] | null,
    defaultMsgNoOptions?: string,
}

const SelectSingleOption: React.FC<SelectSingleOptionProps> = ({id, label, required = false, options, defaultMsgNoOptions = "No options yet, create one"}) => {
    return <div className={styles.selectSingleOption}>
        <label htmlFor={id}>{label}</label>
            {options !== null && options.length > 0 ? 
                <select id={id} required={required}>
                    {options.map((option) => (<option value={option.value}>{option.name}</option>))}
                </select>
            : (<p>{defaultMsgNoOptions}</p>)}
    </div>
}

export default SelectSingleOption;