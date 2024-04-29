export type Item = 
    | 'Light Armour'
    | 'Medium Armour'
    | 'Heavy Armour'
    | 'Melee Weapon'
    | 'Ranged Weapon'
    | 'Jewellery'
    | 'Accessory'
    | 'Potion'
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

export type Value = `${number}g`;