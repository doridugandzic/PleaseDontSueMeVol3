import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../img/img_poke_logo.svg';

export default function Home() {
    let history = useNavigate();

    const [animate, setAnimate] = useState(false);
    function goBattle() {
        setAnimate(true);
        setTimeout(() => {
            history('/Battles')
        }, 1200)
    }

    return (
        <div style={{ "marginTop": "15%" }} className={`animate__animated animate__backInDown animate__delay-0s ${animate ? "animate__backOutDown" : ""}`}>
            <img src={logo} className={"home-img-pos"} />
            <button className={"button-gotobattle"} onClick={() => goBattle()}>
                Start Pokemon battle
            </button>
        </div>
    )
}