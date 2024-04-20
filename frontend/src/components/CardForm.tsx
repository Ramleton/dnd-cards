import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import Select, { ActionMeta } from 'react-select';
import { StylesConfig } from 'react-select';
import TraitsForm from "./TraitsForm";
import { fetchAllSvgIcons } from "../api/api";
import { Item, Rarity, Trait } from "../hooks/CardContext";

interface SvgData {
    fileName: string;
    content: string;
    path: string;
}

interface CardFormProps {
    // eslint-disable-next-line no-unused-vars
    handleTitleChange: (newTitle: string) => void;
    // eslint-disable-next-line no-unused-vars
    handleDescChange: (newDesc: string) => void;
    // eslint-disable-next-line no-unused-vars
    handleIconChange: (newIcon: string) => void;
    // eslint-disable-next-line no-unused-vars
    handleTypeChange: (newType: Item) => void;
    // eslint-disable-next-line no-unused-vars
    handleNewTrait: (newCardTrait: Trait) => void;
    // eslint-disable-next-line no-unused-vars
    handleRemoveTrait: (index: number) => void;
    // eslint-disable-next-line no-unused-vars
    handleRarityChange: (newRarity: Rarity) => void;
}

interface Option {
    value: string;
    label: string;
}

const itemTypes: string[] = [
    'Light Armour',
    'Medium Armour',
    'Heavy Armour',
    'Melee Weapon',
    'Ranged Weapon',
    'Jewellery',
    'Accessory'
];

console.log(itemTypes);

const itemRarities = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary'];

const CardForm: React.FC<CardFormProps> = (
    { handleTitleChange, handleDescChange, handleIconChange, handleTypeChange, handleNewTrait, handleRemoveTrait, handleRarityChange }
) => {
    const [svgs, setSvgs] = useState<SvgData[]>([]);

    useEffect(() => {
        if (svgs.length === 0) {
            fetchAllSvgIcons().then((data) => {
                setSvgs(data);
                console.log(data);
            });
        }
    }, []);

    const iconOptions = svgs.map(option => ({
        value: option.path,
        label: option.fileName
    }));

    const customStyles: StylesConfig = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control: (provided: any) => ({
            ...provided,
            width: 165
        })
    };

    return (
        <div>
            <FormContainer>
                <FormItem>
                    <Label>Title:</Label>
                    <Input type='text' onChange={(event) => handleTitleChange(event.target.value)} />
                </FormItem>
                <FormItem>
                    <Label>Icon:</Label>
                    <Select
                        options={iconOptions}
                        onChange={(selectedOption: unknown, actionMeta: ActionMeta<unknown>) => {
                            if (actionMeta.action === 'clear') {
                                handleIconChange('');
                            } else if (actionMeta.action === 'select-option'
                                && typeof selectedOption !== 'string') {
                                handleIconChange((selectedOption as Option).value);
                            }
                        }}
                        isSearchable
                        isClearable
                        styles={customStyles}
                    />
                </FormItem>
                <FormItem>
                    <Label>Item Type:</Label>
                    <ItemTypeSelect onChange={(e) => handleTypeChange(e.target.value as Item)}>
                        <option value="">Select an option</option>
                        {
                            itemTypes.map(itemType => <option key={itemType} value={itemType as string}>{itemType}</option>)
                        }
                    </ItemTypeSelect>
                </FormItem>
                <FormItem>
                    <Label>Rarity:</Label>
                    <ItemTypeSelect onChange={(e) => handleRarityChange(e.target.value as Rarity)}>
                        <option value="">Select an option</option>
                        {
                            itemRarities.map(rarity => <option key={rarity} value={rarity}>{rarity}</option>)
                        }
                    </ItemTypeSelect>
                </FormItem>
            </FormContainer>
            <TraitsForm handleNewTrait={handleNewTrait} handleRemoveTrait={handleRemoveTrait} />
            <FormContainer>
                <Label>Description</Label>
                <DescInput onChange={(event) => handleDescChange(event.target.value)} />
            </FormContainer>      
        </div>
    );
};

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em 10em;
`;

const ItemTypeSelect = styled.select`
    
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;  
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1.25em;
  color: white;
  margin: 1em 0.5em;
`;

const Input = styled.input`
  padding: 0.5em;
  border: 0.2em solid #ccc;
  border-radius: 0.25em;
`;

const DescInput = styled.textarea`
  padding: 0.5em;
  border: 0.2em solid #ccc;
  border-radius: 0.25em;
  width: 100%;
  height: 10em;
  resize: none;
`;

export default CardForm