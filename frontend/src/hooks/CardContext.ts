import { createContext } from "react";

export type Item = 'Light Armour'
    | 'Medium Armour'
    | 'Heavy Armour'
    | 'Melee Weapon'
    | 'Ranged Weapon'
    | 'Jewellery'
    | 'Accessory'
    | null;

export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary' | null;

export interface Trait {
    name: string;
    desc: string;
}

export interface CardContextProps {
    title: string,
    desc: string,
    icon: string,
    type: Item,
    rarity: Rarity,
    traits: Trait[],
}

const CardContext = createContext<CardContextProps>({
    title: '',
    desc: '',
    icon: '',
    type: null,
    rarity: null,
    traits: [],
});

export default CardContext;