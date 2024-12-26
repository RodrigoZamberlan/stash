import { useRef } from "react";
import Form from "../../components/form/Form";
import InputUncontrolled from "../../components/input/InputUncontrolled";
import { useCreateCategory } from "../../hooks/useCreateCategory";
import { Category } from "../../types/Category";
import { useCategories } from "../../contexts/post/CategoriesContext";

const CategoriesForm: React.FC = () => {
    const { setCategories } = useCategories();
    const {createCategoryHandler, loading, errors} = useCreateCategory();
    const categoryName = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (categoryName.current && categoryName.current.value) {
            const newCategory: Category = { name:  categoryName.current.value };
            const success = await createCategoryHandler(newCategory);
            if (success) {
                setCategories((prevCategories) => [...prevCategories, newCategory]);
                categoryName.current.value = "";
            }
        }
    }

    return <div>
        <Form title="Create a new category" submitTextButton="Add" loading={loading} errors={errors} handleSubmit={handleSubmit}>
            <InputUncontrolled ref={categoryName} id="categoryName" label="Category Name" placeholder="Type here the name of the new category" required={true}/>
        </Form>
    </div>
}

export default CategoriesForm;