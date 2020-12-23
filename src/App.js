import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import Login from './view/login';
import UsuarioNovo from './view/usuario-novo';


function App() {
  return (

    <BrowserRouter>
      <Route exact path="/" component={Login}/>
      <Route exact path="/novousuario" component={UsuarioNovo}/>
    </BrowserRouter>
  );
}

export default App;
