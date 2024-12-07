import { useState } from "react"
import { authUser } from "../services/userService";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{message: string} | null>(null);

    const authUserHandler = async (email: string, password: string) => {
        setLoading(true);

        try {
            await authUser(email, password);
            setErrors(null);
            setLoading(false);
            return true;
        } catch (error) {
            setErrors(error instanceof Error ? error : {"message": "Failed to authenticate the user"});
            setLoading(false);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {authUserHandler, loading, errors}
}