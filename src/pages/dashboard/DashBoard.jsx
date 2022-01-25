import React from 'react';
import NavBar from '../../components/navbar/NavBar';
import UserNav from '../../components/usernav/UserNav';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightbar/RightBar';
import './dashboard.css';

function DashBoard({ user, setUser}) {
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <div className="dashContainer">
        <UserNav user={user} setUser={setUser} />
        <Feed user={user} setUser={setUser} />
        <RightBar user={user} setUser={setUser} />
      </div>
    </>
  )
}

export default DashBoard;
