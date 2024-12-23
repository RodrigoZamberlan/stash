import { useState } from "react";
import { createUser } from "../services/userService";
import { User } from "../types/User";

export const useCreateUser = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{message: string} | null>(null);
    
    const createUserHandler = async (userData: User) => {
        setLoading(true);

        try {
            await createUser(userData);
            setErrors(null);
            setLoading(false);
            return true;
        } catch (error) {
            setErrors(error instanceof Error ? error : {"message":"Failed to create user"});
            setLoading(false);
            return false;
        }
    }

    return {createUserHandler, loading, errors};
}
