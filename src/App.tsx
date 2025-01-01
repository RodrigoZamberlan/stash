import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import { UserProvider } from './contexts/user/UserContext';
import { CategoriesProvider } from './contexts/post/CategoriesContext';
import { TagsProvider } from './contexts/post/TagsContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <CategoriesProvider>
        <TagsProvider>
          <div className="App">
            <AppRouter/>
          </div>
        </TagsProvider>
      </CategoriesProvider>
    </UserProvider>
  );
}

export default App;
