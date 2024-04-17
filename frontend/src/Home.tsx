import React from "react";
import styled from "styled-components";
import OptionsGrid from "./components/OptionsGrid";

const Home = () => {
    return (
        <HomeContainer>
            <OptionsGrid />
        </HomeContainer>
    );
};

const HomeContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`;

export default Home;