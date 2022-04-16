export interface IPokemon {
    abilities: IAbilities[];
    height: number;
    id: number;
    moves: IMove[];
    name: string,
    stats: IStats[];
    types: ITypes[];
    weight: number;
    species: {
        name: string;
    }
}

export interface IAbilities {
    ability: {
        name: string;
        url: string
    }
    isHidden: boolean;
    slot: number;
}

export interface IMove {
    name: string;
    url: string;
}

export interface IStats {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
    }
}

export interface ITypes {
    type: {
        name: string;
    }
}

export interface IPokeList {
    results: IPokeEntries[];
}

export interface IPokeEntries {
    name: string;
    url: string;
}