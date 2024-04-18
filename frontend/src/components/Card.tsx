import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { fetchSvgIcon } from "../api/api";

interface CardProps {
    title: string,
    desc: string,
    icon: string
}

const Card: React.FC<CardProps> = ({ title, desc, icon }) => {
    const [iconData, setIconData] = useState('');

    useEffect(() => {
        if (icon !== '') fetchSvgIcon(icon).then(data => {
            if (data instanceof Blob) {
                setIconData(URL.createObjectURL(data));
            }
        });
    }, [icon]);

    return (
        <CardContainer>
            <CardDiv>
                <CardIcon src={iconData} />
                <CardTitleDiv>
                    <CardTitle>{title}</CardTitle>
                    <UnderlineDivider />
                </CardTitleDiv>
                <CardDescDiv>
                    <CardDesc>{desc}</CardDesc>
                </CardDescDiv>
            </CardDiv>
        </CardContainer>
    );
};

const CardIcon = styled.img`
    border-radius: 3em;
    margin: 1em 1em;
    grid-row: 1 / span 1;
    justify-self: center;
    align-self: center;
    width: 50%;
    height: auto;
`;

const CardTitleDiv = styled.div`
    position: relative;
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
    bottom: 1em;
    left: 0;
    width: 100%;
    height: 0.2em;
    background-color: black;
`

const CardDescDiv = styled.div`
    margin: 0em 1em 1em 1em;
    grid-row: 3 / span 3;
`;

const CardDesc = styled.p`
    font-size: 1.25em;
`;

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const CardDiv = styled.div`
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    width: 32em;
    height: 44em;
    background-color: #ffffff;
    border-radius: 2em;
    border: 0.3em #414141 solid;
`;

export default Card;