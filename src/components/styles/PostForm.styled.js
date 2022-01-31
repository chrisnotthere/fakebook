import styled from 'styled-components'
import { theme } from './Theme'

export const PostFormContainer = styled.div`

.postformWrapper {
  // background-color: red;
}

.postformForm {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.postformWelcome {
  font-weight: 500;
}

.postformTextArea {
  background-color: ${({ theme }) => theme.colors.offgreen};
  border-radius: 1rem;
  padding: 2rem 2rem 4rem 2rem;
  height: 5rem;
  width 100%
}

.postformTextArea textArea{
  width: 100%;
  border-radius: 0.5rem;
  height: 4rem;
  border: none;
  resize: none;
  outline: none;
}

.postformButton {
  width: 8rem;
  border: none;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  margin: 0.5rem 0;
  background-color: ${({ theme }) => theme.colors.maingreen};
}

.imageButton {
  width: 6rem;
  border: 1px white solid;
  padding: 0.55rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  margin: 0.5rem 0;
  background-color: ${({ theme }) => theme.colors.offgreen};
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.imageForm {
  display: flex;
  align-items: center;
}

.imageInput {
  width: 16rem;
  border-radius: 0.5rem;
  height: 2.5rem;
  border: none;
  resize: none;
  outline: none;
}

.hide{
  display: none;
}

`;