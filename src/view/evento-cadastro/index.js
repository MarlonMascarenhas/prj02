import React, {useState, useEffect} from 'react';
import './evento-cadastro.css';
import {Redirect} from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../components/navbar';
import firebase from '../../config/firebase';

function EventoCadastro({match}){
    const usuarioLogado = useSelector(state => state.user.usuarioEmail);
    const [msg, setMsg] = useState("");

    const [titulo, setTitulo] = useState("");
    const [tipo, setTipo] = useState("");
    const [detalhe, setDetalhe] = useState("");
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [fotoNova, setFotoNova] = useState();
    const [carregando, setCarregando] = useState(0);
    const [fotoAtual, setFotoAtual] = useState(0);
    const [visualizacoes, setVisualizacoes] = useState(0);
    const [criacao, setCriacao] = useState(new Date());

    const storage = firebase.storage();
    const firestore = firebase.firestore();

    useEffect(()=>{
        if (match.params.id){
            firestore.collection('eventos').doc(match.params.id).get()
                .then(resultado => {
                    setTipo(resultado.data().tipo);
                    setTitulo(resultado.data().titulo);
                    setDetalhe(resultado.data().detalhe);
                    setHora(resultado.data().hora);
                    setData(resultado.data().data);
                    setFotoAtual(resultado.data().foto);
                    setVisualizacoes(resultado.data().visualizacoes);
                    setCriacao(resultado.data().criacao);
                })
        }
    }, []);

    function atualizar(){
        
        setCarregando(1);
        if (fotoNova)
            storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);

            firestore.collection('eventos').doc(match.params.id).update({
                titulo: titulo,
                tipo: tipo,
                detalhe: detalhe,
                data: data,
                hora: hora,
                visualizacoes: visualizacoes,
                publico: 1,
                foto: fotoNova ? fotoNova.name : fotoAtual,
                usuario: usuarioLogado,
                criacao: criacao
            }).then(() => { 
                setMsg("sucesso");
                setCarregando(0)
                
            }).catch(() =>{ 
                setMsg("erro");
                setCarregando(0) 
            });

    }

    function cadastrar(){
        setCarregando(1);
        
        storage.ref(`imagens/${fotoNova.name + new Date()}`)
                .put(fotoNova)
                .then(() => {
                    firestore.collection('eventos').add({
                        titulo: titulo,
                        tipo: tipo,
                        detalhe: detalhe,
                        data: data,
                        hora: hora,
                        visualizacoes: 0,
                        publico: 1,
                        foto: fotoNova.name + new Date(),
                        usuario: usuarioLogado,
                        criacao: new Date()
                    }).then(() => { 
                        setMsg("sucesso");
                        setCarregando(0)
                    }).catch(() =>{ 
                        setMsg("erro");
                        setCarregando(0) 
                    });

                }).catch( () =>{
                    setMsg("erro");
                    setCarregando(0) 
                });    
    }

    return (
        <>
            {msg === "sucesso" ? <Redirect to="/"/> : null}
            <NavBar/>

            <div className="col-12 mt-5">

                <div className="row">
                    <h3 className="mx-auto font-weight-bold"> {match.params.id ? 'Editar evento' : 'Novo evento'} </h3>
                </div>

                <form>
                    <div className="form-group">
                        <label>Título:</label>
                        <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label>Tipo do evento:</label>
                        <select className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)} >
                            <option disabled selected>Selecione um tipo</option>
                            <option>Festa</option>
                            <option>Palestra</option>
                            <option>Teatro</option>
                            <option>Show</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Descrição:</label>
                        <textarea rows="3" className="form-control" value={detalhe} onChange={(e) => setDetalhe(e.target.value)}/>
                    </div>

                    <div className="form-group row">
                        <div className="col-6"> 
                            <label>Data:</label>
                            <input type="date" className="form-control" value={data} onChange={(e) => setData(e.target.value)} />
                        </div>

                        <div className="col-6"> 
                            <label>Hora:</label>
                            <input type="time" className="form-control" value={hora} onChange={(e) => setHora(e.target.value)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Upload de foto: {match.params.id ? 'caso queira manter a mesma foto, nao precisa escolher novamente' : '' }</label>
                        <input type="file" className="form-control" onChange={(e) => setFotoNova(e.target.files[0])}/>
                    </div>


                    <div className="row">
                        {carregando === 1 ? 
                            <div className=" col-3 spinner-border text-primary" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                        :
                            <div className="col-3"> 
                                <button type="button" className="btn btn-lg btn-block mt-3 btn-cadastra" onClick={match.params.id ? atualizar : cadastrar}>Publicar Evento</button>
                            </div>

                        }
                        
                    </div>

                    <div className="row">
                        <div className="mx-auto my-5">
    
                            { msg === "sucesso" &&
                                <span>WOW! <strong>Evento publicado!&#128526;</strong></span> }
                            <br/>
                            { msg === "erro" &&
                                <span>Ops! <strong>Não foi possível publicar o evento!&#128549;</strong></span> }

                        </div>
                        </div>

                </form> 
            </div>
        </>
    )
}

export default EventoCadastro;
