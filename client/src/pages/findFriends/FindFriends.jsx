import axios from "axios";
import { useEffect, useState } from "react";
import Friend from "../../components/friend/Friend";
import NavBar from "../../components/navbar/NavBar";
import NonFriend from "../../components/nonfriend/NonFriend";
import UserNav from "../../components/usernav/UserNav";
import "./findfriends.css";

function FindFriends({ user, setUser }) {
  const [nonFriends, setNonFriends] = useState([]);

  //get all non-friends of user
  useEffect(() => {
    const getNonFriends = async () => {
      try {
        const nonFriends = await axios.get(`/users/${user.id}/nonFriends/`);
        console.log(nonFriends.data);
        setNonFriends(nonFriends.data.nonFriends);
      } catch (err) {
        console.log(err);
      }
    };
    getNonFriends()
  }, [])

  // console.log(nonFriends);

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <div className="myFriendsContainer">
        <UserNav user={user} setUser={setUser} />
        <div className='myFriends'>
          <div className="myFriendsWrapper">
            List of all of my non-friends
            {nonFriends.map(u => (
              <NonFriend key={u._id} nonFriend={u} user={user} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FindFriends;
