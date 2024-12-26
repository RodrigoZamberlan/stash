import { useState } from "react";
import { Tag } from "../types/Tag";
import { createTag } from "../services/tagService";

export const useCreateTag = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{message: string} | null>(null); 

    const createTagHandler = async (tagData: Tag) => {
        setLoading(true);

        try {
            await createTag(tagData);
            setErrors(null);
            setLoading(false);
            return true;
        } catch (error) {
            setErrors(error instanceof Error ? error : {message: "Failed to create the tag"});
            setLoading(false);
            return false;
        }
    }

    return {createTagHandler, loading, errors};
}