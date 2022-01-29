import styled from 'styled-components'

export const PostContainer = styled.div`

// width: 100%;
border-radius: 10px;
box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
margin: 2rem 0;
background-color: white;

.postWrapper {
  padding: 1rem;
}

.postTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.postTopLeft {
  display: flex;
  align-items: center;
}

.postProfileImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.postUsername {
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 1rem;
}

.postDate{
    font-size: 0.75rem;
}

.postCenter{
    margin: 2rem 0;
}

.postImg{
    margin-top: 1rem;
    width: 100%;
    max-height: 500px;
    object-fit: contain;
}

.postText {
  font-size: 1.1rem;
}

.postBottom{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.postBottomLeft{
    display: flex;
    align-items: center;   
}

.likeIcon{
    width: 40px;
    height: 40px;
    margin-right: 0.5rem;
    cursor: pointer;
}

.postLikeCounter{
    font-size: 0.9rem;
}

.postCommentText{
    cursor: pointer;
    border-bottom: 1px dashed gray;
    font-size: 1rem;
}
`;