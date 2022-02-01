import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { FriendContainer } from './styles/Friend.styled';

function Friend({ friend, myFriends, setRemovedFriend }) {

  const handleRemoveFriend = async () => {
    try {
      await axios.delete(`/users/friends/remove/${friend._id}`);
      setRemovedFriend(true);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <FriendContainer>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">

          <Link to={`/${friend._id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
            <img
              className="rightbarProfileImg"
              src={friend.profilePicture
                ? friend.profilePicture
                : friend.picture}
              alt={friend.friendname || friend.firstName}
            />
          </Link>

        </div>

        <Link to={`/${friend._id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
          <span className="rightbarUsername">{friend.friendname || friend.firstName}</span>
        </Link>

        {myFriends && <button className="rightbarButton" onClick={() => handleRemoveFriend()} >Remove Friend</button>}
      
      </li>
    </FriendContainer>
  )
}

export default Friend;
