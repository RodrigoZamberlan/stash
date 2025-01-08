import { useRef } from "react";
import Form from "../../components/form/Form";
import InputUncontrolled from "../../components/input/InputUncontrolled";
import { useCreateTag } from "../../hooks/useCreateTag";
import { useTags } from "../../contexts/post/TagsContext";
import { fetchTags } from "../../services/tagService";

const TagsForm: React.FC = () => {
    const { setTags } = useTags();
    const {createTagHandler, loading, errors} = useCreateTag();
    const TagName = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (TagName.current && TagName.current.value) {
            const success = await createTagHandler({"name": TagName.current.value});
            if (success) {
                const updatedTags = await fetchTags();
                setTags(updatedTags);
                TagName.current.value = "";
            }
        }
    }

    return <div className="form">
        <Form title="Create a new Tag" submitTextButton="Add" loading={loading} errors={errors} handleSubmit={handleSubmit}>
            <InputUncontrolled ref={TagName} id="TagName" label="Tag Name" placeholder="Type here the name of the new Tag" required={true}/>
        </Form>
    </div>
}

export default TagsForm;