import styled from 'styled-components'

export const UserNavContainer = styled.div`

  width: 14rem;
  height: calc(100vh - 5rem);
  background-color: ${({ theme }) => theme.colors.lightblue};
  position: sticky;
  top: 5rem;

  .userNavWrapper {
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.offblue};
    border-radius: 0 0 4rem;
  }

  .userNavList {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .userNavListItem {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 1rem;
    margin-bottom: 2rem;
    border-radius: 0.5rem;
    transition: background-color 0.1s ease-in
  }

  .userNavListItem:hover {
    background-color: ${({ theme }) => theme.colors.lightgreen};
  }

  .userNavIcon {
    margin-right: 0.75rem;
  }

`;
