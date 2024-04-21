import React, { createContext, useReducer, ReactNode } from "react";

export type Item = 
    | 'Light Armour'
    | 'Medium Armour'
    | 'Heavy Armour'
    | 'Melee Weapon'
    | 'Ranged Weapon'
    | 'Jewellery'
    | 'Accessory'
    | null;

export type Rarity =
    | 'Common'
    | 'Uncommon'
    | 'Rare'
    | 'Very Rare'
    | 'Legendary'
    | null;

export interface Trait {
    name: string;
    desc: string;
}

export interface CardContextState {
    title: string,
    desc: string,
    icon: string,
    type: Item,
    rarity: Rarity,
    traits: Trait[],
}

export type CardContextAction =
    | { type: 'SET_TITLE'; payload: string }
    | { type: 'SET_DESC'; payload: string }
    | { type: 'SET_ICON'; payload: string }
    | { type: 'SET_TYPE'; payload: Item }
    | { type: 'SET_RARITY'; payload: Rarity }
    | { type: 'ADD_TRAIT'; payload: Trait }
    | { type: 'REMOVE_TRAIT'; payload: number };

const initialState: CardContextState = {
    title: '',
    desc: '',
    icon: '',
    type: null,
    rarity: null,
    traits: []
};

const reducer = (state: CardContextState, action: CardContextAction): CardContextState => {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_DESC':
            return { ...state, desc: action.payload };
        case 'SET_ICON':
            return { ...state, icon: action.payload };
        case 'SET_TYPE':
            return { ...state, type: action.payload };
        case 'SET_RARITY':
            return { ...state, rarity: action.payload };
        case 'ADD_TRAIT':
            return { ...state, traits: [...state.traits, action.payload] };
        case 'REMOVE_TRAIT':
            return { ...state, traits: state.traits.filter((_, index) => index !== action.payload)};
        default:
            return state;
    }
};

const CardContext = createContext<{ state: CardContextState; dispatch: React.Dispatch<CardContextAction> }>({
    state: initialState,
    dispatch: () => null,
});

export const CardContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <CardContext.Provider value={{ state, dispatch }}>{children}</CardContext.Provider>;
};


export default CardContext;