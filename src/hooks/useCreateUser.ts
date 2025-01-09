import { useState } from "react";
import { createUser } from "../services/userService";
import { UserType } from "../types/UserType";

export const useCreateUser = () => {
    const [statusCreatingUser, setStatusCreatingUser] = useState("idle");
    
    const createUserHandler = async (userData: UserType) => {
        try {
            setStatusCreatingUser("loading...")
            await createUser(userData);
            setStatusCreatingUser("success");
        } catch (error) {
            setStatusCreatingUser(error instanceof Error ? error.message : "Fail to create the user");
        }
    }

    return {createUserHandler, statusCreatingUser};
}
