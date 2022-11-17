import React, { useEffect } from "react";
import Axios from 'axios';
import { useParams } from "react-router-dom";

function Membro (){

    const params = useParams();
    let id = params.id;

    const buscarUser = (id) => {
        Axios.post('https://avaliacao-360.herokuapp.com/api/buscarUser', {
            id: id,
        }).then((response) => {
            console.log(response.data[0])
        })

    }

    useEffect(()=>{
        buscarUser(id)
    },[])
    //buscar usuario no db

    //buscar notas no db

    //fazer media
    //mostrar cada nota separadamente
    //fazer grafico?

    return(
        <div>Membro {params.id}</div>
    )
}

export default Membro;
