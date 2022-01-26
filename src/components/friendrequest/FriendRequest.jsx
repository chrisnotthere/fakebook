import React from 'react';
import './friendrequest.css'

function FriendRequest({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  console.log('user', user);

  const handleAcceptRequest = () => {
    console.log(`accept`)
  }

  const handleDeclineRequest = () => {
    console.log('decline')
  }

  return (
    <div>
      <li className="rightbarFriendRequest">
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={PF + '/person/' + user.picture}
            alt="name"
          />
        </div>
        <span className="rightbarUsername">{user.firstName}</span>
        <button className="rightbarButton" onClick={() => handleAcceptRequest()} >Accept</button>
        <button className="rightbarButton" onClick={() => handleDeclineRequest()} >Decline</button>
      </li>
    </div>
  )
}

export default FriendRequest;
