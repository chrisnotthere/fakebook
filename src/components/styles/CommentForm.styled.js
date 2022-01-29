import styled from 'styled-components'

export const CommentFormContainer = styled.div`

.commentformTextArea {
  background-color: ${({ theme }) => theme.colors.offgreen};
  padding: 1rem;
  display: flex;
  border-radius: 1rem;
}

.commentformTextArea textArea{
  width: 100%;
  border-radius: 0.5rem;
  border: none;
  resize: none;
  outline: none;
  padding: 0.5rem;
}

.commentButton {
  width: 8rem;
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  margin: 0.5rem 0;
  background-color: ${({ theme }) => theme.colors.maingreen};
  // color: white; 
}

`;
