import React from "react";
import styled from 'styled-components';
import Select, { ActionMeta } from 'react-select';
import { StylesConfig } from 'react-select';
import { SvgData } from "../Home";

interface CardFormProps {
    svgOptions: SvgData[];
    // eslint-disable-next-line no-unused-vars
    handleTitleChange: (newTitle: string) => void;
    // eslint-disable-next-line no-unused-vars
    handleDescChange: (newDesc: string) => void;
    // eslint-disable-next-line no-unused-vars
    handleIconChange: (newIcon: string) => void;
}

interface Option {
    value: string;
    label: string;
}

const CardForm: React.FC<CardFormProps> = ({ svgOptions, handleTitleChange, handleDescChange, handleIconChange }) => {

    const iconOptions = svgOptions.map(option => ({
        value: option.fileName,
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
            <Label>Description</Label>
            <DescInput onChange={(event) => handleDescChange(event.target.value)} />
        </FormContainer>      
    );
};

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em 10em;
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
  height: 30em;
  resize: none;
`;

export default CardForm