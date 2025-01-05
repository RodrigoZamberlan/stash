import { apiClient } from "./apiClient"
import { PostType } from "../types/PostType";

export const fetchPosts = async () => {
    return apiClient<PostType[]>('/posts');
}

export const createPost = async (postData: PostType): Promise<PostType> => {
    return apiClient<PostType>('/posts/add', {
        method: 'POST',
        body: JSON.stringify(postData),
    });
};

