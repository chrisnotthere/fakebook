import React, { useState } from 'react';
import DashBoard from './pages/dashboard/DashBoard';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Routes, Route, useNavigate, } from 'react-router-dom';
import useLocalStorage from './utils/useLocalStorage';
import MyFriends from './pages/myFriends/MyFriends';
import FindFriends from './pages/findFriends/FindFriends';

const App = () => {
  const [user, setUser] = useLocalStorage('user', '');

  return (
    <div >
      {/* <Router> */}
        <Routes>
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/register" element={<Register user={user} setUser={setUser} />} />
          <Route path="/myFriends" element={<MyFriends user={user} setUser={setUser} />} />
          <Route path="/findFriends" element={<FindFriends user={user} setUser={setUser} />} />
          <Route path="/" element={<DashBoard user={user} setUser={setUser} />} />
          <Route path="/:id" element={<Profile user={user} setUser={setUser} />} />
        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
