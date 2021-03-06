import React from 'react';
import { ThemeProvider } from 'styled-components';
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { BrowserRouter as Router, Routes, Route, HashRouter, } from 'react-router-dom';
import useLocalStorage from './utils/useLocalStorage';
import MyFriends from './pages/MyFriends';
import FindFriends from './pages/FindFriends';
import Settings from './pages/Settings';
import { theme } from './components/styles/Theme';

const App = () => {
  const [user, setUser] = useLocalStorage('user', '');

  // using HashRouter instead of Router so the page doesnt crash on refresh on gh-pages

  return (
    <ThemeProvider theme={theme} >
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/register" element={<Register user={user} setUser={setUser} />} />
          <Route path="/myFriends" element={<MyFriends user={user} setUser={setUser} />} />
          <Route path="/findFriends" element={<FindFriends user={user} setUser={setUser} />} />
          <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
          <Route path="/" element={<DashBoard user={user} setUser={setUser} />} />
          <Route path="/:id" element={<Profile user={user} setUser={setUser} />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
