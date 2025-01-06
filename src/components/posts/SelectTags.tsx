import { useEffect, useState } from "react";
import styles from "../select/Select.module.css";
import { TagType } from "../../types/TagType";
import { useTags } from "../../contexts/post/TagsContext";

interface SelectTagsProps {
    value?: TagType[],
    handleChange: (updatedTags: TagType[]) => void
}

const SelectTags: React.FC<SelectTagsProps> = ({value = [], handleChange}) => {
    const { tags, statusFetchingTags } = useTags();
    const [searchTerm, setSearchTerm] = useState("");
    const [listOfTags, setListOfTags] = useState<TagType[] | null>(null);
    const [selectedTags, setSelectedTags] = useState<TagType[]>(value);

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

    const isOptionChecked = (tag: TagType) => {
        return selectedTags.some((selected) => selected.id === tag.id);
    }

    const handleOptionToggle = (tag: TagType) => {
        const isSelected = isOptionChecked(tag);

        const updatedSelection = isSelected ? selectedTags.filter((selected) => selected.id !== tag.id) : [...selectedTags, tag];
        setSelectedTags(updatedSelection);
        handleChange(updatedSelection);
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
                        <input 
                            id={`checkbox-${tag.name}`}
                            type="checkbox" 
                            value={tag.id} 
                            checked={isOptionChecked(tag)} 
                            onChange={() => handleOptionToggle(tag)}
                        />
                        <label htmlFor={`checkbox-${tag.name}`}>{tag.name}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectTags;