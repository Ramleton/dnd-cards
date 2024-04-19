import React from "react";
import styled from 'styled-components';
import { MdClose } from "react-icons/md";

interface TraitItemProps {
    index: number;
    name: string;
    // eslint-disable-next-line no-unused-vars
    handleRemoveTrait: (index: number) => void;
}

const TraitItem: React.FC<TraitItemProps> = ({ index, name, handleRemoveTrait }) => {
    return (
        <TraitItemContainer>
            <TraitText>{name}</TraitText>
            <CloseIcon onClick={() => handleRemoveTrait(index)} />
        </TraitItemContainer>
    );
};

const CloseIcon = styled(MdClose)`
    color: red;
    &:hover {
        cursor: pointer;
    }
`;

const TraitItemContainer = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 90% 10%;
    background-color: #f0f0f0;
    border-radius: 0.5em;
    margin: 0 0 0.2em 0;

    &:hover {
        cursor: default;
    }
`;

const TraitText = styled.p`
    margin: 0.5em 1em;
    font-size: 1.2em;
    font-weight: bold;
    grid-column: 1 / span 1;
`;

export default TraitItem;