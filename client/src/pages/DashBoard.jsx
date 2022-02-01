import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import UserNav from '../components/UserNav';
import Feed from '../components/Feed';
import RightBar from '../components/RightBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DashBoard({ user, setUser }) {
  const navigate = useNavigate();

  // populate facebook users friendRequests
  useEffect(() => {

    const populateFriendRequests = async () => {
      console.log('user.id', user.id)
      try {
        const api = await axios.get(`/users/${user.id}`)
        const currentUser = api.data.user;

        // populate friendRequests if user has no friends and no friend requests
        if (((!currentUser.friends.length > 0) && (!currentUser.friendRequests.length > 0))) {
          await axios.post(`/users/friends/populate`);
          window.location.reload();
        }
      } catch (err) {
        console.log(err)
      }
    }
    // only run when user has a facebookId
    if (!!user.facebookId) {
      populateFriendRequests()
    }
  }, []);

  // send to login if there is no 'user' in localstorage
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
