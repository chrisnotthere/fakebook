import React from 'react';
import NavBar from '../../components/navbar/NavBar';
import UserNav from '../../components/usernav/UserNav';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightbar/RightBar';
import './dashboard.css';

function DashBoard() {
  return (
    <>
      <NavBar />
      <div className="dashContainer">
        <UserNav />
        <Feed />
        <RightBar />
      </div>
    </>
  )
}

export default DashBoard;
