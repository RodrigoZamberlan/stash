import { createContext } from 'react';
import { User } from '../../types/User';

export const UserContext = createContext<User | undefined>(undefined);
