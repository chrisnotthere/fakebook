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

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log('profile, userid -->', userid.id);

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     const res = await axios.get(`/users/${userid.id}`, { headers: { "Authorization": user.token } });
  //     console.log('data -->', res.data);
  //     setUser(res.data.user)
  //   }
  //   fetchUserProfile();
  // }, [])

  // console.log(user)

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
                src={PF + '/person/' + user.picture}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.firstName}</h4>
              {/* <span className="profileInfoDesc">Hello my friends!</span> */}
              <span className="profileInfoDesc">{user.about}</span>
            </div>
          </div>
          <div className="profileRightBottom">

            <Feed user={user} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
