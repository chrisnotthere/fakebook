import "./feed.css";
import PostForm from "../postform/PostForm";
import Post from "../post/Post";
import { Posts } from '../../testData'
import { useState, useEffect } from "react";
import axios from 'axios';

function Feed({ user, setUser }) {
  const [posts, setPosts] = useState([]);
  // console.log(posts)

  useEffect(() => {
    console.log('---render feed---')
    // console.log('feed, user id ->' + userid);
    // console.log(user.token);

    // show timeline posts if user is in the dashboard
    // show a specific person's posts if user is viewing person's profile
    const fetchTimeline = async () => {
      const res = user.id
        ? await axios.get(`posts/${user.id}`, { headers: { "Authorization": user.token } })
        : await axios.get('posts/', { headers: { "Authorization": user.token } });
      // console.log(res.data);
      const timelinePosts = res.data.timelinePosts;
      timelinePosts
        ? setPosts(timelinePosts)
        : setPosts(res.data.userPosts);
    }
    fetchTimeline();
  }, [user])

  return (
    <div className='feed'>
      <div className="feedWrapper">
        {/* <h3>{user.firstName ? `Welcome back, ${user.firstName}` : ''}</h3> */}
        <PostForm user={user} setUser={setUser} />
        {posts.map((p) => (
          <Post user={user} setUser={setUser} key={p._id} post={p} />
        ))}


      </div>
    </div>
  );
}

export default Feed;
