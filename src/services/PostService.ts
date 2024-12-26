import { apiClient } from "./apiClient"
import { Post } from "../types/Post";

export const fetchPosts = async () => {
    return apiClient<Post[]>('/posts');
}

export const createPost = (postData: Post) => {
    return apiClient<Post>('/posts/add'), {
        method: 'Post',
        body: JSON.stringify(postData)
    }
}

