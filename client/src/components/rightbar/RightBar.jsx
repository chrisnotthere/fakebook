import "./rightbar.css";
import { Users } from '../../testData';
import FriendRequest from "../friendrequest/FriendRequest";
import Friend from "../friend/Friend";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function RightBar({ user }) {
  const [friends, setFriends] = useState([]);
  const params = useParams();
  // console.log(params)

  // check to see if user is on homepage or profile page
  const isHome = (params) => {
    for (let key in params) {
      if (params.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`/users/${params.id}/friendList/`);
        setFriends(friendList.data);
        console.log(friends)
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const DashRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Friend Requests</h4>
        <ul className="rightbarFriendRequests">
          {Users.map(u => (
            <FriendRequest key={u.id} user={u} />
          ))}
        </ul>
        <hr className="rightbarHr" />
        <h4 className="rightbarTitle">Friends</h4>
        <ul className="rightbarFriends">
          {Users.map(u => (
            <Friend key={u._id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Friends of {user.firstName}</h4>
        <ul className="rightbarFriends">
          {friends.friendList?.map(u => (
            <Friend key={u._id} user={u} />
          ))}
        </ul>
      </>
    )
  }

  return (
    <div className='rightBar'>
      <div className="rightbarWrapper">
        {isHome(params) ?  <DashRightbar /> : <ProfileRightbar />}
        {/* <ProfileRightbar /> */}
        {/* <DashRightbar /> */}
      </div>
    </div>
  );
}

export default RightBar;
