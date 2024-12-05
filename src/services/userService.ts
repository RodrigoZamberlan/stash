import { apiClient } from "./apiClient"
import { User } from "../types/User";

export const fetchUsers = async () => {
    return apiClient<User[]>('/users');
}

export const createUser = async (userData: User) => {
    return apiClient<User>('/users', {
        method: 'Post',
        body: JSON.stringify(userData),
    });
}

export const deleteUser = async (id: string) => {
    return apiClient<void>(`/users/delete/${id}`, { method: 'DELETE' });
}