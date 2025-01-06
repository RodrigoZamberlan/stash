import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './views/welcome/Welcome';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Register from './views/register/Register';
import Categories from './views/categories/CategoriesForm';
import Tags from './views/tags/TagsForm';
import PostsView from './views/posts/PostsView';
import PostManager from './components/posts/PostManager';
import PostForm from './components/posts/PostForm';

const AppRouter: React.FC = () => {
    return (<Router>
                <Routes>
                    <Route path='/' element={<Welcome />}></Route>
                    <Route path='/home' element={<Home />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/register' element={<Register />}></Route>

                    <Route path='/posts-dashboard' element={<PostManager />}></Route>
                    <Route path='/post-create/' element={<PostForm />}></Route>
                    <Route path='/post-edit/:id' element={<PostForm />}></Route>
                    <Route path='/posts' element={<PostsView />}></Route>

                    <Route path='/categories' element={<Categories />}></Route>
                    <Route path='/tags' element={<Tags />}></Route>

                </Routes>
            </Router>);
}

export default AppRouter;