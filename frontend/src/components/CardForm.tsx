import React from "react";
import styled from 'styled-components';
import TraitsForm from "./TraitsForm";
import FormTop from "./FormTop";

const CardForm: React.FC = () => {
    return (
        <FormContainer>
            <FormTop />
            <TraitsForm />
        </FormContainer>
    );
};

const FormContainer = styled.div`
    background-color: #343837;
    margin: 1em 1em;
    border-radius: 2em;
    display: grid;
    grid-template-areas: 1fr 1fr;
    align-items: center;
    padding: 1em 1em;
`;


export default CardForm