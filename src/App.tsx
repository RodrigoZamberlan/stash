import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import UserProvider from './contexts/user/UserProvider';

const App: React.FC = () => {
  return (
    <UserProvider>
    <div className="App">
      <AppRouter/>
    </div>
    </UserProvider>
  );
}

export default App;
