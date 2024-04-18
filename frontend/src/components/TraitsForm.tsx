import React, { useState } from "react";
import styled from "styled-components";
import { Trait } from "../Home";
import TraitItem from "./TraitItem";

interface TraitsFormProps {
    traits: Trait[];
    // eslint-disable-next-line no-unused-vars
    handleNewTrait: (newTrait: Trait) => void;
    // eslint-disable-next-line no-unused-vars
    handleRemoveTrait: (index: number) => void;
}

const TraitsForm: React.FC<TraitsFormProps> = ({ traits, handleNewTrait, handleRemoveTrait }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!name.trim() || !description.trim()) {
            alert("Please enter both the trait name and description");
            return;
        }

        const newTrait: Trait = {
            name: name,
            desc: description
        };

        handleNewTrait(newTrait);

        setName('');
        setDescription('');
    };

    return (
        <TraitsContainer>
            <TraitForm onSubmit={handleSubmit}>
                <FormItem>
                    <Label>Name:</Label>
                    <Input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormItem>
                <Label>Description</Label>
                <DescTextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <SubmitButton type='submit' value='Add Trait'>
                </SubmitButton>
            </TraitForm>
            <TraitListContainer>
                <TraitListTitle>Traits</TraitListTitle>
                <TraitList>
                    {
                        traits.map((trait, index) => (
                            <TraitItem key={index} index={index} name={trait.name} handleRemoveTrait={handleRemoveTrait} />
                        ))
                    }
                </TraitList>
            </TraitListContainer>
        </TraitsContainer>
    );
};

const TraitListTitle = styled.h3`
    color: white;
    text-align: center;
    font-size: 1.5em;
    grid-row: 1 / span 1;
    margin: 0em 1em 0em 0em;
    align-self: center;
`;

const TraitList = styled.div`
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    margin: 1em 1em 0em 0em;
`;

const TraitListContainer = styled.div`
    max-height: 10em;
    overflow-y: auto;
    margin: 0em 1em 1em 1em;

    &::-webkit-scrollbar-thumb:vertical {
        margin-left: 2em;
    }
`;

const TraitsContainer = styled.div`
    display: grid;
    grid-template-columns: 60% 40%;
    height: 10em;
    margin: 1em 1em;
`;

const FormItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Label = styled.label`
    text-align: center;
    align-self: center;
    color: white;
    font-weight: bold;
    font-size: 1.5em;
    margin: 0em 0.5em 0em 0em;
`;

const Input = styled.input`
    margin: 0.2em 0em;
`;

const DescTextArea = styled.textarea`
    margin: 0em 20% 0.5em 20%;
    grid-row: 3 / span 2;
    resize: none;
`;

const SubmitButton = styled.input`
    background-color: #3a3a3a;
    color: white;
    justify-self: center;
    align-self: center;
    border-radius: 0.5em;
    &:hover {
        cursor: pointer;
        background-color: #4a4a4a;
    }
`;

const TraitForm = styled.form`
    display: grid;
    grid-template-rows: repeat(5, 1fr);
`;

export default TraitsForm;