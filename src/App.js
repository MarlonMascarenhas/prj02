import {BrowserRouter, Route} from 'react-router-dom';

import './App.css';
import Login from './view/login';
import UsuarioNovo from './view/usuario-novo';
import Home from './view/home';
import UsuarioRecuperaSenha from './view/usuario-recuperaSenha';
import EventoCadastro from './view/evento-cadastro';


function App() {
  return (

    <BrowserRouter>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/novousuario" component={UsuarioNovo}/>
      <Route exact path="/recuperaSenha" component={UsuarioRecuperaSenha} />
      <Route exact path="/cadastraEvento" component={EventoCadastro} />  
    </BrowserRouter>
  );
}

export default App;
