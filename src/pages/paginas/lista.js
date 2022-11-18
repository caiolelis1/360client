import React, { useEffect, useState } from "react";
import Axios from 'axios';

function Lista (){

    const [membros, setMembros] = useState([]);

    const buscarMembros = () => {
        Axios.post('https://avaliacao-360.herokuapp.com/api/selecionaPessoas', {
        }).then((response) => {
            console.log(response.data)
            setMembros(response.data)
        })
    }

    useEffect(() => {
        buscarMembros();
    }, [])

    return(
        <div>
            {membros.map( (membro) => 
                <div>
                    <a>{membro.nomecompleto}</a>
                </div>

            )}
        </div>
    )
}

export default Lista;
