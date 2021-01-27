import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import './card.css';
import firebase from '../../config/firebase';

function EventoCard(key, img, titulo, detalhes, visualizacoes){

    useEffect(() => {

    }, [])

    return (
        <div className="col-md-3 col-sm-12">
            <img src="https://via.placeholder.com/100x50" className="img-cartao card-img" alt="banner do evento"/>
            <div className="card-body">
                <h5>{titulo}</h5>
                <p className="text-cartao">{detalhes}</p>
            </div>

            <div className="row rodape-cartao d-flex align-items-center">
                <div className="col-6">
                    <Link to="/" className="btn btn-sm btn-detalhes">+ Detalhes</Link>
                </div>
                <div className="col-6">
                    <i className="fas fa-eye"></i><span className="ml-2">{visualizacoes}</span>
                </div>
            </div>
        </div>
    )
}

export default EventoCard;