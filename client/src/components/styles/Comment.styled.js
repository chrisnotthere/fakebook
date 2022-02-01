import styled from 'styled-components'

export const CommentContainer = styled.div`

  .comment {
    width: 100%;
    border-radius: 10px;
    margin: 1rem 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .commentWrapper {
    padding: 1rem;
    display: flex;
    background-color: ${({ theme }) => theme.colors.offblue};
    border-radius: 1rem;
  }

  .commentUsername {
    font-weight: 500;
  }

  .commentPicture img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0.75rem;
  }

  .commentHr {
    width: 70%;
    margin: auto;
    border: 1px solid ${({ theme }) => theme.colors.offblue}
  }

  .commentLikes {
    display: flex;
    align-items: center;
  }

`;
