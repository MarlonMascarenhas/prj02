import React, { useState } from 'react';
import 'firebase/auth';
import {Link, Redirect} from 'react-router-dom';

import Logo from '../../assets/imagens/date.svg';
import firebase from '../../config/firebase';
import './styles.css';
import Navbar from '../../components/navbar';
import { useSelector, useDispatch } from 'react-redux';

function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msg, setMsg] = useState('');
    const dispatchEvent = useDispatch();

    function handleLogin() {
        firebase.auth()
            .signInWithEmailAndPassword(email, senha)
            .then(resultado=>{
                setMsg('sucesso');
                setTimeout(() => {
                    dispatchEvent({
                        type:'LOG_IN',
                        payload: {usuarioEmail: email}
                    })
                }, 2000)
                
            }).catch(error => {
                setMsg('');
            });
    }
    
    return (
        <div>
            <Navbar/>
        
            <div className="login-content d-flex align-items-center text-center">

                {useSelector(state => state.user.usuarioLogado) === 1 ? <Redirect to="/"/> : null}

                <form className="form-sign mx-auto">

                    <img className="mb-4" src={Logo} width="72" height="72" alt="imagem de login"/>
                    <h1 className="h3 mb-3 font-weight-bold text-white">Login</h1>

                    <input type="email" id="inputEmail" className="form-control my-2" placeholder="E-mail" onChange={e =>setEmail(e.target.value) }/>
                    <input type="password" id="inputPassworld" className="form-control my-2" placeholder="Senha" onChange={e =>setSenha(e.target.value) }/>

                    <button className="btn btn-lg btn-login btn-block" type="button" onClick={handleLogin}>Logar</button>
                    


                    <div className="text-white my-5">
                        { msg === "sucesso" &&
                        <span>WOW! <strong>Você está conectado</strong></span>}
                        { msg === "" &&
                        <span>Ops! <strong>Verifique seu email e senha</strong></span>}
                    </div>

                    <div className="opcoes-login text-white my-5">
                        <Link to="/recuperaSenha"  className="mx-2">Recuperar senha</Link>
                        <Link to="/novousuario"  className="mx-2">Quero me cadastrar</Link>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login;