import { useEffect, useRef, useState } from "react";
import Form from "../../components/form/Form";
import InputUncontrolled from "../../components/input/InputUncontrolled";
import { useCreateCategory } from "../../hooks/useCreateCategory";
import List from "../../components/list/List";
import { fetchCategories } from "../../services/categoryService";

const Categories: React.FC = () => {
    const {createCategoryHandler, loading, errors} = useCreateCategory();
    const categoryName = useRef<HTMLInputElement>(null);
    const [listCategories, setListCategories] = useState<string[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (categoryName.current && categoryName.current.value) {
            const success = await createCategoryHandler({"name": categoryName.current.value});
            if (success) {
                fetchAllCategoriesNames();
                categoryName.current.value = "";
            }
        }
    }

    const fetchAllCategoriesNames = async () => {
        const allCategories = await fetchCategories();
        if (allCategories) {
            const allCategoriesNames = allCategories.map(category => (category.name));
            setListCategories(allCategoriesNames);
        }
    }

    useEffect(() => {
        fetchAllCategoriesNames();
    }, []);

    return <div className="page">
        <Form title="Create a new category" submitTextButton="Add" loading={loading} errors={errors} handleSubmit={handleSubmit}>
            <InputUncontrolled ref={categoryName} id="categoryName" label="Category Name" placeholder="Type here the name of the new category" required={true}/>
        </Form>

        {listCategories.length > 0 ? <List listName="All Categories" itemsToList={listCategories}/> : <p>There's no categories yet, fell free to add the first one</p>}
    </div>
}

export default Categories;