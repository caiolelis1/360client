import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useParams } from "react-router-dom";

function Membro (){

    const [user, setUser] = useState();
    const [notas, setNotas] = useState();
    const params = useParams();
    let id = params.id;


    const buscarUser = (id) => {
        Axios.post('https://avaliacao-360.herokuapp.com/api/buscarUser', {
            userid: id,
        }).then((response) => {
            setUser(response.data[0]);
            console.log(response.data[0]);
            buscarNotas(id)
        })

    }

    const buscarNotas = (id) => {
        Axios.post('https://avaliacao-360.herokuapp.com/api/selecionaAvaliacoesPessoa', {
            id:id,
        }).then((response) => {
            setNotas(response.data);
            console.log(response.data)
        })
    }

    useEffect(()=>{
        buscarUser(id);
    },[])
    //buscar usuario no db

    //buscar notas no db

    //fazer media
    //mostrar cada nota separadamente
    //fazer grafico?

    return(
        <div>
            <div>Membro {params.id}</div>
        </div>
        
    )
}

export default Membro;
