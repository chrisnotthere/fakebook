import styled from 'styled-components'

export const FriendContainer = styled.div`

.rightbarFriend {
  border-radius: 0.5rem;
  list-style: none;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.offblue};
  margin-bottom: 0.25rem;
  padding: 0.25rem
}

.rightbarFriend:hover {
  background-color: ${({ theme }) => theme.colors.offwhite};
}

.rightbarProfileImgContainer {
  margin-right: 1rem;
  position: relative;
}

.rightbarProfileImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.rightbarUsername {
  margin-right: 1rem;
}

.rightbarButton {
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.lightred};
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 400;
  margin-right: 1rem;
}

`;
