import React from "react";
import "./postform.css";

function PostForm() {
  const [content, setContent] = React.useState('');
  let data;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('POST the data to API...');
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
