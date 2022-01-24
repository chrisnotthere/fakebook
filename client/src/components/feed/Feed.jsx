import "./feed.css";
import PostForm from "../postform/PostForm";
import Post from "../post/Post";
import { Posts } from '../../testData'
import { useState, useEffect } from "react";
import axios from 'axios';

function Feed({ userid }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log('---render feed---')
    console.log('feed, user id ->' + userid);

    // show timeline posts if user is in the dashboard
    // show a specific person's posts if user is viewing person's profile
    const fetchTimeline = async () => {
      const res = userid
        ? await axios.get(`posts/${userid}`, { headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWYwNjkzNjdjMzQ5MzJiYmU1ZmM0MCIsImlhdCI6MTY0MzA1NDk2ODQ3OSwiZXhwIjoxNjQzMDU1MDU0ODc5fQ.zNO1yEOkzUZhJMMA-n0BWVS2snsVcfBDAuHTyo4s9Sg` } })
        : await axios.get('posts/', { headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWYwNjkzNjdjMzQ5MzJiYmU1ZmM0MCIsImlhdCI6MTY0MzA1NDk2ODQ3OSwiZXhwIjoxNjQzMDU1MDU0ODc5fQ.zNO1yEOkzUZhJMMA-n0BWVS2snsVcfBDAuHTyo4s9Sg` } });
      // console.log(res.data);
      const timelinePosts = res.data.timelinePosts;
      timelinePosts
        ? setPosts(timelinePosts)
        : setPosts(res.data.userPosts);
    }
    fetchTimeline();
  }, [userid])

  return (
    <div className='feed'>
      <div className="feedWrapper">
        <PostForm />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}


      </div>
    </div>
  );
}

export default Feed;