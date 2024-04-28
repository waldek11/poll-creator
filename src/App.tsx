import styled, { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PollBox } from './views/poll';
import { BrowserRouter } from 'react-router-dom';
import './i18n';

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <StyledContainer>
            <PollBox />
          </StyledContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 6.25rem;

  @media only screen and (max-width: 600px) {
    padding-top: 1.5rem;
  }
`;
