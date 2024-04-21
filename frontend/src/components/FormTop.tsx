import React, { useContext, useState } from "react";
import styled from "styled-components";
import CardContext, { Item, Rarity } from "../hooks/CardContext";

// interface Option {
//     value: string;
//     label: string;
// }


const FormTop: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);
    const { dispatch } = useContext(CardContext);
    
    const itemTypes: string[] = [
        'Select an Option',
        'Light Armour',
        'Medium Armour',
        'Heavy Armour',
        'Melee Weapon',
        'Ranged Weapon',
        'Jewellery',
        'Accessory'
    ];
    
    const itemRarities = [
        'Select an Option',
        'Common',
        'Uncommon',
        'Rare',
        'Very Rare',
        'Legendary'
    ];

    const handleTitleChange = (newTitle: string) => {
        dispatch({ type: 'SET_TITLE', payload: newTitle });
    };

    const handleTypeChange = (newType: string) => {
        if (newType !== 'Select an Option') {
            dispatch({ type: 'SET_TYPE', payload: newType as Item });
        }
    };

    const handleRarityChange = (newRarity: string) => {
        if (newRarity !== 'Select an Option') {
            dispatch({ type: 'SET_RARITY', payload: newRarity as Rarity });
        }
    };

    const handleWeightChange = (newWeight: string) => {
        const parsedWeight = parseFloat(newWeight);
        if (parsedWeight) {
            dispatch({ type: 'SET_WEIGHT', payload: parsedWeight });
        }
    };

    const handleAttunementChange = () => {
        dispatch({ type: 'SET_ATTUNEMENT', payload: isChecked });
        setIsChecked(!isChecked);
    };

    const handleValueChange = (newValue: string) => {
        const parsedValue = parseInt(newValue);
        if (parsedValue) dispatch({ type: 'SET_VALUE', payload: `${parsedValue}g` })
    };

    const itemTypeOptions = itemTypes.map(
        (itemType, index) => <option key={index}>{itemType}</option>
    );

    const rarityOptions = itemRarities.map(
        (rarity, index) => <option key={index}>{rarity}</option>
    );

    return (
        <FormContainer>
            <FormInputContainer>
                <FormLabel>Title:</FormLabel>
                <FormTextInput
                    type='text'
                    onChange={event => handleTitleChange(event.target.value)}
                />
            </FormInputContainer>
            <FormInputContainer>
                <FormLabel>Type:</FormLabel>
                <FormSelect
                    onChange={event => handleTypeChange(event.target.value)}
                >
                    { itemTypeOptions }
                </FormSelect>
            </FormInputContainer>
            <FormInputContainer >
                <FormLabel>Rarity:</FormLabel>
                <FormSelect
                    onChange={event => handleRarityChange(event.target.value)}
                >
                    { rarityOptions }
                </FormSelect>
            </FormInputContainer>
            <FormInputContainer>
                <FormLabel>Weight:</FormLabel>
                <FormTextInput
                    type='text'
                    onChange={event => handleWeightChange(event.target.value)}
                />
            </FormInputContainer>
            <FormInputContainer>
                <FormLabel>Attunement:</FormLabel>
                <FormCheckbox type='checkbox'
                    checked={isChecked}
                    onChange={handleAttunementChange}
                />
            </FormInputContainer>
            <FormInputContainer>
                <FormLabel>Value:</FormLabel>
                <FormTextInput
                    type='text'
                    onChange={event => handleValueChange(event.target.value)}
                />
            </FormInputContainer>
        </FormContainer>
    )
};

const FormLabel = styled.label`
    font-size: 1.2em;
    color: white;
`;

const FormTextInput = styled.input`
    height: 2em;
    overflow-x: hidden;
`;

const FormSelect = styled.select`
    height: 2em;
`;

const FormCheckbox = styled.input`
    width: 1.5em;
    height: 1.5em;
`;

const FormInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0em 0.2em;
`;

const FormContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    width: 100%;
    height: 100%;
`;

export default FormTop;