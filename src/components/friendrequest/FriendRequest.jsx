import React from 'react';
import './friendrequest.css'

function FriendRequest({user}) {
  return (
    <div>
      <li className="rightbarFriendRequest">
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={user.profilePicture}
            alt="name"
          />
        </div>
        <span className="rightbarUsername">{user.username}</span>
        <button className="rightbarButton" >Accept</button>
        <button className="rightbarButton" >Decline</button>
      </li>
    </div>
  )
}

export default FriendRequest;
