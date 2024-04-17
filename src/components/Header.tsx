import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return (
        <HeaderContainer>
            <Title>D&D Item Cards</Title>
        </HeaderContainer>
    );
};

const Title = styled.p`
  color: white;
  text-align: center;
  font-size: 1em;
`;

const HeaderContainer = styled.h1`
  display: flex;
  flex-direction: row;
  height: 2em;
  justify-content: center;
  align-items: center;
  background-color: #343837;
`;

export default Header;