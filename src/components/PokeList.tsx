import { useEffect, useState } from "react"
import { getPokemonList } from "../requests/requests"
import PokeCards from "./PokeCards";
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { IPokeEntries, IPokeList } from "../models/models";

export default function PokeList() {
    let history = useNavigate();
    const { id } = useParams();
    const [off, setOff] = useState(0);
    const [lim, setLim] = useState(12);

    const [list, setList] = useState({} as IPokeList);

    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        if (id === undefined) {
            history('/')
        }
        setOff(id as any ? id as any : 0);
        setCurrentPage(id as any ? id as any : 1)
        const pokeList = async () => {
            const pokemonList = await getPokemonList(lim, (id as any ? id as any : 0) * 12);
            setList(pokemonList);
        }
        pokeList();
    }, [])

    var pokeListMap = list?.results?.slice(0, 4).map((pokemon: IPokeEntries, i: number) => {
        return <PokeCards name={pokemon.name} id={extractId(pokemon.url)} shadowInvisible={true}></PokeCards>
    });

    var pokeListMap1 = list?.results?.slice(4, 8).map((pokemon: IPokeEntries, i: number) => {
        return <PokeCards name={pokemon.name} id={extractId(pokemon.url)} shadowInvisible={true}></PokeCards>
    });

    var pokeListMap2 = list?.results?.slice(8, 12).map((pokemon: IPokeEntries, i: number) => {
        return <PokeCards name={pokemon.name} id={extractId(pokemon.url)} shadowInvisible={true}></PokeCards>
    });

    function extractId(url: string) {
        var myRegexp = /(\d+)\D*$/g;
        var match = myRegexp.exec(url);
        return parseInt(match!.toString());
    }

    async function previousPage() {
        let page = parseInt(currentPage.toString()) - 1;
        setCurrentPage(page)
        history(`/PokeList/${page}`)

        const pokemonList = await getPokemonList(lim, (page) * 12);
        setList(pokemonList);
    }

    async function nextPage() {
        let page = parseInt(currentPage.toString()) + 1;
        setCurrentPage(page)
        history(`/PokeList/${page}`)

        const pokemonList = await getPokemonList(lim, (page) * 12);
        setList(pokemonList);
    }

    return (
        <div>
            <div className={"pokelist-wrapper"}>
                <div>{pokeListMap ? pokeListMap : ""}</div>
                <div style={{ "paddingTop": "1px" }}>{pokeListMap1 ? pokeListMap1 : ""}</div>
                <div>{pokeListMap2 ? pokeListMap2 : ""}</div>
            </div>

            <div className={"pagination"}>
                <button className={"arrow"} onClick={() => previousPage()} disabled={currentPage == 0}>
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 15L1 8L8 1" stroke="#3564AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <div className={"pagination-number"}>{currentPage}</div>
                <button className={"arrow"} onClick={() => nextPage()} disabled={currentPage * 12 == 1120}>
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 15L8 8L1 1" stroke="#2A75BB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div >
        </div >
    )
}

