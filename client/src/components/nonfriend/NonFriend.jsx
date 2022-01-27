import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './nonfriend.css'

function NonFriend({ nonFriend, user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [sentFriendReq, setSentFriendReq] = useState();

  //find out if user has already sent a friend request to nonFriend
  //set button to 'send req' or 'req pending' depending on result
  useEffect(() => {
    const findRequestStatus = async () => {
      try {
        const nonFriendUser = await axios.get(`/users/${nonFriend.id}`);
        const nonFriendUserFriendRequests = nonFriendUser.data.user.friendRequests;

        if (nonFriendUserFriendRequests.includes(user.id)) {
          setSentFriendReq(true)
        } else {
          setSentFriendReq(false)
        }
      } catch (err) {
        console.log(err)
      }
    }
    findRequestStatus();

  }, [nonFriend.id, user.id])


  const handleSendFriendRequest = async () => {
    console.log('send friend request to ' + nonFriend.firstName)
    try {
      await axios.post(`/users/friends/req/${nonFriend.id}`);
      setSentFriendReq(true)
    } catch (err) {
      console.log(err);
    }
  }

  const handleCancelRequest = async () => {
    console.log('Canceling Friend Request');
    try {
      await axios.delete(`/users/friends/req/${nonFriend.id}`);
      setSentFriendReq(false)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <li className="nonFriend">
        <div className="nonFriendProfileImgContainer">
          <Link to={`/${nonFriend._id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
            <img
              className="nonFriendProfileImg"
              src={nonFriend.picture}
              alt={nonFriend.firstName}
            />
          </Link>
        </div>
        <Link to={`/${nonFriend._id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
          <span className="nonFriendUsername">{nonFriend.firstName}</span>
        </Link>
        {/* <button className="nonFriendButton" onClick={() => handleSendFriendRequest()}>
          Send Friend Request
        </button> */}
        {sentFriendReq
          ? <button className="nonFriendButton" onClick={() => handleCancelRequest()}>
            Cancel Friend Request
          </button>
          :
          <button className="nonFriendButton" onClick={() => handleSendFriendRequest()}>
            Send Friend Request
          </button>
        }
      </li>
    </div>
  )
}

export default NonFriend;
