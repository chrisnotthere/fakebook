import "./feed.css";
import PostForm from "../postform/PostForm";
import Post from "../post/Post";
import {Posts} from '../../testData'
import { useState, useEffect } from "react";
import axios from 'axios';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log('---render feed---')
    const fetchTimeline = async () => {
      // const res = await axios.get('posts/')
      const res = await axios.get('posts/', { headers: {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWJhMWY0M2ZjZTViZjgwOTkwYmYxMSIsImlhdCI6MTY0MzA0NDE0OTM3MywiZXhwIjoxNjQzMDQ0MjM1NzczfQ.jBwyWtuZeg0RoH8I7QU_oWlY7n6m1RAQUBjDCab5NRA`} });
      console.log(res.data.timelinePosts);
      setPosts(res.data.timelinePosts)
    }
    fetchTimeline();
  }, [])

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
