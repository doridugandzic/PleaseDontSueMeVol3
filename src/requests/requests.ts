import { AxiosResponse } from 'axios';
import { IPokeList, IPokemon } from '../models/models';
const axios = require('axios')

var api = 'https://pokeapi.co/api/v2'

export function getPokemonDetails(pokemonName: string | number) {
    return axios.get(`${api}/pokemon/${pokemonName}`)
        .then(function (response: AxiosResponse<IPokemon>) {
            console.log(response.data);
            return response.data;
        }).catch(function (error: any) {
            console.error("err: ", error)
        })
}


export function getPokemonList(lim: number, off: number) {
    return axios.get(`${api}/pokemon?limit=${lim}&offset=${off}`)
        .then(function (response: AxiosResponse<IPokeList[]>) {
            console.log(response.data);
            return response.data;
        }).catch(function (error: any) {
            console.error("err: ", error)
        })
}

