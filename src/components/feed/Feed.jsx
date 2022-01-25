import "./feed.css";
import PostForm from "../postform/PostForm";
import Post from "../post/Post";
import { Posts } from '../../testData'
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

  // check to see if user is on own profile page
  const isCurrentUserProfile = (user, params) => {
    if (user.id === params.id) {
      return true
    }
    return false
  }

  //get profile user information, only if currentUser is looking at someone elses profile page
  useEffect(() => {
    const getProfileUser = async () => {
      // only run if not on own profile page
      if (!isCurrentUserProfile(user, params)) {
        try {
          const profileUser = await axios.get(`/users/${params.id}/`, { headers: { "Authorization": user.token } });
          setProfileUser(profileUser.data.user);
        } catch (err) {
          console.log(err);
        }
      }
    }
    //??
    if (!isHome(params)){
      getProfileUser();
    }

  }, [])

  //get posts
  useEffect(() => {
    console.log('---render feed---')
    // show timeline posts if user is in the dashboard
    // show a specific person's posts if user is viewing person's profile

    const fetchPosts = async () => {
      //if on dash -> pull timeline posts (GET /)
      ///////////////////////////////////////////////////////////////////////////
      // console.log(isHome(params)) // true when on dash
      if (isHome(params)) {
        try {


          const res = await axios.get('posts/', { headers: { "Authorization": user.token } });
          setPosts(res.data.timelinePosts)
          console.log(res.data.timelinePosts)


        } catch (err) {
          console.log(err)
        }
      } else {
        //if on profile page -> pull only that user's posts... (GET /:id)
        try {
          if (isCurrentUserProfile(user, params)) {
            //if own profile use user.id
            const res = await axios.get(`posts/${user.id}`, { headers: { "Authorization": user.token } })
            // console.log(res.data)
            setPosts(res.data.userPosts)

          } else {
            //if someone elses page use params
            const res = await axios.get(`posts/${params.id}`, { headers: { "Authorization": user.token } })
            // console.log(res.data)
            setPosts(res.data.userPosts)
          }
        } catch (err) {
          console.log(err)
        }
      }
      // const res = user.id
      //   ? await axios.get(`posts/${user.id}`, { headers: { "Authorization": user.token } })
      //   : await axios.get('posts/', { headers: { "Authorization": user.token } });
      // setPosts(res.data.userPosts)
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
