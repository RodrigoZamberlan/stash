import { TagType } from "../types/TagType";
import { apiClient } from "./apiClient"

export const fetchTags = async () => {
    return apiClient<TagType[]>('/tags');
}

export const createTag = (tagData: TagType) => {
    return apiClient<TagType>('/tags/add', {
        method: 'Post',
        body: JSON.stringify(tagData)
    });
}