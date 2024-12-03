import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Register from './views/register/Register';

const AppRouter: React.FC = () => {
    return (<Router>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                </Routes>
            </Router>);
}

export default AppRouter;