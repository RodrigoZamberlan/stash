import { apiClient } from "./apiClient"
import { UserType } from "../types/UserType";

export const fetchUsers = async () => {
    return apiClient<UserType[]>('/users');
}

export const createUser = async (userData: UserType) => {
    return apiClient<UserType>('/users/register', {
        method: 'Post',
        body: JSON.stringify(userData),
    });
}

export const authUser = async (email: string, password: string) => {
    return apiClient<UserType>('/users/auth', {
        method: 'Post',
        body: JSON.stringify({email, password})
    })
}

export const deleteUser = async (id: string) => {
    return apiClient<void>(`/users/delete/${id}`, { method: 'DELETE' });
}