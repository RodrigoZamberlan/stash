import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './views/welcome/Welcome';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Register from './views/register/Register';
import Categories from './views/categories/CategoriesForm';
import Tags from './views/tags/TagsForm';
import PostForm from './views/post/PostForm';
import PostList from './views/post/PostList';

const AppRouter: React.FC = () => {
    return (<Router>
                <Routes>
                    <Route path='/' element={<Welcome />}></Route>
                    <Route path='/home' element={<Home />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/categories' element={<Categories />}></Route>
                    <Route path='/tags' element={<Tags />}></Route>
                    <Route path='/create-post' element={<PostForm />}></Route>
                    <Route path='/posts' element={<PostList />}></Route>
                </Routes>
            </Router>);
}

export default AppRouter;