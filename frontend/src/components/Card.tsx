import React, { useContext } from "react";
import styled from 'styled-components';
import CardContext from "../hooks/CardContext";
import { Rarity } from "../types/CardTypes";

interface CardProps {
    forwardedRef: React.Ref<HTMLDivElement>
}

const Card: React.FC<CardProps> = ({ forwardedRef }) => {
    const { state } = useContext(CardContext);

    const rarityToBackgroundColour = (rarity: Rarity): string => {
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
                return '#858585';
        }
    };

    return (
        <CardContainer $borderColour={rarityToBackgroundColour(state.rarity)} ref={forwardedRef} >
            <CardIconContainer>
                <CardIcon src={state.icon} />
            </CardIconContainer>
            <CardDetailDiv>
                <CardTitleContainer>
                    <CardTitle $isLegendary={state.rarity === 'Legendary'} >{state.title}</CardTitle>
                    <Divider />
                </CardTitleContainer>
                <CardItemTypeContainer>
                    <CardItemTypeText $isLegendary={state.rarity === 'Legendary'}>
                        {state.rarity} {state.type}
                    </CardItemTypeText>
                </CardItemTypeContainer>
                <OtherCardDetailsContainer>
                    <p><BoldText>{state.attunement ? "Requires Attunement" : "Does Not Require Attunement"}</BoldText></p>
                    <p>
                        <BoldText>
                            { `Weighs ${state.weight} lbs. ` }
                            { `Value: ${state.value}` }
                        </BoldText>
                    </p>
                    <Divider />
                </OtherCardDetailsContainer>
                <CardDescAndTraitContainer>
                    <CardDescContainer>
                        <CardDescText>{state.desc}</CardDescText>
                        <Divider />
                    </CardDescContainer>
                    <CardTraitsContainer>
                        {
                            state.traits.map((trait, index) => <CardTraitText key={index}>
                                <CardTraitBoldText>{trait.name}. </CardTraitBoldText>{trait.desc}</CardTraitText>)
                        }
                        
                    </CardTraitsContainer>
                </CardDescAndTraitContainer>
            </CardDetailDiv>
        </CardContainer>
    );
};

interface CardContainerProps {
    $borderColour: string;
}

const CardContainer = styled.div<CardContainerProps>`
    border-radius: 1.5em;
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 32em;
    height: 48em;
    border: 0.3em solid ${({ $borderColour }) => $borderColour};

    &:hover {
        cursor: default;
    }
`;

const CardIconContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 1em 1em 0em 1em;
`;

const CardIcon = styled.img`
    border-radius: 1.5em;
    width: 50%;
`;

const CardDetailDiv = styled.div`
    flex-grow: 1;
    display: grid;
    grid-template-rows: repeat(8, 1fr);
    margin: 0em 1em 1em 1em;
`;

const Divider = styled.div`
    border-bottom: 0.1cm solid black;
    width: 100%;
`;

const CardTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

interface CardTitleProps {
    $isLegendary: boolean;
}

const CardTitle = styled.p<CardTitleProps>`
    font-size: 3em;
    font-weight: bold;
    ${({ $isLegendary }) => $isLegendary && 'text-shadow: 0em 0.05em rgba(233, 110, 9, 0.6);'};
`;

const CardItemTypeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

interface CardItemTypeProps {
    $isLegendary: boolean;
}

const CardItemTypeText = styled.p<CardItemTypeProps>`
    font-size: 2.25em;
    font-weight: bold;
    ${({ $isLegendary }) => $isLegendary && 'text-shadow: 0em 0.05em rgba(233, 110, 9, 0.6);'};
`;

const OtherCardDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.3em;
`;

const BoldText = styled.span`
    font-weight: bold;
`;

const CardDescAndTraitContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-row: 4 / span 5;
`;

const CardDescContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CardDescText = styled.p`
    font-size: 1.25em;
`;

const CardTraitsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CardTraitBoldText = styled(BoldText)`
    font-style: italic;  
`;

const CardTraitText = styled.p`
    font-size: 1.2em;
`;

export default Card;