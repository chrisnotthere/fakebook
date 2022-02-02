import FriendRequest from "./FriendRequest";
import Friend from "./Friend";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";
import axios from '../utils/axios'
import { RightBarContainer } from "./styles/RightBar.styled";

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

  // get friends and friend requests
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = params.id
          ? await axios.get(`/users/${params.id}/friendList/`, { headers: { "Authorization": user.token } })
          : await axios.get(`/users/${user.id}/friendList/`, { headers: { "Authorization": user.token } });

        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getFriendRequests = async () => {
      try {
        const friendRequestList = await axios.get(`/users/${user.id}/friendRequests/`, { headers: { "Authorization": user.token } });
        setFriendRequests(friendRequestList.data.friendRequestList);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    getFriendRequests();
  }, [user, acceptFriendReq, params]);

  const DashRightbar = () => {
    return (
      <RightBarContainer>
        <h4 className="rightbarTitle">Friend Requests</h4>
        <ul className="rightbarFriendRequests">
          {friendRequests.map(u => (
            <FriendRequest key={u._id} friendReq={u} setAcceptFriendReq={setAcceptFriendReq} user={user} />
          ))}
        </ul>
        <h4 className="rightbarTitle">Friends</h4>
        <ul className="rightbarFriends">
          {friends.friendList?.map(u => (
            <Friend key={u._id} friend={u} user={user} />
          ))}
        </ul>
      </RightBarContainer>
    );
  };

  const ProfileRightbar = () => {
    return (
      <RightBarContainer>
        <h4 className="rightbarTitle">Friends of {profileUser.firstName}</h4>
        <ul className="rightbarFriends">
          {friends.friendList?.map(u => (
            <Friend key={u._id} friend={u} user={user} />
          ))}
        </ul>
      </RightBarContainer>
    )
  }

  return (
    <div className='rightBar' style={{ width: '15rem' }}>

      <div className="rightbarWrapper"
        style={{
          padding: '0.5rem 0.5rem 0 0',
          backgroundColor: 'rgb(204, 230, 230)',
          height: '100%'
        }}
      >
        {isHome(params) ? <DashRightbar /> : <ProfileRightbar />}
      </div>
      
    </div >
  );
}

export default RightBar;
