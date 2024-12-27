import { createContext, ReactNode } from 'react';
import { User } from '../../types/User';

export const UserContext = createContext<User | undefined>(undefined);

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