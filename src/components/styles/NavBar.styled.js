import styled from 'styled-components'

export const NavBarContainer = styled.div`

height: 5rem;
width: 100%;
background-color: ${({ theme }) => theme.colors.mainblue};
display: flex;
align-items: center;
position: sticky;
top: 0;
z-index: 99;

.navBarLeft {
  flex: 6;
}

.logo {
  font-size: 2.5rem;
  margin-left: 2rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: color 0.3s ease-out;
}

.logo:hover {
  color: ${({ theme }) => theme.colors.maingreen};
}

.navBarRight {
  flex: 6;
  display: flex;
  align-items: center;
  justify-content: end;
  color: white;
}

.navBarLink {
  font-size: 1rem;
  margin-right: 0.75rem;
  cursor: pointer;
  transition: color 0.3s;
}

.navBarLink:hover {
  color: ${({ theme }) => theme.colors.maingreen};
}

.navBarIcons {
  // display: flex;
}

.navBarProfilePicture {
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  margin-right: 2rem;
  object-fit: cover;
}

`;