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

.postformTextArea {
  background-color: ${({ theme }) => theme.colors.offgreen};
  border-radius: 1rem;
  padding: 1rem;
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

.postformHr {
  margin: 2rem 0;
}

`;