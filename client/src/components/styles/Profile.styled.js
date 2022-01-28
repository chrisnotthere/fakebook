import styled from 'styled-components'

export const ProfileContainer = styled.div`
  display: flex;

  .profileRight{
    flex: 9;
  }
  
  .profileCover{
    height: 20rem;
    position: relative;
  }
  
  .profileCoverImg{
    width: 100%;
    height: 20rem;
    object-fit: cover;
  }
  
  .profileUserImg{
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 8rem;
    border: 3px solid white;
  }
  
  .profileInfo{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .profileInfoName{
    font-size: 2.5rem;
    font-weight: 500;
  }
  
  .profileInfoDesc{
    font-weight: 300;
    width: 80%;
    margin-bottom: 0.25rem;
  }
  
  .profileRightBottom{
    display: flex;
  }
  
`;