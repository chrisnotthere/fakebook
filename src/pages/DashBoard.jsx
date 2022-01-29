import React from 'react';
import NavBar from '../components/NavBar';
import UserNav from '../components/UserNav';
import Feed from '../components/Feed';
import RightBar from '../components/RightBar';

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
