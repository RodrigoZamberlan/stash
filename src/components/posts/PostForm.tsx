import { useState } from "react";
import styles from "./Post.module.css";
import Form from "../form/Form";
import CategoriesForm from "../../views/categories/CategoriesForm";
import TagsForm from "../../views/tags/TagsForm";
import { useLocation } from "react-router-dom";
import { PostType } from "../../types/PostType";
import InputControlled from "../input/InputControlled";
import TextAreaControlled from "../textarea/TextAreaControlled";
import { useCreatePost } from "../../hooks/useCreatePost";
import SelectCategory from "./SelectCategory";
import SelectSingleOption from "../select/SelectSingleOption";

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
          ...prev,
          [name]: value  
        }));
    }

    /* There's problem with a mismatch of post types in the front-end to the back-end,
    because to create a post the tag's should be just an array of ids but to get a post needs to bring the entire tag*/
    
    // const handleTagsChange = (updatedTags: TagType[]) => {
    //     setFormData((prev) => ({
    //         ...prev,
    //         postTags: updatedTags
    //     }));
    // }

    let formTitle = "";
    if (formMode === "create") {
        formTitle = "Create a post";
        
    } else {
        formTitle = "Edit the post";
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createPostHandler(formData);
    }

    return <div className={styles.postPage}>
        <Form title={formTitle} handleSubmit={handleSubmit} isFormValid={formData.categoryId !== 0}>
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

            <SelectCategory categoryIdSelected={formData.categoryId} handleChange={handleChange} required={true}/>

            {/* There's problem with a mismatch of post types in the front-end to the back-end,
             because to create a post the tag's should be just an array of ids but to get a post needs to bring the entire tag*/}
            {/* <SelectTags value={formData.postTags} handleChange={handleTagsChange}/> */}

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