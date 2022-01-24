import React, { useState } from "react";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
// import { Users } from '../../testData';
import { useEffect } from "react";
import axios from 'axios';

function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    console.log('---render feed---')
    const fetchTimeline = async () => {
      // const res = await axios.get('posts/')
      const res = await axios.get(`users/${post.user.id}`, { headers: {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWJhMWY0M2ZjZTViZjgwOTkwYmYxMSIsImlhdCI6MTY0MzA0NDE0OTM3MywiZXhwIjoxNjQzMDQ0MjM1NzczfQ.jBwyWtuZeg0RoH8I7QU_oWlY7n6m1RAQUBjDCab5NRA`} });
      console.log(res.data.user);
      setUser(res.data.user)
    }
    fetchTimeline();
  }, [])

  const likeHandler = () => {
    // console.log(e);
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={process.env.REACT_APP_PUBLIC_FOLDER + '/person/' + user.picture}
              alt={user.firstName}
            />
            <span className="postUsername">{user.firstName}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.text}</span>
          <img className="postImg" src={PF+post.photo} alt='' />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={PF+"/like.png"} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;