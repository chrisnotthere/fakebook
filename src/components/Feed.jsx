import PostForm from "./PostForm";
import Post from "./Post";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { FeedContainer } from "./styles/Feed.styled";

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

  // console.log('isHome?', isHome(params))
  // console.log('is this currentUser profile?', params.id === user.id)
  // console.log('posts', posts.length)
  // console.log((params.id !== user.id && posts.length < 1))

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
    <FeedContainer>
      <div className="feedWrapper">
        {/* hide 'create post' on profile page */}
        {isHome(params) && <PostForm user={user} setUser={setUser} />}

        {(params.id === user.id && posts.length < 1) && <span>Your profile is empty. Try creating a post from the timeline feed.</span>}

        {
          isHome(params) ?
            (params.id !== user.id && posts.length < 1) && <span>You have an empty timeline. Try creating a post or getting some friends to see what they have posted.</span>
            :
            (params.id !== user.id && posts.length < 1) && <span>This user has not shared any posts yet.</span>
        }

        {posts?.map((p) => (
          <Post user={user} setUser={setUser} key={p._id} post={p} profileUser={profileUser} postOwner={postOwner} />
        ))}

      </div>
    </FeedContainer>
  );
}

export default Feed;
