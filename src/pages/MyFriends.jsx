import axios from "axios";
import { useEffect, useState } from "react";
import Friend from "../components/Friend";
import NavBar from "../components/NavBar";
import UserNav from "../components/UserNav";
import { StyledDiv, FindFriendsContainer } from '../components/styles/FindFriends.styled'
import { useNavigate } from 'react-router-dom';

function MyFriends({ user, setUser }) {
  const [friends, setFriends] = useState([]);
  const [removedFriend, setRemovedFriend] = useState(false);
  const navigate = useNavigate();

  // send to login if there is no user in localstorage
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  });

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

            {friends.length < 1 ?
              <span className="error">You have no friends. Try being more social to make the best out of FakeBook.</span>
              :
              <h2>Friends</h2>
            }

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
