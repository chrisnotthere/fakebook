import NavBar from "../../components/navbar/NavBar";
import UserNav from "../../components/usernav/UserNav";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import "./profile.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router";
import { ContactSupportOutlined } from "@material-ui/icons";

function Profile({ user, setUser }) {
  // const [user, setUser] = useState({});
  const userid = useParams();
  const [profileUser, setProfileUser] = useState([]);

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

  // check to see if user is on own profile page
  const isCurrentUserProfile = (user, params) => {
    if (user.id === params.id) {
      return true
    }
    return false
  }

  // console.log('userid.id', userid.id);

  //get profile user information, only if currentUser is looking at someone elses profile page
  useEffect(() => {
    const getProfileUser = async () => {
      // only run if not on own profile page
      if (!isCurrentUserProfile(user, userid)) {
        try {
          const profileUser = await axios.get(`/users/${userid.id}/`, { headers: { "Authorization": user.token } });
          setProfileUser(profileUser.data.user);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getProfileUser();
  }, [])


  // console.log('user', user)
  // console.log(isCurrentUserProfile(user, userid))

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
              {/* pull from params if not logged in user */}
              <img
                className="profileUserImg"
                src=
                {isCurrentUserProfile(user, userid)
                  ? PF + '/person/' + user.picture
                  : PF + '/person/' + profileUser.picture
                }
                alt=""
              />

            </div>
            <div className="profileInfo">
              {/* here too */}
              <h4 className="profileInfoName">
                {/* {user.firstName} */}
                {isCurrentUserProfile(user, userid)
                  ? user.firstName
                  : profileUser.firstName
                }
              </h4>
              <span className="profileInfoDesc">
                {/* {user.about} */}
                {isCurrentUserProfile(user, userid)
                  ? user.about
                  : profileUser.about
                }
              </span>
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
