import React, { useState } from 'react';
import {Link} from 'react-router-dom';

import 'firebase/auth';
import firebase from '../../config/firebase';
import './styles.css';
import Navbar from '../../components/navbar';

function UsuarioNovo(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msg, setMsg] = useState('');
    const [msgTipo, setMsgTipo] = useState('');
    const [carregando, setCarregando] = useState(false);

    function handleNewUser() {
        setMsgTipo('');
        setMsg('');
        
        if (!email || !senha || email === '' || senha === ''){
            setMsgTipo('erro');
            setMsg('E-mail e senha são obrigatórios.');
        }

        setCarregando(true);

        firebase.auth()
            .createUserWithEmailAndPassword(email, senha)
            .then(resultado=>{
                setMsgTipo('sucesso');
                setCarregando(false);
            }).catch(error => {
                setMsgTipo('erro');
                setCarregando(false);

                switch(error.message) {
                    case 'Password should be at least 6 characters':
                        setMsg('A senha deve ter pelo menos 6 caracteres!');  
                    break;
                    case 'The email address is already in use by another account.':
                        setMsg('Este email já está sendo utilizado por outro usuário!'); 
                    break; 
                    case 'The email address is badly formatted.':
                        setMsg('O formato do seu email é inválido!'); 
                    break;
                    default:
                        setMsg('Não foi possível cadastrar. Tente novamente mais tarde!');
                    break;
                }

            });
    }
    
    return (
        <div>
            <Navbar/>
        
            <div className="create-content d-flex align-items-center text-center">
                
                <form className="form-sign mx-auto">

                    <h1 className="titleCadastro h3 mb-3 font-weight-bold">Cadastrar</h1>

                    <input type="email" id="inputEmail" className="form-control my-2" placeholder="E-mail" onChange={e =>setEmail(e.target.value) }/>
                    <input type="password" id="inputPassworld" className="form-control my-2" placeholder="Senha" onChange={e =>setSenha(e.target.value) }/>
                    {
                        carregando?
                            <div class="spinner-border text-primary" role="status">
                                <span class="sr-only"></span>
                            </div>
                        :
                            <button className="btn btn-lg btn-create btn-block" type="button" onClick={handleNewUser}>Cadastrar</button>
                    }


                    <div className="text-white my-5">
                        { msgTipo === "sucesso" &&
                        <span>WOW!<strong> {msg} </strong></span>}
                        { msgTipo === "erro" &&
                        <span>Ops! <strong> {msg} </strong></span>}
                    </div>

                    <div className="opcoes-create text-white my-5">
                        <a href="#" className="mx-2">Recuperar senha</a>
                        <Link to="/login" className="mx-2">Voltar para login</Link>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default UsuarioNovo;