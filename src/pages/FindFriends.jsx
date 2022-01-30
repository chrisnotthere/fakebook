import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import NonFriend from "../components/NonFriend";
import UserNav from "../components/UserNav";
import { StyledDiv, FindFriendsContainer } from '../components/styles/FindFriends.styled'
import { useNavigate } from 'react-router-dom';

function FindFriends({ user, setUser }) {
  const [nonFriends, setNonFriends] = useState([]);
  const navigate = useNavigate();

  // send to login if there is no user in localstorage
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  });

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
          <div className='findFriendsWrapper' >
            List of all of my non-friends
            {nonFriends.map(u => (
              <NonFriend key={u._id} nonFriend={u} user={user} />
            ))}
          </div>
        </FindFriendsContainer>
      </StyledDiv>
    </>
  );
}

export default FindFriends;
