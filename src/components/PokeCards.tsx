import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface IPokeCardsProps {
    image?: string;
    name: string;
    id: number | string;
    shadowInvisible?: boolean;
}

export default function PokeCards(props: IPokeCardsProps) {
    let history = useNavigate();
    const [pokeState, setPokeState] = useState("" as any);
    useEffect(() => {
        setPokeState(props.id)
    })

    function redirect(event: any) {

        console.log(pokeState)
        history(`/PokeDetails/${props.id}`)
    }

    return (
        <div className={"pokecard-body"} onClick={(e) => redirect(e)}>
            <div style={{ "border": "2px solid #3564AE", "borderRadius": "16px", "margin": "24px", "height": "306px", "position": "relative", "top": "24px" }}>
                <img src={props.image} alt=""></img>
                <span>{props.name}</span>
            </div>
            {!props.shadowInvisible ? <div className={"shadow"} ></div> : ""}
        </div>
    )
}