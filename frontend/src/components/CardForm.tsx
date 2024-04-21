import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import TraitsForm from "./TraitsForm";
import { fetchAllSvgIcons } from "../api/api";
import FormTop from "./FormTop";

interface SvgData {
    fileName: string;
    content: string;
    path: string;
}

const CardForm: React.FC = () => {
    // const { dispatch } = useContext(CardContext);
    const [svgs, setSvgs] = useState<SvgData[]>([]);

    useEffect(() => {
        if (svgs.length === 0) {
            fetchAllSvgIcons().then((data) => {
                setSvgs(data);
                console.log(data);
            });
        }
    }, []);

    // const iconOptions = svgs.map(option => ({
    //     value: option.path,
    //     label: option.fileName
    // }));

    // const customStyles: StylesConfig = {
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     control: (provided: any) => ({
    //         ...provided,
    //         width: 165
    //     })
    // };

    // const handleTitleChange = (newTitle: string) => {
    //     dispatch({ type: 'SET_TITLE', payload: newTitle });
    // };

    // const handleIconChange = (newIcon: string) => {
    //     dispatch({ type: 'SET_ICON', payload: newIcon });
    // };

    // const handleTypeChange = (newItemType: Item) => {
    //     dispatch({ type: 'SET_TYPE', payload: newItemType });
    // };

    // const handleRarityChange = (newRarity: Rarity) => {
    //     dispatch({ type: 'SET_RARITY', payload: newRarity });
    // };

    // const handleDescChange = (newDesc: string) => {
    //     dispatch({ type: 'SET_DESC', payload: newDesc });
    // };

    return (
        <FormContainer>
            <FormTop />
            <TraitsForm />
            <div></div> 
        </FormContainer>
    );
};

const FormContainer = styled.form`
    background-color: #343837;
    margin: 1em 1em;
    border-radius: 2em;
    display: grid;
    grid-template-areas: 1fr 1fr 1fr;
    align-items: center;
    padding: 1em 1em;
`;


export default CardForm