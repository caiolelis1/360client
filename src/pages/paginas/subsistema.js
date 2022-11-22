import React, { useEffect, useState } from "react";
import { Grid, styled, Paper, Button, Container, Typography, Link } from "@material-ui/core"
import Axios from 'axios';
import { useParams } from "react-router-dom";

function Subsistema() {
   const [subsistema, setSubsistema] = useState({});
   const [users, setUsers] = useState([]);
   const [notas, setNotas] = useState([]);
   const [blocos, setBlocos] = useState([]);

   const containerStyle = { padding: 20, margin: "20px auto", maxWidth: 1200 };
   const btstilo2 = { margin: '10px 10px', width: 230 };
   const Bootbot = styled(Button)({
      backgroundColor: '#4ed840',
      borderColor: '#4ed840',
   });

   const params = useParams();
   let id = params.id;

   let teste = [];

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
      }).then((response) => {
         console.log(response)
         setUsers(response.data)
      })
   }

   const buscarNotas = (id) => {
      Axios.post('https://avaliacao-360.herokuapp.com/api/selecionaAvaliacoesPessoa', {
         id: id,
      }).then((response) => {
         for (let i = 0; i < response.data.length; i++) {

            console.log(response.data[i])
            teste.push(response.data[i])

         }
      })
   }

   useEffect(() => {
      buscarSubsistema(id);
      buscarUsers(id);
   }, [id]);

   useEffect(() => {
      console.log(users)
      for (let i = 0; i < users.length; i++) {
         buscarNotas(users[i].idpessoa)
      }
   }, [users])

   function media(tipo) {

      console.log(teste)

      const result = teste.filter(item => item.referenciaidtipoavaliacao === tipo);
      let resultLength = 0;
      let media = 0;
      for (let i in result) {
         console.log(result[i].nota)

         if (result[i].nota) {

            resultLength++;

            result[i].nota = parseInt(result[i].nota, 10);

            media += result[i].nota;
         }

      }

      media = media / resultLength;
      const mediaArredondada = +(media.toFixed(1))

      return mediaArredondada;

   }

   function imprimeNotas(title, id) {
      return (
         <form>
            <p className="tituloTipoAvaliacao">{title}</p>

            <p>Media:</p>
            <p>
               {media(id)}
            </p>

         </form>
      )
   }

   function imprimeBlocos() {
      console.log("imprimindo blocos")
      const paperStyle = { padding: 20, width: 600, margin: "20px auto" }
      const blockStyle = { color: "white", backgroundColor: "white", margin: "auto" }
      const gridStyle = { padding: 5 }
      const aux = [];
      let children = [];

      if (subsistema.idsubsistema === 64 || subsistema.idsubsistema === 184) {
         children.push((
            <div className="blocoPessoa" style={blockStyle}>
               <Grid style={gridStyle}>
                  <Paper elevation={10} style={paperStyle}>
                     <p className="tituloNomePessoa">{subsistema.nome}</p>
                     {imprimeNotas("Comunicação", 1)}
                     {imprimeNotas("Companheirismo", 2)}
                     {imprimeNotas("Pontualidade", 3)}
                     {imprimeNotas("Proatividade", 4)}
                     {imprimeNotas("Engajamento / Motivação", 5)}
                     {imprimeNotas("Trabalho em Equipe", 6)}
                     {imprimeNotas("Imparcialidade (Diretor)", 74)}
                     {imprimeNotas("Facilitador (Diretor)", 84)}
                     {imprimeNotas("Dar Autonomia (Diretor)", 94)}
                     {imprimeNotas("Acessibilidade (Diretor)", 104)}
                     {imprimeNotas("Uso da Suati (Diretor)", 144)}
                  </Paper>

               </Grid>
            </div>

         ));
      }

      else {
         children.push((
            <div className="blocoPessoa" style={blockStyle}>
               <Grid style={gridStyle}>
                  <Paper elevation={10} style={paperStyle}>
                     <p className="tituloNomePessoa">{subsistema.nome}</p>
                     {imprimeNotas("Comunicação", 1)}
                     {imprimeNotas("Companheirismo", 2)}
                     {imprimeNotas("Pontualidade", 3)}
                     {imprimeNotas("Proatividade", 4)}
                     {imprimeNotas("Engajamento / Motivação", 5)}
                     {imprimeNotas("Trabalho em Equipe", 6)}
                     {imprimeNotas("Presença", 24)}
                     {imprimeNotas("Participação", 34)}
                     {imprimeNotas("Cumprimento de tarefas", 44)}
                     {imprimeNotas("Comprometimento", 54)}
                     {imprimeNotas("Organização", 64)}
                  </Paper>

               </Grid>
            </div>

         ));
      }

      aux.push((
         <React.Fragment key={subsistema.id}>
            {children}
         </React.Fragment>
      ));

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
                  <Typography>
                     <Link href='../lista'>
                        Voltar Para a Lista.
                     </Link>
                  </Typography>
                  <div>
                     {blocos}
                  </div>

               </Container>
            </div>
         </Grid>
      </div>
   )
}

export default Subsistema;
