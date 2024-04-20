import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import { fetchSvgIcon } from "../api/api";
import CardContext, { Rarity } from "../hooks/CardContext";

interface CardProps {
    forwardedRef: React.Ref<HTMLDivElement>
}

const Card: React.FC<CardProps> = ({ forwardedRef }) => {
    const cardProps = useContext(CardContext);
    const [iconData, setIconData] = useState('');

    useEffect(() => {
        if (cardProps.icon !== '') fetchSvgIcon(cardProps.icon).then(data => {
            if (data instanceof Blob) {
                setIconData(URL.createObjectURL(data));
            }
        });
    }, [cardProps.icon]);

    type HexColour = string;

    const rarityToBackgroundColour = (rarity: Rarity): HexColour => {
        switch(rarity) {
            case 'Uncommon':
                return '#14ea22';
            case 'Rare':
                return '#03ecf8';
            case 'Very Rare':
                return '#6714ea';
            case 'Legendary':
                return '#ec9a0e';
            default:
                return '#3a3a3a';
        }
    };

    return (
        <CardContainer ref={forwardedRef} >
            <CardDiv $borderColour={rarityToBackgroundColour(cardProps.rarity)}>
                <CardIcon src={iconData} />
                <CardTitleDiv $isLegendary={cardProps.rarity === 'Legendary'} >
                    <CardTitle>{cardProps.title}</CardTitle>
                    { cardProps.title && <UnderlineDivider /> }
                </CardTitleDiv>
                <ItemTypeDiv>
                    <ItemType>
                        <span>{cardProps.rarity} {cardProps.type}</span>
                    </ItemType>
                </ItemTypeDiv>
                <CardDescDiv>
                    <CardDesc>{cardProps.desc}</CardDesc>
                    { cardProps.desc && <UnderlineDivider /> }
                </CardDescDiv>
                <CardTraitsDiv>
                    {
                        cardProps.traits.map((trait, index) => (
                            <TraitItem key={index} >
                                <p>
                                    <TraitName>{`${trait.name}.`}</TraitName>
                                    <TraitDesc>{trait.desc}</TraitDesc>
                                </p>
                            </TraitItem>
                        ))
                    }
                </CardTraitsDiv>
            </CardDiv>
        </CardContainer>
    );
};

const ItemTypeDiv = styled.div`
    display: flex;
    flex-direction: row;
    grid-row: 3 / span 1;
    margin: 0 1em;
    justify-content: center;
`;

const ItemType = styled.p`
    text-align: center;
    align-self: center;
    font-size: 2em;
    font-weight: bold;
`;

const TraitItem = styled.div`
    display: flex;
    flex-direction: column;
`;

const TraitName = styled.span`
    font-size: 1.2em;
    font-weight: bold;
    font-style: italic;
`;

const TraitDesc = styled.span`
    font-size: 1.2em;
    margin-left: 0.5em;
`;

const CardIcon = styled.img`
    border-radius: 3em;
    margin: 1em 1em;
    grid-row: 1 / span 1;
    justify-self: center;
    align-self: center;
    width: 50%;
`;

interface CardTitleDivProps {
    $isLegendary: boolean;
}

const CardTitleDiv = styled.div<CardTitleDivProps>`
    position: relative;
    grid-row: 2 / span 1;
    margin: 0 1em;
    text-shadow: ${({ $isLegendary }) => $isLegendary && "0em 0.2em 0.1em rgba(255, 123, 0, 0.6);"} 
`;

const CardTitle = styled.p`
    text-align: center;
    font-size: 3em;
    font-weight: bold;
    margin: 0;
`;

const UnderlineDivider = styled.div`
    position: absolute;
    bottom: -0.1em;
    left: 0;
    width: 100%;
    height: 0.2em;
    background-color: black;
`

const CardTraitsDiv = styled.div`
    margin: 0 1em 1em 1em;
    grid-row: 5 / span 6;
`;

const CardDescDiv = styled.div`
    position: relative;
    margin: 0em 1em 1em 1em;
    grid-row: 4 / span 1;
`;

const CardDesc = styled.p`
    font-size: 1.25em;
    margin: 0 0 0.5em 0;
`;

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &:hover {
        cursor: default;
    }
`;

const CardDiv = styled.div<{ $borderColour: string; }>`
    display: grid;
    grid-template-rows: repeat(10, 1fr);
    width: 32em;
    height: 44em;
    background-color: #ffffff;
    border-radius: 2em;
    border: 0.3em ${props => props.$borderColour} solid;
`;

export default Card;