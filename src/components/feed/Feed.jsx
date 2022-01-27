import "./feed.css";
import PostForm from "../postform/PostForm";
import Post from "../post/Post";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function Feed({ user, setUser }) {
  const [posts, setPosts] = useState([]);
  const [postOwner, setPostOwner] = useState([]);
  const params = useParams();
  const [profileUser, setProfileUser] = useState([]);

  // check to see if user is on homepage or profile page
  const isHome = (params) => {
    for (let key in params) {
      if (params.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  //get profile user information
  useEffect(() => {
    const getProfileUser = async () => {
      try {
        const profileUser = await axios.get(`/users/${params.id}/`, { headers: { "Authorization": user.token } });
        setProfileUser(profileUser.data.user);
      } catch (err) {
        console.log(err);
      }
    }
    getProfileUser();
  }, [])

  //get posts
  useEffect(() => {
    console.log('---render feed---')
    // show timeline posts if user is in the dashboard
    // show a specific person's posts if user is viewing person's profile
    const fetchPosts = async () => {
      //if on dash, pull timeline posts
      if (isHome(params)) {
        try {
          const res = await axios.get('posts/', { headers: { "Authorization": user.token } });
          setPosts(res.data.timelinePosts)
        } catch (err) {
          console.log(err)
        }
      } else {
        //if on profile page, pull only that user's posts
        try {
            const res = await axios.get(`posts/${params.id}`, { headers: { "Authorization": user.token } })
            setPosts(res.data.userPosts)
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchPosts();
  }, [user])

  return (
    <div className='feed'>
      <div className="feedWrapper">
        {/* hide 'create post' on profile page */}
        {isHome(params) && <PostForm user={user} setUser={setUser} />}

        {posts?.map((p) => (
          <Post user={user} setUser={setUser} key={p._id} post={p} profileUser={profileUser} postOwner={postOwner} />
        ))}

      </div>
    </div>
  );
}

export default Feed;
