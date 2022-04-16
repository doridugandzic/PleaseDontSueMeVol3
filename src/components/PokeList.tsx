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
        return <PokeCards name={pokemon.name} id={extractId(pokemon.url)}></PokeCards>
    });

    var pokeListMap1 = list?.results?.slice(4, 8).map((pokemon: IPokeEntries, i: number) => {
        return <PokeCards name={pokemon.name} id={extractId(pokemon.url)}></PokeCards>
    });

    var pokeListMap2 = list?.results?.slice(8, 12).map((pokemon: IPokeEntries, i: number) => {
        return <PokeCards name={pokemon.name} id={extractId(pokemon.url)}></PokeCards>
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
                <button onClick={() => previousPage()} disabled={currentPage == 0}>{"<"}</button>
                <div>{currentPage}</div>
                <button onClick={() => nextPage()} disabled={currentPage * 12 == 1120}>{">"}</button>
            </div >
        </div >
    )
}

