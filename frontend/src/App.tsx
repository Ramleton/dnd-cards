import React from 'react';
import Header from './components/Header';
import styled, { createGlobalStyle } from 'styled-components';
import Home from './pages/Home';

const App = () => {
  return (
    <AppContainer>
      <GlobalStyles />
        <Header />
        <Home />
    </AppContainer>
  );
};

const GlobalStyles = createGlobalStyle`
  body, h1, ul, ol, p, button, input {
    margin: 0;
    padding: 0;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export default App;