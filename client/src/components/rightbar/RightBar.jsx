import "./rightbar.css";
import FriendRequest from "../friendrequest/FriendRequest";
import Friend from "../friend/Friend";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Add, Remove } from "@material-ui/icons";

function RightBar({ user, profileUser }) {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [acceptFriendReq, setAcceptFriendReq] = useState(false);

  const params = useParams();
  // check to see if user is on homepage or profile page
  const isHome = (params) => {
    for (let key in params) {
      if (params.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  // TODO finish this
  const handleAddFriend = async () => {
    console.log('clickkkk')
    try {
      // if friends, remove friend
      // if not friends, send friend request
    } catch (err) {
      console.log(err);
    }
  }

  // get friends and friend requests
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = params.id
          ? await axios.get(`/users/${params.id}/friendList/`)
          : await axios.get(`/users/${user.id}/friendList/`);

        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getFriendRequests = async () => {
      try {
        const friendRequestList = await axios.get(`/users/${user.id}/friendRequests/`);
        setFriendRequests(friendRequestList.data.friendRequestList);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    getFriendRequests();
  }, [user, acceptFriendReq]);

  const DashRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Friend Requests</h4>
        <ul className="rightbarFriendRequests">
          {friendRequests.map(u => (
            <FriendRequest key={u._id} friendReq={u} setAcceptFriendReq={setAcceptFriendReq} />
          ))}
        </ul>
        <hr className="rightbarHr" />
        <h4 className="rightbarTitle">Friends</h4>
        <ul className="rightbarFriends">
          {friends.friendList?.map(u => (
            <Friend key={u._id} friend={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {/* TODO, if profile is not current user's profile, show add friend button */}
        {/* TODO, change button based on current friend status */}
        <button className="rightBarAddFriend" onClick={() => handleAddFriend()}>
          Add Friend<Add />
          {/* {alreadyFriends ? "Remove Friend" : "Add Friend"}
          {alreadyFriends ? <Remove /> : <Add />} */}
        </button>

        {/* {isCurrentUserProfile(user, params)
          ? <h4 className="rightbarTitle">Friends of {user.firstName}</h4>
          : <h4 className="rightbarTitle">Friends of {profileUser.firstName}</h4>
        } */}
        <h4 className="rightbarTitle">Friends of {profileUser.firstName}</h4>
        <ul className="rightbarFriends">
          {friends.friendList?.map(u => (
            <Friend key={u._id} friend={u} />
          ))}
        </ul>
      </>
    )
  }

  return (
    <div className='rightBar'>
      <div className="rightbarWrapper">
        {isHome(params) ? <DashRightbar /> : <ProfileRightbar />}
      </div>
    </div>
  );
}

export default RightBar;
