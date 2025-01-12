import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './views/welcome/Welcome';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Register from './views/register/Register';
import PostsView from './views/posts/PostsView';
import PostManager from './components/posts/PostManager';
import PostForm from './components/posts/PostForm';
import TagsForm from './views/tags/TagsForm';
import CategoriesForm from './views/categories/CategoriesForm';

const PrivateRoute = ({children} : {children: React.ReactNode}) => {
    const isAuthenticated = !!localStorage.getItem("stash_user_token");
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

const AppRouter: React.FC = () => {
    return (<Router>
                <Routes>
                    <Route path='/' element={<Welcome />}></Route>
                    <Route path='/home' element={<Home />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/register' element={<Register />}></Route>

                    <Route path='/posts-dashboard' element={
                        <PrivateRoute>
                            <PostManager />
                        </PrivateRoute>
                        }>
                    </Route>

                    <Route path='/post-create' element={
                        <PrivateRoute>
                            <PostForm />
                        </PrivateRoute>
                        }>
                    </Route>

                    <Route path='/posts-create/:id' element={
                        <PrivateRoute>
                            <PostForm />
                        </PrivateRoute>
                        }>
                    </Route>

                    <Route path='/posts' element={
                        <PrivateRoute>
                            <PostsView />
                        </PrivateRoute>
                        }>
                    </Route>

                    <Route path='/posts' element={
                        <PrivateRoute>
                            <PostsView />
                        </PrivateRoute>
                        }>
                    </Route>

                    <Route path='/category-create' element={
                        <PrivateRoute>
                            <CategoriesForm />
                        </PrivateRoute>
                        }>
                    </Route>

                    <Route path='/tag-create' element={
                        <PrivateRoute>
                            <TagsForm />
                        </PrivateRoute>
                        }>
                    </Route>

                </Routes>
            </Router>);
}

export default AppRouter;