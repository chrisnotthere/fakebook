import React, { useState } from "react";
// import axios from "axios";
import axios from '../utils/axios'
import { CommentFormContainer } from "./styles/CommentForm.styled";

function CommentForm({ user, setUser, post, setPost}) {
  const [content, setContent] = useState('');
  let data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      user: user._id,
      text: content,
    };
    try {
      await axios.post(`/posts/${post._id}/comments`, newComment, { headers: { "Authorization": user.token } });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CommentFormContainer>
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
      </div>
    </CommentFormContainer>
  );
}

export default CommentForm;
