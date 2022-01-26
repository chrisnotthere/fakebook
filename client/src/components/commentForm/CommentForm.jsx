import React, { useState } from "react";
import "./commentform.css";
import axios from "axios";
import { ContactSupportOutlined } from "@material-ui/icons";

function CommentForm({ user, setUser, post, setPost}) {
  const [content, setContent] = useState('');
  let data;

  // console.log(post._id)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('POST the data to API...');
    console.log('post', post._id)
    console.log('user', user)
    const newComment = {
      user: user._id,
      text: content,
    };

    try {
      await axios.post(`/posts/${post._id}/comments`, newComment);
      window.location.reload();

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='commentform'>
      <div className="commentformWrapper">

        <form className='commentformForm' onSubmit={handleSubmit}>

          <div className='commentformTextArea'>
            <textarea
              placeholder={`Comment on this post.`}
              required
              defaultValue={data}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button type='submit' className='commentButton'>Comment</button>
        </form>
        {/* <hr className="commentformHr" /> */}
      </div>
    </div>
  );
}

export default CommentForm;
