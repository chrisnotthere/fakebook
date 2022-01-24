import React, { useState } from 'react';
import DashBoard from './pages/dashboard/DashBoard';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {


  return (
    <div >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<DashBoard />} />
          {/* <Route path="/profile/" element={<Profile />} /> */}
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
