import React, {useEffect, useState} from 'react';

import './evento-detalhe.css';
import NavBar from '../../components/navbar';
import firebase from '../../config/firebase';
import 'firebase/auth';

function EventoDetalhe({match}){
    return (
        <>
            <NavBar/>
            {match.params.id}
        </>
    )
}

export default EventoDetalhe;