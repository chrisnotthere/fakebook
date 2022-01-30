import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import UserNav from '../components/UserNav';
import Feed from '../components/Feed';
import RightBar from '../components/RightBar';
import { useNavigate } from 'react-router-dom';

function DashBoard({ user, setUser }) {
  const navigate = useNavigate();

  // send to login if there is no user in localstorage
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  });

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <div style={{ display: 'flex' }}>
        <UserNav user={user} setUser={setUser} />
        <Feed user={user} setUser={setUser} />
        <RightBar user={user} setUser={setUser} profileUser={user} />
      </div>
    </>
  )
}

export default DashBoard;
