import { ReactNode } from "react";
import { UserContext } from "./UserContext";

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    return (
        <UserContext.Provider value={undefined}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;