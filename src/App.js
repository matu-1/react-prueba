import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './presentacion/Home';
import Alumno from './presentacion/Alumno';
import AlumnoEditar from './presentacion/AlumnoEditar';

function App() {
  return (
    <div className="container">
      <Router>
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">CONASI</Link>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/alumno">Alumno</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/alumno">Materia</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/alumno">Docente</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/alumno">Grupo</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/alumno">Incripcion</Link>
                </li>
              </ul>
            </div>
          </nav>
      
          <Route path="/" exact component={Home} />
          <Route path="/alumno" exact component={Alumno}/>
          <Route path="/alumno/:idalumno" exact render={props => <AlumnoEditar {...props}/>}/>
      </Router>

    </div>
  );
}

export default App;
