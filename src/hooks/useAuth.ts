import { useState } from "react"
import { authUser } from "../services/userService";

export const useAuth = () => {
    const [statusAuth, setStatusAuth] = useState("");

    const authUserHandler = async (email: string, password: string) => {
        try {
            setStatusAuth("loading")
            await authUser(email, password);
            setStatusAuth("success");
            return true;
        } catch (error) {
            setStatusAuth(error instanceof Error ? error.message : "Faild to authenticate");
            return false;
        }
    }

    return {authUserHandler, statusAuth}
}