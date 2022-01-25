import React, { useState } from 'react';
import DashBoard from './pages/dashboard/DashBoard';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Routes, Route, useNavigate, } from 'react-router-dom';
import useLocalStorage from './utils/useLocalStorage';

const App = () => {
  const [user, setUser] = useLocalStorage('user', '');
  const navigate = useNavigate()

  // if (!user) {
  //   navigate("/login");
  // }

  return (
    <div >
      {/* <Router> */}
        <Routes>
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/register" element={<Register user={user} setUser={setUser} />} />
          <Route path="/" element={<DashBoard user={user} setUser={setUser} />} />
          <Route path="/:id" element={<Profile user={user} setUser={setUser} />} />
        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
