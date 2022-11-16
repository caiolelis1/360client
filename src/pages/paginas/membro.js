import React from "react";
import { useParams } from "react-router-dom";

function Membro (){

    const params = useParams();

    return(
        <div>Membro {params.id}</div>
    )
}

export default Membro;
