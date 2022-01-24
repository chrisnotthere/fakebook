import "./feed.css";
import PostForm from "../postform/PostForm";
import Post from "../post/Post";
import {Posts} from '../../testData'

function Feed() {
  return (
    <div className='feed'>
      <div className="feedWrapper">
        <PostForm />
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
        {/* <Post /> */}
      </div>
    </div>
  );
}

export default Feed;
