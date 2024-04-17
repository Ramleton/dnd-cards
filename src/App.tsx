import React from 'react';
import Header from './components/Header';
import styled, { createGlobalStyle } from 'styled-components';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Create from './Create';
import Home from './Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/create-item",
    element: <Create />
  }
]);

const App = () => {
  return (
    <AppContainer>
      <GlobalStyles />
      <Header />
      <RouterProvider router={router} />
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