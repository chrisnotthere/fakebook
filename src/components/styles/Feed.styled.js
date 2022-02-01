import styled from 'styled-components'

export const FeedContainer = styled.div`

  flex: 6;
  background-color: ${({ theme }) => theme.colors.lightblue};
  
  .feedWrapper {
    padding: 1.5rem;
  }

  .error {
    color: ${({ theme }) => theme.colors.mainred};
  }

`;
