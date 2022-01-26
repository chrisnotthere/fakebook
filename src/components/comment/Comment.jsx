import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import "./comment.css";


function Comment({ comment }) {
  const [commentUser, setCommentUser] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandler = () => {

  }

  useEffect(() => {
    const getCommentUser = async () => {
      try {
        //fetch the comment owner profile picture, using comment.user
        const commentUser = await axios.get(`/users/${comment.user}`)
        setCommentUser(commentUser.data.user)
      } catch (err) {
        console.log(err)
      }
    }
    getCommentUser()
    // console.log('commentUser', commentUser)

  }, [comment])

  // console.log('comment', comment)
  return (
    <>
      <hr className="commentHr" />
      <div className="comment">
        <div className="commentWrapper">
          <div className="commentPicture">
            {/* {commentUser.picture} */}
            <img src={PF + '/person/' + commentUser?.picture} alt="" />
          </div>
          <div className="commentContent">
            <div className="commentUsername">
              {commentUser?.firstName + ' ' + commentUser?.lastName}
            </div>
            <div className="commentText">
              {comment.text}
            </div>
            <div className="commentLikes">
              <img className="likeIcon" src={PF + "/like.png"} onClick={() => likeHandler()} alt="" />
              <p>{comment.likes.length} likes</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
