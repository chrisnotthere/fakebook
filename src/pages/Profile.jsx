import NavBar from "../components/NavBar";
import UserNav from "../components/UserNav";
import Feed from "../components/Feed";
import RightBar from "../components/RightBar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { ProfileContainer } from "../components/styles/Profile.styled";

function Profile({ user, setUser }) {
  const userid = useParams();
  const [profileUser, setProfileUser] = useState([]);
  const navigate = useNavigate();

  // send to login if there is no user in localstorage
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  });

  useEffect(() => {
    const getProfileUser = async () => {
      try {
        const profileUser = await axios.get(`/users/${userid.id}/`, { headers: { "Authorization": user.token } });
        setProfileUser(profileUser.data.user);
      } catch (err) {
        console.log(err);
      }
    }
    getProfileUser();
  }, [userid])

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <ProfileContainer>

        <UserNav user={user} setUser={setUser} />

        <div className="profileRight">
          <div className="profileRightTop">

            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={profileUser.coverPicture}
                alt=""
              />
              <img
                className="profileUserImg"
                src={profileUser.picture || 'https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png'}
                alt=""
              />
            </div>

            <div className="profileInfo">
              <h4 className="profileInfoName">
                {profileUser.firstName + ' ' + profileUser.lastName}
              </h4>
              <span className="profileInfoDesc">
                {profileUser.about}
              </span>
            </div>
          </div>

          <div className="profileRightBottom">
            <Feed user={user} setUser={setUser} />
            <RightBar user={user} setUser={setUser} profileUser={profileUser} />
          </div>
          
        </div>

      </ProfileContainer>
    </>
  );
}

export default Profile;
