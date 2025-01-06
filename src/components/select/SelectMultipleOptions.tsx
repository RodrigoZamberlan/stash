import { useState } from "react";
import styles from './Select.module.css';

export type Option = {
    name: string, 
    value: string | number | undefined
}

interface SelectMultipleOptionsProps {
    id: string,
    label: string,
    placeholderInputSearch?: string,
    options: Option[],
    value: Option[],
    handleChange: () => void
}

const SelectMultipleOptions: React.FC<SelectMultipleOptionsProps> = ({
        id,
        label,
        placeholderInputSearch = "Type to search the option",
        options,
        value,
        handleChange
    }) => {
    const [searchTextOption, setSearchTextOption] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<Option[] | null>(options);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>(value);

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        setSearchTextOption(searchTerm);

        const resultsFiltered = options.filter((option) => option.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (searchTerm.length > 0) {
            setFilteredOptions(resultsFiltered);
        } else {
            setFilteredOptions(options);
        }
    }

    const isOptionChecked = (option: Option) => {
        return selectedOptions.some((selected) => selected.value === option.value);
    }

    const handleOptionToggle = (option: Option) => {
        const isSelected = isOptionChecked(option);

        const updatedSelection = isSelected ? selectedOptions.filter((selected) => selected.value !== option.value) : [...selectedOptions, option];
        setSelectedOptions(updatedSelection);
    }
    
    return (
        <div>
            <label className={styles.selectLabel} htmlFor={id}>{label}</label>
            <input className={styles.inputSearch} type="text" id={id} placeholder={placeholderInputSearch} onChange={handleChangeSearch} value={searchTextOption}/>
            <div className={styles.listOfOptions}>
                {filteredOptions && filteredOptions.map((option, index) => (
                    <div key={index}>
                        <input 
                            id={`checkbox-${option.name}`}
                            type="checkbox" 
                            value={option.value} 
                            checked={isOptionChecked(option)} 
                            onChange={() => handleOptionToggle(option)}
                        />
                        <label htmlFor={`checkbox-${option.name}`}>{option.name}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectMultipleOptions;