import React from "react";
import styled from 'styled-components';

interface CardProps {
    title: string,
    desc: string,
    icon: string
}

const Card: React.FC<CardProps> = ({ title, desc, icon }) => {
    return (
        <CardContainer>
            {title}
            {desc}
            {icon}
        </CardContainer>
    );
};

const CardContainer = styled.div`
    display: block;
    flex-direction: column;
`;

export default Card;