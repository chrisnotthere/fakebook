import styled from 'styled-components'

export const SettingsContainer = styled.div`

  display: flex;

  .settingsWrapper {
    padding: 1.5rem;
    flex: 9;
    height: calc(100vh - 5rem);
    background-color: ${({ theme }) => theme.colors.lightblue};
    top: 5rem;
  }

`;
