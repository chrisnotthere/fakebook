import NavBar from "../components/navbar/NavBar";
import UserNav from "../components/usernav/UserNav";
import Feed from "../components/feed/Feed";
import RightBar from "../components/rightbar/RightBar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router";
import { ProfileContainer } from "../components/styles/Profile.styled";

function Profile({ user, setUser }) {
  const userid = useParams();
  const [profileUser, setProfileUser] = useState([]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
  }, [])

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <ProfileContainer>
        <UserNav />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || PF + "/post/1.jpg"}
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
