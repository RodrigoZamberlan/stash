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

    const { categories } = useCategories();
    const options = categories.map(category => ({
        "name": category.name,
        "value": category.id,
    }))

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {  
        event.preventDefault();
        console.log(category.current?.value) 
    }

    return <div className={styles.postPage}>
        <Form title="Create a Post" handleSubmit={handleSubmit}>
            <InputUncontrolled ref={title} id="title" label="Title" placeholder="Type here the post title" required/>
            <InputUncontrolled ref={description} id="description" label="Description" placeholder="Type here a description to the post"/>
            <TextAreaUncontrolled ref={content} id="content" label="Content" placeholder="Type here the post content" required/>
            <SelectSingleOption ref={category} id="selectCategory" label="Select the category" options={options} required/>
        </Form>
        <div className={styles.secondaryForms}>
            <CategoriesForm/>
        </div>
    </div>
}

export default CreatePost;