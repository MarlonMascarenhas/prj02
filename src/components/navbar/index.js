import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './styles.css';



function NavBar(){

    const dispatchEvent = useDispatch();

    function handleLogout (){
        dispatchEvent({
            type: 'LOG_OUT'
        })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark ">
            <span className="navbar-brand" href="#" text-white font-wight-bold>IFMG eventos</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                { useSelector(state => state.user.usuarioLogado) === 0 &&
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/novousuario">Cadastrar<span className="sr-only">(current)</span></Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login<span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                }
                { useSelector(state => state.user.usuarioLogado) === 1 &&
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Meus eventos <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Modificar Eventos <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" onClick={handleLogout}>Deslogar<span className="sr-only">(current)</span></span>
                        </li>
                    </ul>
                }
            </div>
        </nav>
    )
}

export default NavBar;