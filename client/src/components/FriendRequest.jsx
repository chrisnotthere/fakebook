// import axios from 'axios';
import axios from '../utils/axios'
import React from 'react';
import { Link } from 'react-router-dom';
import { FriendRequestContainer } from './styles/FriendRequest.styled';

function FriendRequest({ friendReq, setAcceptFriendReq, user }) {

  const handleAcceptRequest = async () => {
    try {
      await axios.post(`/users/friends/accept/${friendReq._id}`, { headers: { "Authorization": user.token } });
      setAcceptFriendReq(true);
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <FriendRequestContainer>
      <li className="rightbarFriendRequest">

        <div className="rightbarProfileImgContainer">
          <Link to={`/${friendReq._id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
            <img
              className="rightbarProfileImg"
              src={friendReq.picture}
              alt="name"
            />
          </Link>
        </div>
        
        <Link to={`/${friendReq._id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
          <span className="rightbarUsername">{friendReq.firstName}</span>
        </Link>
        <button className="rightbarButton" onClick={() => handleAcceptRequest()} >Accept</button>

      </li>
    </FriendRequestContainer>
  )
}

export default FriendRequest;
