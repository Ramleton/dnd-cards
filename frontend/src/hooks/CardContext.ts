import { createContext } from "react";
import { Trait } from "../Home";

export interface CardContextProps {
    title: string,
    desc: string,
    icon: string,
    type: string,
    traits: Trait[],
}

const CardContext = createContext<CardContextProps>({
    title: '',
    desc: '',
    icon: '',
    type: '',
    traits: [],
});

export default CardContext;