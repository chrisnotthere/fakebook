import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import UserNav from "../../components/usernav/UserNav";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import "./profile.css";

function Profile() {

  return (
    <>
      <NavBar />
      <div className="profileContainer">
        <UserNav />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assets/post/1.jpg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="assets/person/1.png"
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Safak Kocaoglu</h4>
              {/* <span className="profileInfoDesc">Hello my friends!</span> */}
              <span className="profileInfoDesc">
                Daffy Duck is an animated cartoon character created by Warner Bros. Styled as an anthropomorphic black duck, he has appeared in cartoon series such as Looney Tunes and Merrie Melodies, in which he is usually depicted as a foil for Bugs Bunny.
              </span>
            </div>
          </div>
          <div className="profileRightBottom">

            <Feed />
            <RightBar profile />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
