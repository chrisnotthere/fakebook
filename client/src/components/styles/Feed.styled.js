import styled from 'styled-components'

export const FeedContainer = styled.div`

flex: 6;
// width: 100%;
background-color: ${({ theme }) => theme.colors.lightblue};
  
  .feedWrapper {
    padding: 1.5rem;
  }

  span {
    color: ${({ theme }) => theme.colors.mainred};
  }

`;
