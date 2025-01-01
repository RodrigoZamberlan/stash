import { useRef } from "react";
import styles from "./CreatePost.module.css";
import Form from "../../components/form/Form";
import InputUncontrolled from "../../components/input/InputUncontrolled";
import TextAreaUncontrolled from "../../components/textarea/TextAreaUncontrolled";
import SelectSingleOption from "../../components/select/SelectSingleOption";
import { useCategories } from "../../contexts/post/CategoriesContext";
import CategoriesForm from "../categories/CategoriesForm";
import SelectMultipleOptions from "../../components/select/SelectMultipleOptions";
import TagsForm from "../tags/TagsForm";
import { useTags } from "../../contexts/post/TagsContext";

const CreatePost: React.FC = () => {
    const title = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLInputElement>(null);
    const content = useRef<HTMLTextAreaElement>(null);
    const category = useRef<HTMLSelectElement>(null);
    const status = useRef<HTMLSelectElement>(null);

    const { categories, loadingCategories, errorCategories } = useCategories();
    const categoriesOptions = categories.map(category => ({
        "name": category.name,
        "value": category.id,
    }))

    const statusOptions = [{name: "Actived", value: "actived"}, {name: "Arquived", value: "arquived"}];

    const { tags, loadingTags, errorTags } = useTags();
    const tagsOptions = tags.map((tag) => ({
        "name": tag.name,
        "value": tag.id
    }));

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {  
        event.preventDefault();
        //do the submit of all here
    }

    return <div className={styles.postPage}>
        <Form title="Create a Post" handleSubmit={handleSubmit}>
            <InputUncontrolled ref={title} id="title" label="Title" placeholder="Type here the post title" required/>
            <InputUncontrolled ref={description} id="description" label="Description" placeholder="Type here a description to the post"/>
            <TextAreaUncontrolled ref={content} id="content" label="Content" placeholder="Type here the post content" required/>
            
            {loadingCategories ? <p>Loading</p> : <SelectSingleOption ref={category} id="selectCategory" label="Select the category" options={categoriesOptions} required/>}
            {errorCategories && <p>{errorCategories}</p>}

            <SelectSingleOption ref={status} id="status" label="Select the status" options={statusOptions} required/>

            {loadingTags ? <p>Loading</p> : <SelectMultipleOptions id="selectTags" label="Select the tags" placeholderInputSearch="Type to search the tag" options={tagsOptions}/>}
            {errorTags && <p>{errorTags}</p>}
            
        </Form>
        <div className={styles.secondaryForms}>
            <CategoriesForm/>
            <TagsForm/>
        </div>
    </div>
}

export default CreatePost;