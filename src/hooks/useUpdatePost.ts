import { useState } from "react";
import { updatePost } from "../services/PostService";
import { PostCrudType } from "../types/PostCrudType";

export const useUpdatePost = () => {
    const [statusUpdatingPost, setStatusUpdatingPost] = useState("idle");

    const updatePostHandler = async (postData: PostCrudType) => {
        try {
            setStatusUpdatingPost("loading");
            if (postData.id) {
                await updatePost(postData.id, postData);
                setStatusUpdatingPost("success");
            } else {        
                throw new Error("ID not found to update the post");
            }
        } catch (error) {
            setStatusUpdatingPost(error instanceof Error ? error.message : "Fail to update the post");
        }
    }

    return { updatePostHandler, statusUpdatingPost };
}

export default useUpdatePost;