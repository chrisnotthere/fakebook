// import axios from "axios";
import axios from '../utils/axios'
import React, { useState } from "react";
import { useEffect } from "react";
import { CommentContainer } from "./styles/Comment.styled";
// import likeIcon from '../../public/assets/like.png'

function Comment({ comment, post }) {
  const [commentUser, setCommentUser] = useState();
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(comment.likes.length);

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/comments/${comment._id}/like`)
        .then((result) => {
          setLike(result.data.comment.likes.length);
        });
    } catch (err) { }
  };

  useEffect(() => {
    const getCommentUser = async () => {
      try {
        const commentUser = await axios.get(`/users/${comment.user}`)
        setCommentUser(commentUser.data.user)
      } catch (err) {
        console.log(err)
      }
    }
    getCommentUser()
  }, [comment])

  return (
    <CommentContainer>
      <div className="comment">
        <div className="commentWrapper">

          <div className="commentPicture">
            <img src={commentUser?.picture} alt="" />
          </div>
          
          <div className="commentContent">
            <div className="commentUsername">
              {commentUser?.firstName + ' ' + commentUser?.lastName}
            </div>
            <div className="commentText">
              {comment.text}
            </div>
            <div className="commentLikes">
              {/* <img className="likeIcon" src={PF + "/like.png"} onClick={() => likeHandler()} alt="" /> */}
              {/* <img className="likeIcon" src={likeIcon} onClick={() => likeHandler()} alt="" /> */}
              <img className="likeIcon" src={"/assets/like.png"} onClick={() => likeHandler()} alt="" />
              <p>{like} likes</p>
            </div>
          </div>

        </div>
      </div>
    </CommentContainer>
  );
}

export default Comment;
