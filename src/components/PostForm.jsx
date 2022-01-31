import React, { useEffect, useState } from "react";
import axios from "axios";
import { PostFormContainer } from "./styles/PostForm.styled";
// import { useParams } from "react-router-dom";

function PostForm({ user, setUser}) {
  // const userid = useParams();
  const [profileUser, setProfileUser] = useState([]);
  const [content, setContent] = useState('');
  let data;

  const handleSubmit = async (e) => {
    console.log(user)
    e.preventDefault();
    console.log('POST the data to API...');

    const newPost = {
      user: user._id,
      text: content,
    };

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  }

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
        <h2 className="postformWelcome" >Welcome, {profileUser.firstName}</h2>
        <form className='postformForm' onSubmit={handleSubmit}>
          <legend>Create a post</legend>

          <div className='postformTextArea'>
            <textarea
              placeholder={`What's on your mind, ${profileUser.firstName}?`}
              required
              defaultValue={data}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button type='submit' className='postformButton'>Share</button>
        </form>
        {/* <hr className="postformHr" /> */}
      </div>
    </PostFormContainer>
  );
}

export default PostForm;
