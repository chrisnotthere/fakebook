import React from 'react';
import './friend.css'

function Friend({user}) {
  return (
    <div>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={user.profilePicture}
            alt="name"
          />
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </div>
  )
}

export default Friend;
