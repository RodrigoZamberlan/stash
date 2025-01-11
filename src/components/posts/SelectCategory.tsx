import styles from "../select/Select.module.css";
import { useCategories } from "../../contexts/post/CategoriesContext";

interface SelectCategoryProps {
    categoryIdSelected: number,
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    required?: boolean
}

const SelectCategory: React.FC<SelectCategoryProps> = ({categoryIdSelected, handleChange, required = false}) => {
    const { categories, statusFetchingCategories } = useCategories();

    return (<div>
        <label className={styles.selectLabel} htmlFor="categoryId">Select the category {required && "*"}</label>
            {statusFetchingCategories === "success" ? <select className={styles.select} name="categoryId" id="categoryId" value={categoryIdSelected} onChange={handleChange} required={required}>
            <option value={0} disabled hidden>Choose one category</option>
                {categories && categories.map((category, index) => (
                    <option 
                        key={index}
                        value={category.id}
                    >{category.name}</option>
                ))}
            </select> : <p>{statusFetchingCategories}</p>}
    </div>)
}

export default SelectCategory;