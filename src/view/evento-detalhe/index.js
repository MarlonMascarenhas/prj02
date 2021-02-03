import React, {useEffect, useState} from 'react';

import './evento-detalhe.css';
import NavBar from '../../components/navbar';
import firebase from '../../config/firebase';
import 'firebase/auth';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function EventoDetalhe({match}){

    const [evento, setEvento] = useState([]);
    const [imagem, setImagem] = useState();
    const usuarioLogado = useSelector(state => state.user.usuarioEmail)

    const [carregando, setCarregando] = useState(1);

    useEffect(()=>{
        firebase.firestore().collection('eventos').doc(match.params.id).get()
            .then(resultado => {
                setEvento(resultado.data())
                firebase.storage().ref(`imagens/${resultado.data().foto}`).getDownloadURL()
                    .then(url => {
                        setImagem(url)
                        setCarregando(0)
                    })

            })
    },[])
    return (
        <>
            <NavBar/>
            <div className="container-fluid">
                {carregando === 1 ? 
                    <div className="row carregando">
                        <div className=" col-12 spinner-border text-primary mx-auto" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                    </div>
                :
                    <div>
                        <div className="row">
                            <img src={imagem} className="img" alt="baner do evento"/>
                            <div className="col-12 text-align-right mt-1 visualizacoes">
                                <i className="fas fa-eye"><span className="mx-2">{evento.visualizacoes}</span></i>
                            </div>

                            <h3 className="text-center titulo">{evento.titulo}</h3>
                        </div>
                        <div className="row mt-5 flex justify-content-around">
                            <div className="col-md-3 box-info p-3 my-2">
                                <i className="fas fa-ticket-alt fa-2x"></i>
                                <h5><strong>{evento.tipo}</strong></h5>
                                <span>festa</span>
                            </div>

                            <div className="col-md-3 box-info p-3 my-2">
                                <i className="fas fa-ticket-alt fa-2x"></i>
                                <h5><strong>Data</strong></h5>
                                <span>{evento.data}</span>
                            </div>

                            <div className="col-md-3 box-info p-3 my-2">
                                <i className="fas fa-ticket-alt fa-2x"></i>
                                <h5><strong>Hora</strong></h5>
                                <span>{evento.hora}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 text-center">
                                <h5>Detalhe</h5>
                            </div>
                            <p className="col-12 mx-5">{evento.detalhe}</p>
                        </div>
                        {usuarioLogado === evento.usuario ? 
                            <Link to={`/editaEvento/${match.params.id}`} className="btn-editar"> <i className="fas fa-pen-square fa-3x"></i> </Link>
                        : ''}
                    </div>
                }
            </div>
        </>
    )
}

export default EventoDetalhe;