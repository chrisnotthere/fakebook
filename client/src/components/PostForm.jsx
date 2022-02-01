import React, { useEffect, useState } from "react";
import axios from "axios";
import { PostFormContainer } from "./styles/PostForm.styled";
import { BurstMode } from "@material-ui/icons";

function PostForm({ user, setUser }) {
  const [profileUser, setProfileUser] = useState([]);
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState('');
  const [show, setShow] = useState(true);
  let data;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      user: user._id,
      text: postText,
      image: postImage,
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) { }
  }

  const showImageInput = (e) => {
    e.preventDefault();
    setShow(!show);
  }

  const buttonStyle = {
    opacity: show ? 0 : 1,
    transition: "all 0.6s ease-out"
  };

  useEffect(() => {
    const getProfileUser = async () => {
      try {
        const profileUser = await axios.get(`/users/${user.id}/`, { headers: { "Authorization": user.token } });
        setProfileUser(profileUser.data.user);
      } catch (err) {
        console.log(err);
      }
    }
    getProfileUser();
  }, [])

  return (
    <PostFormContainer>
      <div className="postformWrapper">

        <h2 className="postformWelcome" >Hello, {profileUser.firstName}</h2>
        <form className='postformForm' onSubmit={handleSubmit}>
          <legend>Create a post</legend>

          <div className='postformTextArea'>
            <textarea
              placeholder={`What's on your mind, ${profileUser.firstName}?`}
              required
              defaultValue={data}
              onChange={(e) => setPostText(e.target.value)}
            />

            <div className="imageForm">
              <button className="imageButton" onClick={showImageInput}>
                <BurstMode className="imageButtonIcon" />
                <span className="imageButtonText">Image</span>
              </button>
              <input
                style={buttonStyle}
                className="imageInput"
                type="text"
                placeholder="Image URL"
                onChange={(e) => setPostImage(e.target.value)}
              />
            </div>

          </div>
          <button type='submit' className='postformButton'>Share</button>
        </form>

      </div>
    </PostFormContainer>
  );
}

export default PostForm;
