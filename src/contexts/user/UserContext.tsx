import { createContext, ReactNode } from 'react';
import { UserType } from '../../types/UserType';

export const UserContext = createContext<UserType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    return (
        <UserContext.Provider value={undefined}>
            {children}
        </UserContext.Provider>
    )
}