import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import UserProvider from './contexts/user/UserProvider';
import { CategoriesProvider } from './contexts/post/CategoriesContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <CategoriesProvider>
        <div className="App">
          <AppRouter/>
        </div>
      </CategoriesProvider>
    </UserProvider>
  );
}

export default App;
