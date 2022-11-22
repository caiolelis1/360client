import React, { useEffect, useState } from "react";
import { Grid, styled, Paper, Button, Container, Typography, Link } from "@material-ui/core"
import Axios from 'axios';


function Lista() {
   
    const [blocos, setBlocos] = useState([]);
    const [membros, setMembros] = useState([]);
    const [subsistemas, setSubsistemas] = useState([]);
    const [sistemas, setSistemas] = useState([]);


   const containerStyle = {
      padding: 20,
      margin: "20px auto",
      maxWidth: 1200
   };

   const btstilo2 = { margin: '10px 10px', width: 230 };
   const Bootbot = styled(Button)({
      backgroundColor: '#4ed840',
      borderColor: '#4ed840',
   });
   const divStyle = { margin: "10px auto" };


   const buscarMembros = () => {
      Axios.post('https://avaliacao-360.herokuapp.com/api/selecionaPessoasOrdem', {
      }).then((response) => {
         console.log(response.data)
         setMembros(response.data)
      })
   }

   const buscarSubsistemas = () => {
    Axios.post('https://avaliacao-360.herokuapp.com/api/selecionaSubsistemas', {
    }).then((response) => {
       console.log(response.data)
       setSubsistemas(response.data)
    })
   }
   const buscarSistemas = () => {
    Axios.post('https://avaliacao-360.herokuapp.com/api/selecionaSistemas', {
    }).then((response) => {
       console.log(response.data)
       setSistemas(response.data)
    })
   }

   useEffect(() => {
      buscarMembros();
      buscarSubsistemas();
      buscarSistemas();
   }, [])

   function imprimeBlocos() {
      console.log("imprimindo blocos")
      const paperStyle = { padding: 20, width: 600, margin: "20px auto" }
      const blockStyle = { color: "white", backgroundColor: "white", margin: "auto" }
      const gridStyle = { padding: 5 }
      const aux = [];
      let children = [];

      children.push((
         <Container elevation={5} style={containerStyle}>

            <div className="blocoPessoa" style={blockStyle}>
               <Grid style={gridStyle}>
                  <Paper elevation={10} style={paperStyle}>
                     <p className="tituloNomePessoa">Membros</p>
                     {membros.map((membro) =>
                        <div style={divStyle}>
                           <a className="nameList" href={'/membro/' + membro.idpessoa}>{membro.nomecompleto}</a>
                        </div>
                     )}
                  </ Paper>
               </ Grid>
            </div>

         </Container>
      ));

      aux.push((
         <React.Fragment>
            {children}
         </React.Fragment>
      ))

      setBlocos(aux);
   }

   return (
      <div>
         <Grid>
            <div className="pageAvaliacao">
               <p></p>
               <img src="https://static.wixstatic.com/media/d979eb_5158f599534e4f0480b44a267fc68e83~mv2_d_3508_2480_s_4_2.png/v1/fill/w_367,h_259,al_c,q_85,usm_0.66_1.00_0.01/d979eb_5158f599534e4f0480b44a267fc68e83~mv2_d_3508_2480_s_4_2.webp"
                  width="100" height="70" />

               <h3>Avaliação 360 | Versão Web 0.1</h3>
               <Container elevation={5} style={containerStyle}>

                  <Bootbot type="submit" variant='contained' onClick={() => imprimeBlocos()} fullWidth style={btstilo2}> Ver Resultados</Bootbot>

                  <div>
                     {blocos}
                  </div>

               </Container>

            </div>
         </Grid>
      </div>
   )
}

export default Lista;
