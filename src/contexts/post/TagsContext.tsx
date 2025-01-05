import { createContext, useContext, useEffect, useState } from "react";
import { TagType } from "../../types/TagType";
import { fetchTags } from "../../services/tagService";

interface TagsContextType {
    tags: TagType[];
    setTags: React.Dispatch<React.SetStateAction<TagType[]>>;
    loadingTags: boolean;
    errorTags: string | null;
}

export const TagsContext = createContext<TagsContextType | undefined>(undefined);

export const TagsProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [tags, setTags] = useState<TagType[]>([]);
    const [loadingTags, setLoadingTags] = useState(false);
    const [errorTags, setErrorTags] = useState<string | null>(null);

    useEffect(() => {
        const loadTags = async () => {
            try {
                setLoadingTags(true);
                const tagsFetched = await fetchTags();
                setTags(tagsFetched);
            } catch (error) {
                setLoadingTags(false);
                setErrorTags("Failed to fetch the tags");
                console.error("Failed to fetch the tags", error);
            } finally {
                setLoadingTags(false);
            }
        }

        loadTags();
    }, []);

    return (
        <TagsContext.Provider value={{tags, setTags, loadingTags, errorTags}}>
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