import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { fetchSvgIcon } from "../api/api";
import { Trait } from "../Home";

interface CardProps {
    title: string,
    desc: string,
    icon: string,
    type: string,
    traits: Trait[],
    forwardedRef: React.Ref<HTMLDivElement>
}

const Card: React.FC<CardProps> = ({ title, desc, icon, type, traits, forwardedRef }) => {
    const [iconData, setIconData] = useState('');

    useEffect(() => {
        if (icon !== '') fetchSvgIcon(icon).then(data => {
            if (data instanceof Blob) {
                setIconData(URL.createObjectURL(data));
            }
        });
    }, [icon]);

    return (
        <CardContainer ref={forwardedRef} >
            <CardDiv>
                <CardIcon src={iconData} />
                <CardTitleDiv>
                    <CardTitle>{title}</CardTitle>
                    { title && <UnderlineDivider /> }
                </CardTitleDiv>
                <ItemTypeDiv>
                    <ItemType>{type}</ItemType>
                </ItemTypeDiv>
                <CardDescDiv>
                    <CardDesc>{desc}</CardDesc>
                    { desc && <UnderlineDivider /> }
                </CardDescDiv>
                <CardTraitsDiv>
                    {
                        traits.map((trait, index) => (
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

const CardTitleDiv = styled.div`
    position: relative;
    grid-row: 2 / span 1;
    margin: 0 1em;
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
`;

const CardDiv = styled.div`
    display: grid;
    grid-template-rows: repeat(10, 1fr);
    width: 32em;
    height: 44em;
    background-color: #ffffff;
    border-radius: 2em;
    border: 0.3em #414141 solid;
`;

export default Card;