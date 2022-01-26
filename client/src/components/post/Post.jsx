import React, { useState } from "react";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useEffect } from "react";
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from "react-router-dom";
import moment from 'moment'
import Comment from "../comment/Comment";
import CommentForm from '../commentForm/CommentForm'

function Post({ post, setPost, user, setUser, profileUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axios.get(`users/${post.user.id}`, { headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWYwNjkzNjdjMzQ5MzJiYmU1ZmM0MCIsImlhdCI6MTY0MzA1NDk2ODQ3OSwiZXhwIjoxNjQzMDU1MDU0ODc5fQ.zNO1yEOkzUZhJMMA-n0BWVS2snsVcfBDAuHTyo4s9Sg` } });
  //     setUser(res.data.user)
  //   }
  //   fetchUser();
  // }, [])

  // console.log('profileUser', profileUser)
  // console.log('user', user)

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like")
        .then((result) => {
          setLike(result.data.post.likes.length);
        });
    } catch (err) { }
  };

  // console.log(profileUser)
  // console.log(post.comments)

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`${post.user.id}`}>
              {profileUser.firstName
                ?
                <img
                  className="postProfileImg"
                  src={process.env.REACT_APP_PUBLIC_FOLDER + '/person/' + profileUser.picture}
                  alt={profileUser.firstName}
                />
                :
                <img
                  className="postProfileImg"
                  src={process.env.REACT_APP_PUBLIC_FOLDER + '/person/' + post.user.picture}
                  alt={user.firstName}
                />
              }
            </Link>
            <Link to={`${profileUser.id || post.user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {profileUser.firstName
                ? <span className="postUsername">{profileUser.firstName + ' ' + profileUser.lastName}</span>
                : <span className="postUsername">{post.user.firstName + ' ' + post.user.lastName}</span>
              }
              {/* //pull info from the postUser */}
            </Link>
            <span className="postDate">{moment(post.timestamp).fromNow()}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.text}</span>
          <img className="postImg" src={post.image} alt='' />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={PF + "/like.png"} onClick={() => likeHandler(post._id)} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comments.length} comments</span>
          </div>
        </div>
        {/* ADD a comment form here, about th comments.... */}
        <CommentForm post={post} setPost={setPost} user={user} />
        {post.comments?.map((c) => (
          <Comment key={c._id} comment={c} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Post;