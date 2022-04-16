import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Battles from './components/Battles';
import Home from './components/Home';
import PokeDetails from './components/PokeDetails';
import PokeList from './components/PokeList';
import logo from './img/img_poke_logo.svg';

function App() {
  return (
    <Router>
      <div style={{ "backgroundColor": "#E5E5E5" }}><nav>
        <ul style={{ "maxHeight": "fit-content", "display": "flex", "paddingRight": "45px", "borderBottom": "1px solid black", "width": "100vw" }}>
          <li><Link to="/"><img className={"header-img"} src={logo}></img></Link></li>
          <li className={"header-button"}><Link to="/PokeList/0">Pokemon List</Link></li>
        </ul>
      </nav>
        <div style={{ "display": "flex", "justifyContent": "center", "alignItems": "center", "height": "80%" }}>
          <Routes>
            <Route path="/PokeDetails/:pokeId" element={<PokeDetails />} />
            <Route path="/PokeList/:id" element={<PokeList />} />
            <Route path="/Battles" element={<Battles />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
