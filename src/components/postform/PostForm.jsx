import React, { useState } from "react";
import "./postform.css";
import axios from "axios";

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
    <div className='postform'>
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
        <hr className="postformHr" />
      </div>
    </div>
  );
}

export default PostForm;
