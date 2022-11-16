import React from "react";
import { useParams } from "react-router-dom";

function Membro (){

    const params = useParams();

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
