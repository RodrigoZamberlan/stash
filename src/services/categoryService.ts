import { Category } from "../types/Category";
import { apiClient } from "./apiClient"

export const fetchCategories = async () => {
    return apiClient<Category[]>('/categories');
}

export const createCategory = (categoryData: Category) => {
    return apiClient<Category>('/categories/add', {
        method: 'Post',
        body: JSON.stringify(categoryData)
    });
}