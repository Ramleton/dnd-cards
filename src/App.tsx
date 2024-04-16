import React from 'react';
import Header from './components/Header';
import styled, { createGlobalStyle } from 'styled-components';

const App = () => {
  return (
    <AppContainer>
      <GlobalStyles />
      <Header></Header>
      <OptionsGrid />
    </AppContainer>
  );
};

const GlobalStyles = createGlobalStyle`
  body, h1, ul, ol, p, button, input {
    margin: 0;
    padding: 0;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  flex-grow: 7;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export default App;