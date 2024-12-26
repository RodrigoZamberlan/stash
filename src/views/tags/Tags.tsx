import { useEffect, useRef, useState } from "react";
import Form from "../../components/form/Form";
import InputUncontrolled from "../../components/input/InputUncontrolled";
import { useCreateTag } from "../../hooks/useCreateTag";
import List from "../../components/list/List";
import { fetchTags } from "../../services/tagService";

const Tags: React.FC = () => {
    const {createTagHandler, loading, errors} = useCreateTag();
    const TagName = useRef<HTMLInputElement>(null);
    const [listTags, setListTags] = useState<string[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (TagName.current && TagName.current.value) {
            const success = await createTagHandler({"name": TagName.current.value});
            if (success) {
                fetchAllTagsNames();
                TagName.current.value = "";
            }
        }
    }

    const fetchAllTagsNames = async () => {
        const allTags = await fetchTags();
        if (allTags) {
            const allTagsNames = allTags.map(Tag => (Tag.name));
            setListTags(allTagsNames);
        }
    }

    useEffect(() => {
        fetchAllTagsNames();
    }, []);

    return <div className="page">
        <Form title="Create a new Tag" submitTextButton="Add" loading={loading} errors={errors} handleSubmit={handleSubmit}>
            <InputUncontrolled ref={TagName} id="TagName" label="Tag Name" placeholder="Type here the name of the new Tag" required={true}/>
        </Form>

        {listTags.length > 0 ? <List listName="All Tags" itemsToList={listTags}/> : <p>There's no Tags yet, fell free to add the first one</p>}
    </div>
}

export default Tags;