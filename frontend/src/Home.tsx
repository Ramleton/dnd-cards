import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAllSvgIcons } from "./api/api";
import CardForm from "./components/CardForm";
import Card from "./components/Card";

export interface SvgData {
    fileName: string;
    content: string;
    path: string;
}

const Home = () => {
    const [svgs, setSvgs] = useState<SvgData[]>([]);
    const [cardTitle, setCardTitle] = useState<string>('');
    const [cardDesc, setCardDesc] = useState<string>('');
    const [cardIcon, setCardIcon] = useState<string>('');

    useEffect(() => {
        if (svgs.length === 0) {
            fetchAllSvgIcons().then((data) => {
                setSvgs(data);
                console.log(data);
            });
        }
    }, []);

    return (
        <HomeContainer>
            <Card title={cardTitle} desc={cardDesc} icon={cardIcon} />
            <CardForm
                svgOptions={svgs}
                handleTitleChange={setCardTitle}
                handleDescChange={setCardDesc}
                handleIconChange={setCardIcon}
            />
        </HomeContainer>
    );
};

const HomeContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-grow: 1;
`;

export default Home;