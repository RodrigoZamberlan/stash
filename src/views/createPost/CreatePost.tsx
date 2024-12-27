import { useRef } from "react";
import styles from "./CreatePost.module.css";
import Form from "../../components/form/Form";
import InputUncontrolled from "../../components/input/InputUncontrolled";
import TextAreaUncontrolled from "../../components/textarea/TextAreaUncontrolled";
import SelectSingleOption from "../../components/select/SelectSingleOption";
import { useCategories } from "../../contexts/post/CategoriesContext";
import CategoriesForm from "../categories/CategoriesForm";

const CreatePost: React.FC = () => {
    const title = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLInputElement>(null);
    const content = useRef<HTMLTextAreaElement>(null);
    const category = useRef<HTMLSelectElement>(null);
    const status = useRef<HTMLSelectElement>(null);

    const { categories, loading, error } = useCategories();
    const categoriesOptions = categories.map(category => ({
        "name": category.name,
        "value": category.id,
    }))

    const statusOptions = [{name: "Actived", value: "actived"}, {name: "Arquived", value: "arquived"}];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {  
        event.preventDefault();
        console.log(title.current?.value);
        console.log(description.current?.value);
        console.log(content.current?.value);
        console.log(status.current?.value);
        console.log(category.current?.value);
    }

    return <div className={styles.postPage}>
        <Form title="Create a Post" handleSubmit={handleSubmit}>
            <InputUncontrolled ref={title} id="title" label="Title" placeholder="Type here the post title" required/>
            <InputUncontrolled ref={description} id="description" label="Description" placeholder="Type here a description to the post"/>
            <TextAreaUncontrolled ref={content} id="content" label="Content" placeholder="Type here the post content" required/>
            
            {loading ? <p>Loading</p> : <SelectSingleOption ref={category} id="selectCategory" label="Select the category" options={categoriesOptions} required/>}
            {error && <p>{error}</p>}

            <SelectSingleOption ref={status} id="status" label="Select the status" options={statusOptions} required/>
            
        </Form>
        <div className={styles.secondaryForms}>
            <CategoriesForm/>
        </div>
    </div>
}

export default CreatePost;