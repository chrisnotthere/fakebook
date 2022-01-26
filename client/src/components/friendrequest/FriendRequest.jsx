import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './friendrequest.css'

function FriendRequest({ friendReq, setAcceptFriendReq }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleAcceptRequest = async() => {
    console.log(`accept`)
    try {
      await axios.post(`/users/friends/accept/${friendReq._id}`);
      console.log('friend request accepted!')
      setAcceptFriendReq(true);

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <li className="rightbarFriendRequest">
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={PF + '/person/' + friendReq.picture}
            alt="name"
          />
        </div>
        <span className="rightbarUsername">{friendReq.firstName}</span>
        <button className="rightbarButton" onClick={() => handleAcceptRequest()} >Accept</button>
      </li>
    </div>
  )
}

export default FriendRequest;
