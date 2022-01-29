import styled from 'styled-components'

export const Signup = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.offwhite};
  display: flex;
  align-items: center;
  justify-content: center;

  .signupWrapper {
    width: 75%;
    height: 80%;
    display: flex;
  }

  .signupLeft,
  .signupRight {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.5rem
  }

  .signupLogo {
    font-size: 4rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.mainblue};
  }

  .signupDesc {
    font-size: 1.25rem;
  }

  .signupBox{
    height: 25rem;
    padding: 2rem;
    background-color: white;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .signupInput{
    height: 3rem;
    border-radius: 1rem;
    border: 1px solid gray;
    font-size: 1rem;
    padding-left: 1rem;
  }

  .signupInput:focus{
    outline: none;
  }

  .button{
    height: 3rem;
    border-radius: 1rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.mainblue};
    color: white;
    font-size: 1.25rem;
    font-weight: 400;
    cursor: pointer;
  }

`;
