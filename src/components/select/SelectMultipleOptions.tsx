import { useState } from "react";
import styles from './Select.module.css';
import { Option } from "./SelectSingleOption";

interface SelectMultipleOptionsProps {
    id: string,
    label: string,
    options: Option[]
}

const SelectMultipleOptions: React.FC<SelectMultipleOptionsProps> = ({id, label, options}) => {
    const [searchTextOption, setSearchTextOption] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<Option[] | null>(options);

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        setSearchTextOption(searchTerm);

        const resultsFiltered = options.filter((option) => option.name.toLowerCase().includes(searchTerm));
        if (searchTerm.length > 0) {
            setFilteredOptions(resultsFiltered);
        } else {
            setFilteredOptions(options);
        }
    }
    
    return (
        <div>
            <label className={styles.selectLabel} htmlFor={id}>{label}</label>
            <input className={styles.inputSearch} type="text" id={id} onChange={handleChangeSearch} value={searchTextOption}/>
            <div className={styles.listOfOptions}>
                {filteredOptions && filteredOptions.map((option, index) => (
                    <div key={index}>
                        <input type="checkbox" value={option.value}/>
                        <label>{option.name}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectMultipleOptions;