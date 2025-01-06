import { useState } from "react";
import styles from "./Post.module.css";
import Form from "../form/Form";
import { useCategories } from "../../contexts/post/CategoriesContext";
import CategoriesForm from "../../views/categories/CategoriesForm";
import TagsForm from "../../views/tags/TagsForm";
import { useLocation } from "react-router-dom";
import { PostType } from "../../types/PostType";
import InputControlled from "../input/InputControlled";
import TextAreaControlled from "../textarea/TextAreaControlled";
import SelectTags from "./SelectTags";
import { TagType } from "../../types/TagType";
import { useCreatePost } from "../../hooks/useCreatePost";

const PostForm: React.FC = () => {
    const { createPostHandler, statusCreatingPost } = useCreatePost();

    const defaultFormData = {
        title: "",
        coverImage: "",
        description: "",
        content: "",
        status: "arquived",
        postTags: [],
        categoryId: 0,
        userId: 2,
        link: ""
    }

    const location = useLocation();
    const postDataFromRoute = location.state?.postData as PostType | undefined;
    const formMode = postDataFromRoute ? "edit" : "create";
    const [formData, setFormData] = useState<PostType>(postDataFromRoute || defaultFormData);
    
    console.log(formData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
          ...prev,
          [name]: value  
        }));
    }

    const handleTagsChange = (updatedTags: TagType[]) => {
        setFormData((prev) => ({
            ...prev,
            postTags: updatedTags
        }));
    }

    const { categories, statusFetchingCategories } = useCategories();

    let formTitle = "";
    
    if (formMode === "create") {
        formTitle = "Create a post";
        
    } else {
        formTitle = "Edit the post";
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        createPostHandler(formData);
    }

    return <div className={styles.postPage}>
        <Form title={formTitle} handleSubmit={handleSubmit}>
            <InputControlled
                id="title"
                label="Title"
                placeholder="Type here the post title"
                value={formData.title}
                required={true}
                handleChange={handleChange}
            />

            <InputControlled
                id="coverImage"
                label="Cover Image"
                placeholder="Type here the image's url"
                value={formData.coverImage}
                required={true}
                handleChange={handleChange}
            />

            <InputControlled
                id="description"
                label="Description"
                placeholder="Type here a short description"
                value={formData.description || ""}
                handleChange={handleChange}
            />

            <TextAreaControlled
                id="content"
                label="Content"
                placeholder="Type here a short description"
                value={formData.content}
                required={true}
                handleChange={handleChange}
            />

            <label htmlFor="categories">Select the category</label>
            {statusFetchingCategories === "success" ? <select name="categoryId" id="categoryId" value={formData.categoryId} onChange={handleChange}>
                {categories && categories.map((category, index) => (
                    <option 
                        key={index}
                        value={category.id}
                    >{category.name}</option>
                ))}
            </select> : <p>{statusFetchingCategories}</p>}

            <SelectTags value={formData.postTags} handleChange={handleTagsChange}/>
            
            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="arquived">Arquived</option>
            </select>

            <InputControlled
                id="link"
                label="Link"
                placeholder="Type here a external link"
                value={formData.link || ""}
                handleChange={handleChange}
            />
            
        </Form>
        <div className={styles.secondaryForms}>
            <CategoriesForm/>
            <TagsForm/>
        </div>
    </div>
}

export default PostForm;