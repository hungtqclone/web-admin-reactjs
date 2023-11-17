import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Navigate, Outlet, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import Login from './components/users/Login';
import List from './components/news/List';
import Add from './components/news/Add';
import Edit from './components/news/Edit';
import ListTopic from './components/topics/ListTopic';
import News from './components/news/news';
import Topics from './components/topics/topics';

function App() {

  //đọc thông tin user từ localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return null
  }

  //Lưu thông tin user vào localStorage
  const saveUserToLocalStorage = (userInfo) => {
    if (!userInfo) {
      localStorage.removeItem('user');
      setUser(null);
      return
    }
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
  }
  const [user, setUser] = useState(getUserFromLocalStorage);
  //những components phải đăng nhập mới được truy cập
  const ProtectedRoute = () => {
    if (user) {
      return <Outlet />
    }
    return <Navigate to="/login" />
  }
  const PublicRoute = () => {
    if (user) {
      return <Navigate to="/" />
    }
    return <Outlet />
  }
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login saveUser={saveUserToLocalStorage} />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<List user={user} />} />
            {/* <Route path="/add" element={<Add user={user} />} /> */}
            <Route path="/edit/:id" element={<Edit />} />
            {/* <Route path="/" element={<News user={user} />} /> */}
            <Route path="/list-topics" element={<Topics />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
