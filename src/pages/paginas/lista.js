import React, { useEffect, useState } from "react";
import { Grid, styled, Paper, Button, Container, Typography, Link } from "@material-ui/core"
import Axios from 'axios';


function Lista() {

   const gridStyle = { padding: 5 }

   const containerStyle = {
      padding: 20,
      margin: "20px auto",
      maxWidth: 1200
   };

   const paperStyle = {
      padding: 20,
      width: 600,
      margin: "20px auto"
   };

   const blockStyle = {
      color: "white",
      backgroundColor: "white",
      margin: "auto"
   };
   const divStyle = { margin: "10px auto" };

   const [membros, setMembros] = useState([]);

   const buscarMembros = () => {
      Axios.post('https://avaliacao-360.herokuapp.com/api/selecionaPessoasOrdem', {
      }).then((response) => {
         console.log(response.data)
         setMembros(response.data)
      })
   }

   useEffect(() => {
      buscarMembros();
   }, [])

   return (
      <div>
         <Grid>
            <div className="pageAvaliacao">
               <p></p>
               <img src="https://static.wixstatic.com/media/d979eb_5158f599534e4f0480b44a267fc68e83~mv2_d_3508_2480_s_4_2.png/v1/fill/w_367,h_259,al_c,q_85,usm_0.66_1.00_0.01/d979eb_5158f599534e4f0480b44a267fc68e83~mv2_d_3508_2480_s_4_2.webp"
                  width="100" height="70" />

               <h3>Avaliação 360 | Versão Web 0.1</h3>
               <Container elevation={5} style={containerStyle}>

                  <div className="blocoPessoa" style={blockStyle}>
                     <Grid style={gridStyle}>
                        <Paper elevation={10} style={paperStyle}>
                           {membros.map((membro) =>
                              <div style={divStyle}>
                                 <a className="nameList" href={'/membro/' + membro.idpessoa}>{membro.nomecompleto}</a>
                              </div>

                           )}
                        </ Paper>
                     </ Grid>
                  </div>

               </Container>
            </div>
         </Grid>
      </div>
   )
}

export default Lista;
