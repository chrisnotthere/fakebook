import "./feed.css";
import PostForm from "../postform/PostForm";
import Post from "../post/Post";
import { Posts } from '../../testData'
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function Feed({ user, setUser }) {
  const [posts, setPosts] = useState([]);
  const params = useParams();

  // check to see if user is on homepage or profile page
  const isHome = (params) => {
    for (let key in params) {
      if (params.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  useEffect(() => {
    console.log('---render feed---')
    // show timeline posts if user is in the dashboard
    // show a specific person's posts if user is viewing person's profile
    const fetchTimeline = async () => {
      const res = user.id
        ? await axios.get(`posts/${user.id}`, { headers: { "Authorization": user.token } })
        : await axios.get('posts/', { headers: { "Authorization": user.token } });
      setPosts(res.data.userPosts)
    }
    fetchTimeline();
  }, [user])

  return (
    <div className='feed'>
      <div className="feedWrapper">

        {/* hide 'create post' on profile page */}
        {isHome(params) && <PostForm user={user} setUser={setUser} />}

        {posts.map((p) => (
          <Post user={user} setUser={setUser} key={p._id} post={p} />
        ))}


      </div>
    </div>
  );
}

export default Feed;
