import { apiClient } from "./apiClient"
import { PostType } from "../types/PostType";
import { PostCrudType } from "../types/PostCrudType";

export const fetchPosts = async () => {
    return apiClient<PostType[]>('/posts');
}

export const getPost = async (id: number) => {
    return apiClient<PostCrudType>(`/posts/${id}`, {
        method: 'GET',
    })
}

export const createPost = async (postData: PostType): Promise<PostType> => {
    return apiClient<PostType>('/posts/add', {
        method: 'POST',
        body: JSON.stringify(postData),
    });
};

export const updatePost = async (id: number, postData: PostType): Promise<PostType> => {
    return apiClient<PostType>(`/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(postData)
    })
}

