import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CardContext from "../hooks/CardContext";
import { Item, Rarity } from "../types/CardTypes";
import { fetchAllSvgIcons, fetchSvgIcon } from "../api/api";

interface SvgData {
    fileName: string;
    path: string;
}

const FormTop: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [svgs, setSvgs] = useState<{ [editedFileName: string]: SvgData }>({});
    const [selectedSvg, setSelectedSvg] = useState<string>('');
    const { dispatch } = useContext(CardContext);

    useEffect(() => {
        if (Object.keys(svgs).length === 0) {
            fetchAllSvgIcons().then((data: SvgData[]) => {
                const svgMap: { [editedFileName: string]: SvgData } = {};
                data.forEach(svg => {
                    const editedFileName = svg.fileName.slice(0, -4).split('-').map(name => capitalizeFirstLetter(name)).join('');
                    svgMap[editedFileName] = svg
                });
                setSvgs(prevState => ({...prevState, ...svgMap}));
            });
        }
    }, []);

    useEffect(() => {
        if (selectedSvg) {
            fetchSvgIcon(selectedSvg).then(data => {
                if (data instanceof Blob) {
                    const url = URL.createObjectURL(data);
                    dispatch({ type: 'SET_ICON', payload: url });
                }
            });
        }
    }, [dispatch, selectedSvg]);

    const capitalizeFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    
    const itemTypes: string[] = [
        'Select an Option',
        'Light Armour',
        'Medium Armour',
        'Heavy Armour',
        'Melee Weapon',
        'Ranged Weapon',
        'Jewellery',
        'Accessory',
        'Potion',
        'Item'
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
        if (parsedWeight || parsedWeight === 0) {
            dispatch({ type: 'SET_WEIGHT', payload: parsedWeight });
        }
    };

    const handleAttunementChange = () => {
        dispatch({ type: 'SET_ATTUNEMENT', payload: !isChecked });
        setIsChecked(!isChecked);
    };

    const handleValueChange = (newValue: string) => {
        const parsedValue = parseInt(newValue);
        if (parsedValue || parsedValue === 0) dispatch({ type: 'SET_VALUE', payload: `${parsedValue}g` })
    };

    const handleIconChange = (newIcon: string) => {
        if (Object.keys(svgs).includes(newIcon)) setSelectedSvg(svgs[newIcon].path);
    };

    const handleDescChange = (newDesc: string) => {
        dispatch({ type: 'SET_DESC', payload: newDesc });
    }

    const itemTypeOptions = itemTypes.map(
        (itemType, index) => <option key={index}>{itemType}</option>
    );

    const rarityOptions = itemRarities.map(
        (rarity, index) => <option key={index}>{rarity}</option>
    );

    const getIconAuthor = (): string | undefined => {
        if (selectedSvg.length) {
            const author = selectedSvg
                .split('\\')
                .slice(-2, -1)[0]
                .split('-')
                .map(part => capitalizeFirstLetter(part))
                .join(' ');
            return `Icon by: ${author}`;
        }
    }

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
            <FormIconContainer>
                <FormSelectLabel>Icon</FormSelectLabel>
                <FormSelectIcon type="text" list="icons" onChange={event => handleIconChange(event.target.value)} />
                <datalist id="icons">
                    { Object.keys(svgs).map((svg, index) => <option key={index}>{svg}</option>) }
                </datalist>
                <FormSelectAuthor>{getIconAuthor()}</FormSelectAuthor>
            </FormIconContainer>
            <FormDescContainer>
                <FormDescLabel>Description</FormDescLabel>
                <FormDescInput onChange={event => handleDescChange(event.target.value)} />
            </FormDescContainer>
        </FormContainer>
    )
};

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
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
    height: 100%;
`;

const FormLabel = styled.label`
    font-size: 2em;
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

const FormSelectLabel = styled(FormLabel)`
    font-size: 2em;
    text-decoration: underline;
`;

const FormIconContainer = styled(FormInputContainer)`
    flex-direction: column;
    grid-row: 3 / span 2;
    justify-content: space-evenly;
    grid-column: 2;
`;

const FormSelectIcon = styled(FormTextInput)`
    font-size: 1em;
`;

const FormSelectAuthor = styled.p`
    font-size: 1.5em;
    color: white;
`;

const FormDescContainer = styled(FormInputContainer)`
    display: flex;
    flex-direction: column;
    grid-row: 5 / span 2;
    grid-column: 1 / span 2;
    justify-content: center;
    align-items: center;
`;

const FormDescLabel = styled(FormLabel)`
    font-size: 2em;
    text-decoration: underline;
`;

const FormDescInput = styled.textarea`
    flex-grow: 2;
    resize: none;
    width: 60%;
    margin: 1em 0 0 0;
`;

export default FormTop;