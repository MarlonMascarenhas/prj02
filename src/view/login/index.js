import React, { useState } from 'react';
import './styles.css';
import Logo from '../../assets/imagens/date.svg';
import firebase from '../../config/firebase';
import 'firebase/auth';

function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    return (
        <div className="login-content d-flex align-items-center text-center">

            <form className="form-sign mx-auto">

                <img className="mb-4" src={Logo} width="72" height="72" alt="imagem de login"/>
                <h1 className="h3 mb-3 font-weight-bold text-white">Login</h1>

                <input type="email" id="inputEmail" className="form-control my-2" placeholder="E-mail"/>
                <input type="passworld" id="inputPassworld" className="form-control my-2" placeholder="Senha"/>

                <button className="btn btn-lg btn-login btn-block" type="button">Logar</button>

                <div className="text-white my-5">
                    <span>WOW! <strong>Você está conectado</strong></span>
                    <br/>
                    <span>Ops! <strong>Verifique seu email e senha</strong></span>
                </div>

                <div className="opcoes-login text-white my-5">
                    <a href="#" className="mx-2">Recuperar senha</a>
                    <a href="#" className="mx-2">Quero me cadastrar</a>
                </div>
            </form>

        </div>
    )
}

export default Login;