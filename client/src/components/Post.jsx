import React, { useState } from "react";
import { MoreVert, Delete } from "@material-ui/icons";
// import axios from 'axios';
import axios from '../utils/axios'
import { Link } from "react-router-dom";
import moment from 'moment'
import Comment from "./Comment";
import CommentForm from './CommentForm'
import { PostContainer } from "./styles/Post.styled";
// import likeIcon from '../../public/assets/like.png'

function Post({ post, setPost, user, setUser, profileUser }) {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);

  const handleDeletePost = () => {
    try {
      axios.delete(`posts/${post._id}/`)
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like")
        .then((result) => {
          setLike(result.data.post.likes.length);
        });
    } catch (err) { }
  };

  return (
    <PostContainer>
      <div className="postWrapper">
        <div className="postTop">

          <div className="postTopLeft">
            <Link to={`${post.user.id}`}>
              {profileUser.firstName
                ?
                <img
                  className="postProfileImg"
                  src={profileUser.picture}
                  alt={profileUser.firstName}
                />
                :
                <img
                  className="postProfileImg"
                  src={post.user.picture}
                  alt={user.firstName}
                />
              }
            </Link>
            <Link to={`${profileUser.id || post.user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {profileUser.firstName
                ? <span className="postUsername">{profileUser.firstName + ' ' + profileUser.lastName}</span>
                : <span className="postUsername">{post.user.firstName + ' ' + post.user.lastName}</span>
              }
            </Link>
            <span className="postDate">{moment(post.timestamp).fromNow()}</span>
          </div>

          <div className="postTopRight">
            {user.id === profileUser.id
              ? <Delete style={{ color: 'rgb(235, 57, 57)', cursor: 'pointer' }} onClick={() => handleDeletePost()} />
              : <MoreVert />
            }
          </div>

        </div>

        <div className="postCenter">
          <span className="postText">{post?.text}</span>
          <img className="postImg" src={post.image} alt='' />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            {/* <img className="likeIcon" src={likeIcon} onClick={() => likeHandler(post._id)} alt="" /> */}
            <img className="likeIcon" src={"/assets/like.png"} onClick={() => likeHandler(post._id)} alt="" />
            {/* <span className="postLikeCounter">{like} people like it</span> */}
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comments.length} comments</span>
          </div>
        </div>

        <CommentForm post={post} setPost={setPost} user={user} />
        {post.comments?.map((c) => (
          <Comment key={c._id} comment={c} user={user} post={post} />
        ))}

      </div>
    </PostContainer>
  );
}

export default Post;
