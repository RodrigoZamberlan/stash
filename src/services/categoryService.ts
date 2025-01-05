import { CategoryType } from "../types/CategoryType";
import { apiClient } from "./apiClient"

export const fetchCategories = async () => {
    return apiClient<CategoryType[]>('/categories');
}

export const createCategory = (categoryData: CategoryType) => {
    return apiClient<CategoryType>('/categories/add', {
        method: 'Post',
        body: JSON.stringify(categoryData)
    });
}