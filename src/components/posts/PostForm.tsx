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
import { PostType } from "../../types/PostType";
import { useCreatePost } from "../../hooks/useCreatePost";

const PostForm: React.FC = () => {
    const title = useRef<HTMLInputElement>(null);
    const coverImage = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLInputElement>(null);
    const content = useRef<HTMLTextAreaElement>(null);
    const category = useRef<HTMLSelectElement>(null);
    const status = useRef<HTMLSelectElement>(null);
    const link = useRef<HTMLInputElement>(null);

    const [selectedTags, setSelectedaTags] = useState<Option[]>([]);

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

    const { createPostHandler, loading, errors } = useCreatePost();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {  
        event.preventDefault();

        if (title.current && coverImage.current && content.current && category.current && category.current) {
            const newPost: PostType = {
                title: title.current?.value,
                coverImage: coverImage.current?.value,
                description: description.current?.value || "",
                content: content.current?.value,
                categoryId: parseInt(category.current.value),
                status: status.current?.value || "Actived",
                postTags: selectedTags.map((tag) => ({ tagId: Number(tag.value) })),
                userId: 2, //That needs to be changed to get the user logged ID
                link: link.current?.value || ""
            }

            const postIsCreated = await createPostHandler(newPost);
            if (postIsCreated) {
                console.log("post created successffully");
            }
        } else {
            console.error("All the required fields should not be empty");
        }
    }

    return <div className={styles.postPage}>
        <Form title="Create a Post" handleSubmit={handleSubmit} loading={loading} errors={errors}>
            <InputUncontrolled ref={title} id="title" label="Title" placeholder="Type here the post title" required/>
            <InputUncontrolled ref={coverImage} id="coverImage" label="Cover Image" placeholder="Type here the image's url" required/>
            <InputUncontrolled ref={description} id="description" label="Description" placeholder="Type here a description to the post"/>
            <TextAreaUncontrolled ref={content} id="content" label="Content" placeholder="Type here the post content" required/>
            
            {loadingCategories ? <p>Loading</p> : <SelectSingleOption ref={category} id="selectCategory" label="Select the category" options={categoriesOptions} required/>}
            {errorCategories && <p>{errorCategories}</p>}

            <SelectSingleOption ref={status} id="status" label="Select the status" options={statusOptions} required/>

            {loadingTags ? <p>Loading</p> : <SelectMultipleOptions id="selectTags" label="Select the tags" placeholderInputSearch="Type to search the tag" options={tagsOptions} onSelectionChange={setSelectedaTags}/>}
            {errorTags && <p>{errorTags}</p>}

            <InputUncontrolled ref={link} id="link" label="Link" placeholder="Type the external link if necessary"/>
            
        </Form>
        <div className={styles.secondaryForms}>
            <CategoriesForm/>
            <TagsForm/>
        </div>
    </div>
}

export default PostForm;