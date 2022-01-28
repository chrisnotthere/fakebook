import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/navbar/NavBar";
import NonFriend from "../components/nonfriend/NonFriend";
import UserNav from "../components/usernav/UserNav";
import { StyledDiv, FindFriendsContainer, FindFriendsWrapper } from '../components/styles/FindFriends.styled'

function FindFriends({ user, setUser }) {
  const [nonFriends, setNonFriends] = useState([]);

  //get all non-friends of user
  useEffect(() => {
    const getNonFriends = async () => {
      try {
        const nonFriends = await axios.get(`/users/${user.id}/nonFriends/`);
        setNonFriends(nonFriends.data.nonFriends);
      } catch (err) {
        console.log(err);
      }
    };
    getNonFriends()
  }, [])

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <StyledDiv>
        <UserNav user={user} setUser={setUser} />
        <FindFriendsContainer>
          <FindFriendsWrapper>
            List of all of my non-friends
            {nonFriends.map(u => (
              <NonFriend key={u._id} nonFriend={u} user={user} />
            ))}
          </FindFriendsWrapper>
        </FindFriendsContainer>
      </StyledDiv>
    </>
  );
}

export default FindFriends;
