import React from 'react';
import NavBar from '../components/navbar/NavBar';
import UserNav from '../components/usernav/UserNav';
import Feed from '../components/feed/Feed';
import RightBar from '../components/rightbar/RightBar';

function DashBoard({ user, setUser }) {

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
