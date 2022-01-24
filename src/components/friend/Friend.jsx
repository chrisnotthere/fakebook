import React from 'react';
import './friend.css'

function Friend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={PF + user.profilePicture}
            alt="name"
          />
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </div>
  )
}

export default Friend;
