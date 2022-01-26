import NavBar from "../../components/navbar/NavBar";
import UserNav from "../../components/usernav/UserNav";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import "./profile.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router";

function Profile({ user, setUser }) {
  // const [user, setUser] = useState({});
  const userid = useParams();
  const [profileUser, setProfileUser] = useState([]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //get profile user information, only if currentUser is looking at someone elses profile page
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

  console.log('profileUser profile', profileUser);

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <div className="profileContainer">
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
                src={PF + '/person/' + profileUser.picture}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">
                {profileUser.firstName}
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
      </div>
    </>
  );
}

export default Profile;
