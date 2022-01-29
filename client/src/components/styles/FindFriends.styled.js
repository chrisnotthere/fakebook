import styled from 'styled-components'

export const StyledDiv = styled.div`
  display: flex;
`;

export const FindFriendsContainer = styled.div`
  flex: 9;
  height: calc(100vh - 5rem);
  background-color: ${({ theme }) => theme.colors.lightblue};
  top: 5rem;
`;

export const FindFriendsWrapper = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.offwhite};
`;
