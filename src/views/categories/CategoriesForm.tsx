import { useRef } from "react";
import Form from "../../components/form/Form";
import InputUncontrolled from "../../components/input/InputUncontrolled";
import { useCreateCategory } from "../../hooks/useCreateCategory";
import { CategoryType } from "../../types/CategoryType";
import { useCategories } from "../../contexts/post/CategoriesContext";
import { fetchCategories } from "../../services/categoryService";

const CategoriesForm: React.FC = () => {
    const { setCategories } = useCategories();
    const { createCategoryHandler, statusCreatingCategory } = useCreateCategory();
    const categoryName = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (categoryName.current && categoryName.current.value) {
            const newCategory: CategoryType = { name:  categoryName.current.value };
            await createCategoryHandler(newCategory);
            if (statusCreatingCategory === "success") {
                const updatedCategories = await fetchCategories();
                setCategories(updatedCategories);
                categoryName.current.value = "";
            }
        }
    }

    return <div>
        <Form title="Create a new category" submitTextButton="Add" handleSubmit={handleSubmit}>
            <InputUncontrolled ref={categoryName} id="categoryName" label="Category Name" placeholder="Type here the name of the new category" required={true}/>
        </Form>
    </div>
}

export default CategoriesForm;