import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useParams } from "react-router-dom";

function Subsistema (){

    //buscar sistema no db

    //buscar notas de cada membro no db

    //fazer media total e de cada membro
    //mostrar cada nota separadamente
    //fazer grafico?

    const [subsistema, setSubsistema] = useState({});
    const [users, setUsers] = useState([]);
    const [notas, setNotas] = useState([]);

    const params = useParams();
    let id = params.id;

    const buscarSubsistema = (id) => {
        Axios.post('https://avaliacao-360.herokuapp.com/api/selecionaSubsistema', {
            id: id,
        }).then((response) => {
            console.log(response.data[0])
            setSubsistema(response.data[0])
        })
    }

    const buscarUsers = (id) => {
        Axios.post('https://avaliacao-360.herokuapp.com/api/buscarUsersSubsistema', {
            subsistemaid: id,
        }).then((response) =>{
            console.log(response)
            setUsers(response)
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
        buscarSubsistema(id);
        buscarUsers(id);
    }, [id]);

    useEffect(() => {
        console.log(users)
    }, [users])

    return(
        <div>
            <h2>{subsistema.nome}</h2>
        </div>
    )
}

export default Subsistema;
