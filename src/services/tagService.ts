import { Tag } from "../types/Tag";
import { apiClient } from "./apiClient"

export const fetchTags = async () => {
    return apiClient<Tag[]>('/tags');
}

export const createTag = (tagData: Tag) => {
    return apiClient<Tag>('/tags/add', {
        method: 'Post',
        body: JSON.stringify(tagData)
    });
}