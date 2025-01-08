import { useEffect, useState } from "react";
import styles from "../select/Select.module.css";
import { TagType } from "../../types/TagType";
import { useTags } from "../../contexts/post/TagsContext";

interface SelectTagsProps {
    value?: number[],
    handleChange: (updatedTags: number[]) => void
}

const SelectTags: React.FC<SelectTagsProps> = ({value = [], handleChange}) => {
    const { tags, statusFetchingTags } = useTags();
    const [searchTerm, setSearchTerm] = useState("");
    const [listOfTags, setListOfTags] = useState<TagType[] | null>(null);
    const [selectedTags, setSelectedTags] = useState<number[]>(value);

    const handleCheckboxChange = (tagId: number) => {
        let updatedSelectedTags;

        if (selectedTags.includes(tagId)) {
            updatedSelectedTags = selectedTags.filter(id => id !== tagId);
        } else {
            updatedSelectedTags = [...selectedTags, tagId]
        }

        setSelectedTags(updatedSelectedTags);
        handleChange(updatedSelectedTags);
    }

    useEffect(() => {
       setListOfTags(tags);
    }, [tags]);

    const handleChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const resultsFiltered = tags.filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (searchTerm.length > 0) {
            setListOfTags(resultsFiltered);
        } else {
            setListOfTags(tags);
        }
    }

    if (statusFetchingTags !== "success") {
        return (<p>{statusFetchingTags}</p>)
    }
    
    return (
        <div>
            <label className={styles.selectLabel} htmlFor="postTags">Select some tags</label>
            <input className={styles.inputSearch} type="text" id="searchTerm" placeholder="Type here to search for a tag" onChange={handleChangeSearchInput} value={searchTerm}/>
            <div className={styles.listOfOptions}>
                {listOfTags && listOfTags.map((tag, index) => (
                    <div key={index}>
                        {tag.id !== undefined && <input 
                            id={`checkbox-${tag.name}`}
                            type="checkbox" 
                            value={tag.id}
                            checked={selectedTags.includes(tag.id)}
                            onChange={() => {handleCheckboxChange(tag.id!)}}
                        />}
                        <label htmlFor={`checkbox-${tag.name}`}>{tag.name}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectTags;