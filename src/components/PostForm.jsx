import React, { useState } from "react";
import axios from "axios";
import { PostFormContainer } from "./styles/PostForm.styled";

function PostForm({ user, setUser}) {
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

  return (
    <PostFormContainer>
      <div className="postformWrapper">

        <form className='postformForm' onSubmit={handleSubmit}>
          <legend>Create a post</legend>

          <div className='postformTextArea'>
            <textarea
              placeholder={`What's on your mind, firstName?`}
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
