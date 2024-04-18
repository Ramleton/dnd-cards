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

export interface Trait {
    name: string;
    desc: string;
}

const Home = () => {
    const [svgs, setSvgs] = useState<SvgData[]>([]);
    const [cardTitle, setCardTitle] = useState<string>('');
    const [cardDesc, setCardDesc] = useState<string>('');
    const [cardIcon, setCardIcon] = useState<string>('');
    const [cardTraits, setCardTraits] = useState<Trait[]>([]);
    const [cardType, setCardType] = useState<string>('');

    useEffect(() => {
        if (svgs.length === 0) {
            fetchAllSvgIcons().then((data) => {
                setSvgs(data);
                console.log(data);
            });
        }
    }, []);

    const addCardTrait = (newCardTrait: Trait) => {
        setCardTraits([...cardTraits, newCardTrait]);
    }

    const removeCardTrait = (index: number) => {
        setCardTraits(cardTraits.filter((_, i) => i !== index))
    }

    return (
        <HomeContainer>
            <Card title={cardTitle} desc={cardDesc} icon={cardIcon} traits={cardTraits} type={cardType} />
            <CardForm
                svgOptions={svgs}
                handleTitleChange={setCardTitle}
                handleDescChange={setCardDesc}
                handleIconChange={setCardIcon}
                handleTypeChange={setCardType}
                handleNewTrait={addCardTrait}
                handleRemoveTrait={removeCardTrait}
                traits={cardTraits}
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