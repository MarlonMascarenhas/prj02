import React, { useEffect, useState } from 'react';

import './styles.css';
import NavBar from '../../components/navbar';
import EventoCard from '../../components/card';
import firebase from '../../config/firebase';
import 'firebase/auth';

function Home(){

    const [eventos, setEventos] = useState([]);
    const listaEventos = [];
    useEffect(() => {
        firebase.firestore().collection('eventos').get()
            .then( resultado => {
                resultado.docs.forEach(doc => {
                    listaEventos.push({id: doc.id, ...doc.data()})
                })
                setEventos(listaEventos);
            });
    }, []);
    return (
        <div>

            <NavBar/>
            <div className="row p-3">
                { eventos.map(item => <EventoCard key={item.id} 
                                                img={item.foto} 
                                                titulo={item.titulo} 
                                                detalhes={item.detalhe} 
                                                visualizacoes={item.visualizacoes} />) }
            </div>
            
        </div>
    )
}

export default Home;