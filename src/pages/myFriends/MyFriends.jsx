import axios from "axios";
import { useEffect, useState } from "react";
import Friend from "../../components/friend/Friend";
import NavBar from "../../components/navbar/NavBar";
import UserNav from "../../components/usernav/UserNav";
import "./myfriends.css";

function MyFriends({ user, setUser }) {
  const [friends, setFriends] = useState([]);
  const [removedFriend, setRemovedFriend] = useState(false);

  //get friends of user
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`/users/${user.id}/friendList/`);
        setFriends(friendList.data.friendList);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends()
  }, [removedFriend])

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <div className="myFriendsContainer">
        <UserNav user={user} setUser={setUser} />
        <div className='myFriends'>
          <div className="myFriendsWrapper">
            List of all of my friends...
            {friends.map(u => (
              <Friend key={u._id} friend={u} myFriends={true} setRemovedFriend={setRemovedFriend} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyFriends;
