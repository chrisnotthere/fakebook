import axios from "axios";
import { useEffect, useState } from "react";
import Friend from "../components/Friend";
import NavBar from "../components/NavBar";
import UserNav from "../components/UserNav";
import { StyledDiv, FindFriendsContainer } from '../components/styles/FindFriends.styled'

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
      <StyledDiv>
        <UserNav user={user} setUser={setUser} />
        <FindFriendsContainer>
          <div className="findFriendsWrapper">
            List of all of my friends...
            {friends.map(u => (
              <Friend key={u._id} friend={u} myFriends={true} setRemovedFriend={setRemovedFriend} />
            ))}
          </div>
        </FindFriendsContainer>
      </StyledDiv>
    </>
  );
}

export default MyFriends;
