import React, { useState } from "react";
import styled from "styled-components";
import CardForm from "./components/CardForm";
import ScreenshotCard from "./components/CardScreenshot";
import CardContext, { CardContextProps, Item, Rarity, Trait } from "./hooks/CardContext";

const Home = () => {
    const [cardTitle, setCardTitle] = useState<string>('');
    const [cardDesc, setCardDesc] = useState<string>('');
    const [cardIcon, setCardIcon] = useState<string>('');
    const [cardTraits, setCardTraits] = useState<Trait[]>([]);
    const [cardType, setCardType] = useState<Item>(null);
    const [cardRarity, setCardRarity] = useState<Rarity>(null);

    const addCardTrait = (newCardTrait: Trait) => {
        setCardTraits([...cardTraits, newCardTrait]);
    }

    const removeCardTrait = (index: number) => {
        setCardTraits(cardTraits.filter((_, i) => i !== index))
    }

    const cardProps: CardContextProps = {
        title: cardTitle,
        desc: cardDesc,
        icon: cardIcon,
        type: cardType,
        rarity: cardRarity,
        traits: cardTraits
    };

    return (
        <HomeContainer>
            <CardContext.Provider value={cardProps}>
                <ScreenshotCard />
                <CardForm
                    handleTitleChange={setCardTitle}
                    handleDescChange={setCardDesc}
                    handleIconChange={setCardIcon}
                    handleTypeChange={setCardType}
                    handleRarityChange={setCardRarity}
                    handleNewTrait={addCardTrait}
                    handleRemoveTrait={removeCardTrait}
                />
            </CardContext.Provider>
        </HomeContainer>
    );
};

const HomeContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-grow: 1;
`;

export default Home;