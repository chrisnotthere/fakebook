import React, { useState } from "react";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
// import { Users } from '../../testData';
import { useEffect } from "react";
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from "react-router-dom";

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`users/${post.user.id}`, { headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWYwNjkzNjdjMzQ5MzJiYmU1ZmM0MCIsImlhdCI6MTY0MzA1NDk2ODQ3OSwiZXhwIjoxNjQzMDU1MDU0ODc5fQ.zNO1yEOkzUZhJMMA-n0BWVS2snsVcfBDAuHTyo4s9Sg` } });
      setUser(res.data.user)
    }
    fetchUser();
  }, [post.user.id])

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`${user._id}`}>
              <img
                className="postProfileImg"
                src={process.env.REACT_APP_PUBLIC_FOLDER + '/person/' + user.picture}
                alt={user.firstName}
              />
            </Link>
            <Link to={`${user._id}`} style={{textDecoration:'none', color:'inherit'}}>
              <span className="postUsername">{user.firstName + ' ' + user.lastName}</span>
            </Link>
            <span className="postDate">{format(post.timestamp)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.text}</span>
          <img className="postImg" src={PF + post.image} alt='' />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={PF + "/like.png"} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comments.length} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;