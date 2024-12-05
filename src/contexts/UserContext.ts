import { createContext } from "react";

type User = {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

export const UserContext = createContext<User | undefined>(undefined);