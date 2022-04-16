import { useEffect, useState } from "react";
import { IPokemon } from "../models/models";
import { getPokemonDetails } from "../requests/requests";
import PokeCards from "./PokeCards"
import 'animate.css';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function Battles() {
    let history = useNavigate();

    const pokemon = ["bulbasaur", "charmander", "charmeleon", "ivysaur", "venusaur"];

    const [pokemon1Data, setPokemon1Data] = useState({} as IPokemon);
    const [pokemon2Data, setPokemon2Data] = useState({} as IPokemon);

    const [shouldShow, setShouldShow] = useState(true);

    useEffect(() => {
        const getPokeData = async () => {
            var poke1Data = localStorage.getItem('prevWinner') ? JSON.parse(localStorage.getItem('prevWinner')!) : await getPokemonDetails(pokemon[Math.floor(Math.random() * pokemon.length)]);
            setPokemon1Data(poke1Data)
            const poke2Data = await getPokemonDetails(pokemon[Math.floor(Math.random() * pokemon.length)]);
            setPokemon2Data(poke2Data)
        }
        setTimeout(function () {
            setShouldShow(false);
        }, 1000)
        getPokeData();
    }, [])


    const [winner, setWinner] = useState();
    const [winnerNameForDisplay, setWinnerName] = useState("");

    function startBattle() {
        var score1 = 0;
        var score2 = 0;

        let a = pokemon1Data;
        let b = pokemon2Data;
        if (a.name !== b.name) {
            for (let i = 0; i < a.stats.length; i++) {
                a.stats[i].base_stat !== b.stats[i].base_stat ? (a.stats[i].base_stat > b.stats[i].base_stat ? score1++ : score2++) : (score1++ && score2++)
            }
        } else {
            score1 = score2;
        }
        let winner: any = score1 !== score2 ? (score1 > score2) ? "score1" : "score2" : "both"
        let winnerName = score1 !== score2 ? (score1 > score2) ? pokemon1Data : pokemon2Data : pokemon1Data //using pokemon1data if scores are equal as it doesn't matter which one of the same is in the next round
        setWinner(winner);
        setWinnerName(winnerName.name);
        localStorage.setItem('prevWinner', JSON.stringify(winnerName))
    }

    const winnerClass = `animate__lightSpeedIn${winner == "score1" ? "Left" : "Right"} animate__delay-1s winnerClass`;
    const loserClass = `animate__backOut${winner !== "score1" ? "Left" : "Right"}`;

    function newBattle() {
        history(0)
    }

    function resetGame() {
        history('/');
        localStorage.removeItem('prevWinner');
    }


    return (
        <div>
            <span className={`${!winner ? "hide" : "pokecard-text animate__animated animate__backInDown animate__delay-1s winner-text "}`}>{winner ? (winner == "both" ? "You both win!" : `${winnerNameForDisplay} is the winner`) : ""}</span>
            <div>
                <div className={`speech-bubble-left ${!shouldShow ? "pointer-hidden" : ""}`}>
                    <span className={"pointer-text"}>Go, {pokemon1Data.name}!</span>
                    <div className={"pointer-bubble-left"}></div>
                </div>
                {(pokemon1Data.name && pokemon2Data.name) ? <div>


                    <div style={{ "display": "inline-flex", "width": "80vw", "justifyContent": "space-evenly" }} >
                        <div className={`animate__animated ${winner ? winner == "score1" ? winnerClass : (winner !== "both" ? loserClass : "") : "animate__backInLeft animate__delay-2s "}`}><PokeCards image={require(`../img/img_${pokemon1Data.name}.png`)} id={pokemon1Data.id} name={pokemon1Data.name}></PokeCards></div>
                        <span className={`pokecard-text animate__animated animate__backInDown animate__delay-2s ${winner ? "hide" : ""}`}>VS</span>
                        <div className={`animate__animated  ${winner ? winner == "score2" ? winnerClass : (winner !== "both" ? loserClass : "") : "animate__backInRight animate__delay-2s "}`}><PokeCards image={require(`../img/img_${pokemon2Data.name}.png`)} id={pokemon2Data.id} name={pokemon2Data.name}></PokeCards></div>
                    </div>
                    {!winner ? <button onClick={() => startBattle()} className={"button-gotobattle button-startbattle animate__animated animate__backInUp  animate__delay-2s "}>Begin battle!</button> :
                        <span><button onClick={() => newBattle()} className={"button-gotobattle button-startbattle animate__animated animate__backInUp  animate__delay-3s "}>New battle!</button>
                            <button onClick={() => resetGame()} className={"button-endgame button-startbattle animate__animated animate__backInUp  animate__delay-3s "}>End the game?</button>
                        </span>}


                </div>
                    : ""
                }
                <div className={`speech-bubble-right ${!shouldShow ? "pointer-hidden" : ""}`}>
                    <span className={"pointer-text"}>Go, {pokemon2Data.name}!</span>
                    <div className={"pointer-bubble-right"}></div>
                </div>
            </div>
        </div>
    )
}