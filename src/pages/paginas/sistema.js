import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useParams } from "react-router-dom";

function Sistema (){

    //buscar sistema no db

    //buscar notas de cada membro no db

    //fazer media total e de cada membro
    //mostrar cada nota separadamente
    //fazer grafico?

    const [sistema, setSistema] = useState({});
    const [users, setUsers] = useState([]);
    const [notas, setNotas] = useState([])

    
   const params = useParams();
   let id = params.id;

   const buscarSistema = (id) => {
        Axios.post('https://avaliacao-360.herokuapp.com/api/selecionaSistema', {
            id: id,
        }).then((response) => {
            console.log(response.data[0])
            setSistema(response.data[0]);
        })
   }

   
   const buscarUsers = (id) => {
    Axios.post('https://avaliacao-360.herokuapp.com/api/buscarUsersSistema', {
       sistemaid: id,
    }).then((response) => {
       setUsers(response);
       console.log(user);
       //buscarNotas(id)
    })

 }

 const buscarNotas = (id) => {
    Axios.post('https://avaliacao-360.herokuapp.com/api/selecionaAvaliacoesPessoa', {
       id: id,
    }).then((response) => {
       setNotas(response.data);
       console.log(response.data)
    })
 }

    useEffect(() => {
        buscarSistema(id);
        buscarUsers(id);
    }, [id])

    return(
        <div>
            <h3>Sistema {id}</h3>
            <h3>{sistema.nome}</h3>
        </div>
    )
}

export default Sistema;
