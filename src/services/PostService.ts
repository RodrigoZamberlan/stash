import { apiClient } from "./apiClient"
import { Post } from "../types/Post";

export const fetchPosts = async () => {
    return apiClient<Post[]>('/posts');
}

export const createPost = async (postData: Post): Promise<Post> => {
    return apiClient<Post>('/posts/add', {
        method: 'POST',
        body: JSON.stringify(postData),
    });
};

