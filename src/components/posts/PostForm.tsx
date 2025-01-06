import { useRef, useState } from "react";
import styles from "./Post.module.css";
import Form from "../form/Form";
import InputUncontrolled from "../input/InputUncontrolled";
import TextAreaUncontrolled from "../textarea/TextAreaUncontrolled";
import SelectSingleOption from "../select/SelectSingleOption";
import { useCategories } from "../../contexts/post/CategoriesContext";
import CategoriesForm from "../../views/categories/CategoriesForm";
import SelectMultipleOptions, { Option } from "../select/SelectMultipleOptions";
import TagsForm from "../../views/tags/TagsForm";
import { useTags } from "../../contexts/post/TagsContext";
import { useLocation } from "react-router-dom";
import { PostType } from "../../types/PostType";
import InputControlled from "../input/InputControlled";
import TextAreaControlled from "../textarea/TextAreaControlled";

const PostForm: React.FC = () => {
    const defaultFormData = {
        title: "",
        coverImage: "",
        description: "",
        content: "",
        status: "",
        postTags: [],
        categoryId: 1,
        userId: 2,
        link: ""
    }

    const location = useLocation();
    const postDataFromRoute = location.state?.postData as PostType | undefined;
    const formMode = postDataFromRoute ? "edit" : "create";
    const [formData, setFormData] = useState<PostType>(postDataFromRoute || defaultFormData);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
          ...prev,
          [name]: value  
        }));
    }

    let formTitle = "";
    let handleSubmit = () => {};
    if (formMode === "create") {
        formTitle = "Create a post";
        handleSubmit = () => {};
    } else {
        formTitle = "Edit the post";
        handleSubmit = () => {};
    }

    // const title = useRef<HTMLInputElement>(null);
    // const coverImage = useRef<HTMLInputElement>(null);
    // const description = useRef<HTMLInputElement>(null);
    // const content = useRef<HTMLTextAreaElement>(null);
    // const category = useRef<HTMLSelectElement>(null);
    // const status = useRef<HTMLSelectElement>(null);
    // const link = useRef<HTMLInputElement>(null);

    // const [selectedTags, setSelectedaTags] = useState<Option[]>([]);

    // const { categories, loadingCategories, errorCategories } = useCategories();
    // const categoriesOptions = categories.map(category => ({
    //     "name": category.name,
    //     "value": category.id,
    // }))

    // const statusOptions = [{name: "Actived", value: "actived"}, {name: "Arquived", value: "arquived"}];

    // const { tags, loadingTags, errorTags } = useTags();
    // const tagsOptions = tags.map((tag) => ({
    //     "name": tag.name,
    //     "value": tag.id
    // }));

    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {  
    //     event.preventDefault();

    //     if (title.current && coverImage.current && content.current && category.current && category.current) {
    //         const newPost: PostType = {
    //             title: title.current?.value,
    //             coverImage: coverImage.current?.value,
    //             description: description.current?.value || "",
    //             content: content.current?.value,
    //             categoryId: parseInt(category.current.value),
    //             status: status.current?.value || "Actived",
    //             postTags: selectedTags.map((tag) => ({ tagId: Number(tag.value) })),
    //             userId: 2, //That needs to be changed to get the user logged ID
    //             link: link.current?.value || ""
    //         }

    //         const postIsCreated = await createPostHandler(newPost);
    //         if (postIsCreated) {
    //             console.log("post created successffully");
    //         }
    //     } else {
    //         console.error("All the required fields should not be empty");
    //     }
    // }

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
                handleChange={handleChange}
            />
            {/* <InputUncontrolled ref={title} id="title" label="Title" placeholder="Type here the post title" required/>
            <InputUncontrolled ref={coverImage} id="coverImage" label="Cover Image" placeholder="Type here the image's url" required/>
            <InputUncontrolled ref={description} id="description" label="Description" placeholder="Type here a description to the post"/>
            <TextAreaUncontrolled ref={content} id="content" label="Content" placeholder="Type here the post content" required/> */}
            
            {/* {loadingCategories ? <p>Loading</p> : <SelectSingleOption ref={category} id="selectCategory" label="Select the category" options={categoriesOptions} required/>}
            {errorCategories && <p>{errorCategories}</p>}

            <SelectSingleOption ref={status} id="status" label="Select the status" options={statusOptions} required/> */}

            {/* {loadingTags ? <p>Loading</p> : <SelectMultipleOptions id="selectTags" label="Select the tags" placeholderInputSearch="Type to search the tag" options={tagsOptions} onSelectionChange={setSelectedaTags}/>}
            {errorTags && <p>{errorTags}</p>} */}

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