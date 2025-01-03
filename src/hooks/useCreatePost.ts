import { useState } from "react";
import { createPost } from "../services/PostService";
import { Post } from "../types/Post";

export const useCreatePost = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{message: string} | null>(null); 

    const createPostHandler = async (postData: Post): Promise<boolean> => {
        try {
            setLoading(true);
            setErrors(null);
            await createPost(postData);
            setLoading(false);
            return true;
        } catch (error) {
            setErrors(error instanceof Error ? error : {message: "Failed to create the post"});
            setLoading(false);
            return false;
        }
    };

    return { createPostHandler, loading, errors };
};
