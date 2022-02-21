import axios from '../utils/axios'
import React, { useState } from "react";
import { useEffect } from "react";
import { CommentContainer } from "./styles/Comment.styled";
import { Link } from 'react-router-dom';

function Comment({ comment, post, user }) {
  const [commentUser, setCommentUser] = useState();
  const [like, setLike] = useState(comment.likes.length);

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/comments/${comment._id}/like`, { headers: { "Authorization": user.token } })
        .then((result) => {
          setLike(result.data.comment.likes.length);
        });
    } catch (err) { }
  };

  useEffect(() => {
    const getCommentUser = async () => {
      try {
        const commentUser = await axios.get(`/users/${comment.user}`, { headers: { "Authorization": user.token } })
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

          <Link to={`${commentUser?.id}`}>
            <div className="commentPicture">
              <img src={commentUser?.picture} alt="" />
            </div>
          </Link>

          <div className="commentContent">

            <Link to={`${commentUser?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="commentUsername">
                {commentUser?.firstName + ' ' + commentUser?.lastName}
              </div>
            </Link>

            <div className="commentText">
              {comment.text}
            </div>
            <div className="commentLikes">
              <img className="likeIcon" src={"/fakebook/assets/like.png"} onClick={() => likeHandler()} alt="" />
              <p>{like} likes</p>
            </div>
          </div>

        </div>
      </div>
    </CommentContainer>
  );
}

export default Comment;
