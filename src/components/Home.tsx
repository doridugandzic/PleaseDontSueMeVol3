import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../img/img_poke_logo.svg';

export default function Home() {
    let history = useNavigate();

    return (
        <div>
            <img src={logo} className={"home-img-pos"} />
            <button className={"button-gotobattle"} onClick={() => history('/Battles')}>
                Start Pokemon battle
            </button>
        </div>
    )
}