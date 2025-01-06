import { useState } from "react";
import { createPost } from "../services/PostService";
import { PostType } from "../types/PostType";

export const useCreatePost = () => {
    const [statusCreatingPost, setStatusCreatingPost] = useState("idle");

    const createPostHandler = async (postData: PostType) => {
        try {
            setStatusCreatingPost("loading...");
            await createPost(postData);
            setStatusCreatingPost("success");
        } catch (error) {
            setStatusCreatingPost(error instanceof Error ? error.message : "Failed to create the post");
        }
    };

    return { createPostHandler, statusCreatingPost };
};
