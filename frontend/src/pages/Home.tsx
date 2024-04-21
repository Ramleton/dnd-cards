import React from "react";
import styled from "styled-components";
import CardForm from "../components/CardForm";
import ScreenshotCard from "../components/CardScreenshot";
import { CardContextProvider } from "../hooks/CardContext";

const Home = () => {

    return (
        <HomeContainer>
            <CardContextProvider>
                <ScreenshotCard />
                <CardForm />
            </CardContextProvider>
        </HomeContainer>
    );
};

const HomeContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-grow: 1;
`;

export default Home;