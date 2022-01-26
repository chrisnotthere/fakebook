import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import UserNav from '../../components/usernav/UserNav';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightbar/RightBar';
import './dashboard.css';
import axios from 'axios';

function DashBoard({ user, setUser }) {
  // const [profileUser, setProfileUser] = useState([]);

  // useEffect(() => {
  //   const getProfileUser = async () => {
  //     try {
  //       const profileUser = await axios.get(`/users/${userid.id}/`, { headers: { "Authorization": user.token } });
  //       setProfileUser(profileUser.data.user);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getProfileUser();
  // }, [])

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <div className="dashContainer">
        <UserNav user={user} setUser={setUser} />
        <Feed user={user} setUser={setUser} />
        <RightBar user={user} setUser={setUser} profileUser={user} />
      </div>
    </>
  )
}

export default DashBoard;
