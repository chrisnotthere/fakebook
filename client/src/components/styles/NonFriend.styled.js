import styled from 'styled-components'

export const NonFriendContainer = styled.div`

  .nonFriends {
    padding: 0;
  }

  .nonFriend {
    border-radius: 0.5rem;
    list-style: none;
    display: flex;
    gap: 1.5rem;
    align-items: center;
    flex-direction: column;
    display: in-line;
    width: 25rem;
    background-color: ${({ theme }) => theme.colors.offblue};
    margin: 0.25rem;
    padding: 1.25rem;
  }

  .nonFriend:hover {
    background-color: ${({ theme }) => theme.colors.offwhite};
  }

  .send {
    background-color: ${({ theme }) => theme.colors.lightgreen};
  }

  .cancel {
    background-color: ${({ theme }) => theme.colors.lightred};
  }

  .nonFriendProfileImgContainer {
    margin-right: 10px;
    position: relative;
  }

  .nonFriendProfileImg {
    width: 125px;
    height: 125px;
    border-radius: 30%;
    object-fit: cover;
  }

  .nonFriendUsername {
    margin-right: 1rem;
  }

  .nonFriendButton {
    cursor: pointer;
    border: none;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-weight: 400;
    margin-right: 1rem;
  }

`;
