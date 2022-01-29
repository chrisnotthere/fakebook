import styled from 'styled-components'

export const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.offwhite};
  display: flex;
  align-items: center;
  justify-content: center;

  .loginWrapper{
    width: 75%;
    height: 60%;
    display: flex;
  }

  .loginLeft,
  .loginRight {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.5rem
  }
  
  .loginLogo {
    font-size: 4rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.mainblue};
  }
  
  .loginDesc {
    font-size: 1.25rem;
  }
  
  .loginBox{
    height: 25rem;
    padding: 2rem;
    background-color: white;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .loginInput{
    height: 3rem;
    border-radius: 1rem;
    border: 1px solid gray;
    font-size: 1rem;
    padding-left: 1rem;
  }
  
  .loginInput:focus{
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
  
  .register{
    background-color: ${({ theme }) => theme.colors.maingreen};
  }

`;
