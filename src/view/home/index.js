import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';

import './styles.css';
import NavBar from '../../components/navbar';
import EventoCard from '../../components/card';
import firebase from '../../config/firebase';
import 'firebase/auth';

function Home({match}){

    const [eventos, setEventos] = useState([]);
    const listaEventos = [];
    const [pesquisa, setPesquisa] = useState('');
    const usuarioLogado = useSelector(state => state.user.usuarioEmail);
    
    useEffect(() => {
        if (match.params.parametro) {
            firebase.firestore().collection('eventos').where('usuario', '==', usuarioLogado ).get()
                .then( resultado => {
                    resultado.docs.forEach(doc => {
                        if(doc.data().titulo.indexOf(pesquisa) >= 0 ){
                            listaEventos.push({id: doc.id, ...doc.data()})
                        }
                        
                    })
                    setEventos(listaEventos);
                })
            }
        else {
            firebase.firestore().collection('eventos').get()
                .then( resultado => {
                    resultado.docs.forEach(doc => {
                        if(doc.data().titulo.indexOf(pesquisa) >= 0 ){
                            listaEventos.push({id: doc.id, ...doc.data()})
                        }
                        
                    })
                    setEventos(listaEventos);
                });
        }
    }, [pesquisa]);
        
    return (
        <div>
            <NavBar/>
            <div className="row p-3">
                <h2>Eventos Publicados</h2>
                <input type="text" onChange={(e)=> setPesquisa(e.target.value)}
                    placeholder="Pesquisar evento pelo titulo..."
                    className="form-control text-left" />
            </div>
            <div className="row p-3">
                
                { eventos.map(item => <EventoCard key={item.id} 
                                                img={item.foto} 
                                                titulo={item.titulo} 
                                                detalhes={item.detalhe} 
                                                visualizacoes={item.visualizacoes} 
                                                id={item.id} />) }
            </div>
            
        </div>
    )
}

export default Home;