import { createContext, useContext, useEffect, useState } from "react";
import { TagType } from "../../types/TagType";
import { fetchTags } from "../../services/tagService";

interface TagsContextType {
    tags: TagType[];
    setTags: React.Dispatch<React.SetStateAction<TagType[]>>;
    statusFetchingTags: string;
}

export const TagsContext = createContext<TagsContextType | undefined>(undefined);

export const TagsProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [tags, setTags] = useState<TagType[]>([]);
    const [statusFetchingTags, setStatusFetchingTags] = useState("idle");

    useEffect(() => {
        const loadTags = async () => {
            try {
                setStatusFetchingTags("loading...");
                const tagsFetched = await fetchTags();
                setTags(tagsFetched);
                setStatusFetchingTags("success");
            } catch (error) {
                setStatusFetchingTags(error instanceof Error ? error.message : "Failed to fetch the tags")
            }
        }

        loadTags();
    }, []);

    return (
        <TagsContext.Provider value={{tags, setTags, statusFetchingTags}}>
            {children}
        </TagsContext.Provider>
    )
}

export const useTags = () => {
    const context = useContext(TagsContext);
    if (!context) {
        throw new Error('useTags must be used within a TagsProvider');
    }
    return context;
}