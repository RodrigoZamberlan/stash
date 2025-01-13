import { useState } from "react";
import styles from "./Post.module.css";
import Form from "../form/Form";
import CategoriesForm from "../../views/categories/CategoriesForm";
import TagsForm from "../../views/tags/TagsForm";
import { useLocation } from "react-router-dom";
import { PostCrudType } from "../../types/PostCrudType";
import InputControlled from "../input/InputControlled";
import TextAreaControlled from "../textarea/TextAreaControlled";
import { useCreatePost } from "../../hooks/useCreatePost";
import SelectCategory from "./SelectCategory";
import SelectSingleOption from "../select/SelectSingleOption";
import useUpdatePost from "../../hooks/useUpdatePost";
import SelectTags from "./SelectTags";

const PostForm: React.FC = () => {
    const defaultFormData = {
        title: "",
        coverImage: "",
        description: "",
        content: "",
        status: "arquived",
        tagsId: [],
        categoryId: 0,
        userId: 2,
        link: ""
    }

    const location = useLocation();
    const postDataFromRoute = location.state?.postData as PostCrudType | undefined;
    const formMode = postDataFromRoute ? "edit" : "create";
    const [formData, setFormData] = useState<PostCrudType>(postDataFromRoute || defaultFormData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
          ...prev,
          [name]: value  
        }));
    }

    const { createPostHandler, statusCreatingPost } = useCreatePost();
    const { updatePostHandler, statusUpdatingPost } = useUpdatePost();
    
    const handleTagsChange = (updatedTagsId: number[]) => {
        setFormData((prev) => ({
            ...prev,
            tagsId: updatedTagsId
        }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formMode === "create") {
            createPostHandler(formData);
            setFormData(defaultFormData);
        } else {
            updatePostHandler(formData);
        }
    }

    return <div className={styles.postFormPage}>
        <Form title={formMode === "create" ? "Create Post" : "Update the Post"} handleSubmit={handleSubmit} isFormValid={formData.categoryId !== 0}>
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
                placeholder="Type here content for the post"
                value={formData.content}
                required={true}
                handleChange={handleChange}
            />

            <SelectCategory categoryIdSelected={formData.categoryId} handleChange={handleChange} required={true}/>

            <SelectTags value={formData.tagsId} handleChange={handleTagsChange}/>

            <SelectSingleOption 
                id="status" 
                label="Status" 
                options={[{name: "Active", value: "active"}, {name: "Arquived", value: "arquived"}]}
                optionSelected={formData.status}
                handleChange={handleChange}
            />

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