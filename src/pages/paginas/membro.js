import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useParams } from "react-router-dom";

function Membro (){

    const [user, setUser] = useState({});
    const [notas, setNotas] = useState([]);
    const [tipos, setTipos] = useState([]);

    const params = useParams();
    let id = params.id;


    const buscarUser = (id) => {
        Axios.post('https://avaliacao-360.herokuapp.com/api/buscarUser', {
            userid: id,
        }).then((response) => {
            setUser(response.data[0]);
            console.log(user);
            buscarNotas(id)
        })

    }

    const buscarNotas = (id) => {
        Axios.post('https://avaliacao-360.herokuapp.com/api/selecionaAvaliacoesPessoa', {
            id:id,
        }).then((response) => {
            setNotas(response.data);
            console.log(notas)
        })
    }

    const buscarTipos = () =>{
        Axios.post('https://avaliacao-360.herokuapp.com/api/selecionaTipos',{}
        ).then((response) => {
            setTipos(response.data);
        })
    }

    useEffect(()=>{
        buscarUser(id);
        buscarTipos();
    },[])
    //buscar usuario no db

    //buscar notas no db

    //fazer media
    //mostrar cada nota separadamente
    //fazer grafico?

    return(
        <div>

            <h3>{user.nomecompleto}</h3>
            {tipos.map( (tipo) =>
                <h1>{tipo.nome}</h1>
            )}        
        </div>
        
    )
}

export default Membro;
