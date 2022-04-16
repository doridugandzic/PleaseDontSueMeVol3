import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPokemonDetails } from '../requests/requests';
import { useParams } from 'react-router';
import '../App.css';
import { IAbilities, IPokemon, IStats, ITypes } from '../models/models';
import PokeStats from './PokeStats';
import PokeCards from './PokeCards';


export default function PokeDetails() {
    let history = useNavigate();
    const { pokeId } = useParams();

    const [currentPokemon, setCurrentPokemon] = useState({} as IPokemon);
    const [image, setImage] = useState();
    const [render, setRerender] = useState(false);
    useEffect(() => {

        if (pokeId === undefined) {
            history('/')
        }
        const getPokeData = async () => {
            var pokeData = await getPokemonDetails(pokeId!);
            console.log(pokeData)
            setCurrentPokemon(pokeData)
            setImage(require(`../img/img_${pokeData.name}.png`))
            setRerender(!render);
        }
        getPokeData();
    }, [])

    const pokemonTypes = currentPokemon?.types?.map((type: ITypes) => {
        return <span key={type.type.name}>{type.type.name} </span>
    })

    const pokemonAbilities = currentPokemon?.abilities?.map((ability: IAbilities, i: number) => {
        return <span key={i} className={"stat-value"}>{ability.ability.name.toUpperCase()}</span>
    })

    const pokemonStatsCol1 = currentPokemon?.stats?.slice(0, 3).map((stats: IStats, i: number) => {
        return <PokeStats
            key={i}
            statValue={stats.base_stat}
            statName={stats.stat.name}
            effort={stats.effort}

        />
    })

    const pokemonStatsCol2 = currentPokemon?.stats?.slice(3).map((stats: IStats, i: number) => {
        return <PokeStats
            key={i}
            statValue={stats.base_stat}
            statName={stats.stat.name}
            effort={stats.effort}

        />
    })

    return (
        <div className={'back-container'}>
            <div className={"back-button"} onClick={() => history(-1)}>{"< Back"}</div>

            <div className={'container-left'}>
                <div className={'pokedetail-header'}>
                    <div className={'name'}>{currentPokemon.name}</div>
                    <div className={'sub'}>{(pokemonTypes !== undefined) ? pokemonTypes : ""}, family {currentPokemon?.species?.name}</div>
                </div>

                <div className={'ability-wrapper'}>
                    {pokemonAbilities}
                </div>

                <div className={'stats-wrapper'}>
                    {pokemonStatsCol1}
                </div>
                <div className={'stats-wrapper'}>
                    {pokemonStatsCol2}
                </div>
            </div>
            <div className={'container-right'}>
                <PokeCards name={currentPokemon.name} id={currentPokemon.id} image={image}></PokeCards>
            </div>
        </div>
    )
}