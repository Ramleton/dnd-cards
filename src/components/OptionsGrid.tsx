import React from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import ArmourIcon from '../icons/armour/visored-helm.svg';
import WeaponsIcon from '../icons/weapons/crossed-swords.svg';
import JewelleryIcon from '../icons/jewellery/diamond-ring.svg';
import ToolsIcon from '../icons/tools/gavel.svg';

interface OptionCardProps {
    text: string;
    icon: string;
}

const OptionCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #343837;
    padding: 1em 1em;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

const CardIcon = styled.img`
  width: 8em;
  margin: 0.5em 0.5em;
  border-radius: 25%;
`;

const CardText = styled.p`
  font-size: 1.75em;
  color: white;
`;

const OptionCard: React.FC<OptionCardProps> = ({ text, icon }) => {
    const navigate = useNavigate();
    return (
        <OptionCardContainer onClick={() => navigate('/create-item')}>
            <CardIcon src={icon} />
            <CardText>{text}</CardText>
        </OptionCardContainer>
    );
};

const OptionsGridContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: space-between;
  align-items: center;
  grid-template-columns: auto auto auto auto;
  margin: 1em 5em;
`;

const OptionsGrid = () => {
    return (
        <OptionsGridContainer>
            <OptionCard text='Armour' icon={ArmourIcon} />
            <OptionCard text='Weapons' icon={WeaponsIcon} />
            <OptionCard text='Jewellery' icon={JewelleryIcon} />
            <OptionCard text='Tools' icon={ToolsIcon} />
        </OptionsGridContainer>
    );
};

export default OptionsGrid;