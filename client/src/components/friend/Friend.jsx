import React from 'react';
import { Link } from 'react-router-dom';
import './friend.css'

function Friend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(user)

  return (
    <div>
      <Link to={`/${user._id}`} style={{textDecoration:'none', color:'inherit'}} >
        <li className="rightbarFriend">
          <div className="rightbarProfileImgContainer">
            <img
              className="rightbarProfileImg"
              src={user.profilePicture
                ? PF + user.profilePicture
                : PF + '/person/' + user.picture}
              // src={PF + user.profilePicture || user.picture}
              alt={user.username || user.firstName}
            />
          </div>
          <span className="rightbarUsername">{user.username || user.firstName}</span>
        </li>
      </Link>
    </div>
  )
}

export default Friend;
