import React, { useEffect, useState } from "react";
import { Grid, styled, Paper, Button, Container, Typography, Link } from "@material-ui/core"
import Axios from 'axios';
import { useParams } from "react-router-dom";

function Membro() {

   const [user, setUser] = useState({});
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


   const buscarUser = (id) => {
      Axios.post('https://avaliacao-360.herokuapp.com/api/buscarUser', {
         userid: id,
      }).then((response) => {
         setUser(response.data[0]);
         console.log(user);
         buscarNotas(id)
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
    console.log(id)
      buscarUser(id);
   }, [])

   function media(id, tipo) {

      const resultaux = notas.filter(item => item.referenciaidpessoa === id);
      const result = resultaux.filter(item => item.referenciaidtipoavaliacao === tipo);
      let resultLength = 0;
      let media = 0;
      for (let i in result) {

         if (result[i].nota) {

            resultLength++;

            result[i].nota = parseInt(result[i].nota, 2);

            media += result[i].nota;
         }

      }

      media = media / resultLength;

      return media;

   }

   function imprimeBlocos() {
      console.log("imprimindo blocos")
      const paperStyle = { padding: 20, width: 600, margin: "20px auto" }
      const blockStyle = { color: "white", backgroundColor: "white", margin: "auto" }
      const gridStyle = { padding: 5 }
      const aux = [];
      let children = [];

      children.push((
         <div className="blocoPessoa" style={blockStyle}>
            <Grid style={gridStyle}>
               <Paper elevation={10} style={paperStyle}>

                  <p className="tituloNomePessoa">
                     {user.nomecompleto}
                  </p>
                  <form>
                     <p className="tituloTipoAvaliacao">Comunicação</p>

                     <p>
                        {media(user.idpessoa, 1)}
                     </p>

                  </form>
                  <form>
                     <p className="tituloTipoAvaliacao">Companheirismo</p>

                     <p>
                        {media(user.idpessoa, 2)}
                     </p>

                  </form>
                  <form>
                     <p className="tituloTipoAvaliacao">Pontualidade</p>

                     <p>
                        {media(user.idpessoa, 3)}
                     </p>

                  </form>
                  <form>
                     <p className="tituloTipoAvaliacao">Proatividade</p>

                     <p>
                        {media(user.idpessoa, 4)}
                     </p>

                  </form>
                  <form>
                     <p className="tituloTipoAvaliacao">Enagajamento/Motivação</p>

                     <p>
                        {media(user.idpessoa, 5)}
                     </p>

                  </form>
                  <form>
                     <p className="tituloTipoAvaliacao">Trabalho em Equipe</p>

                     <p>
                        {media(user.idpessoa, 6)}
                     </p>

                  </form>
                  <form>
                     <p className="tituloTipoAvaliacao">Presença</p>

                     <p>
                        {media(user.idpessoa, 24)}
                     </p>

                  </form>
                  <form>
                     <p className="tituloTipoAvaliacao">Participação</p>

                     <p>
                        {media(user.idpessoa, 34)}
                     </p>

                  </form>
                  <form>
                     <p className="tituloTipoAvaliacao">Cumprimento de tarefas</p>

                     <p>
                        {media(user.idpessoa, 44)}
                     </p>

                  </form>
                  <form>
                     <p className="tituloTipoAvaliacao">Comprometimento</p>

                     <p>
                        {media(user.idpessoa, 54)}
                     </p>

                  </form>
                  <form>
                     <p className="tituloTipoAvaliacao">Organização</p>

                     <p>
                        {media(user.idpessoa, 64)}
                     </p>

                  </form>
                  <form>
                     <p className="tituloTipoAvaliacao">Imparcialidade</p>

                     <p>
                        {media(user.idpessoa, 74)}
                     </p>

                  </form>
                  <form>
                     <p className="tituloTipoAvaliacao">Facilitador</p>

                     <p>
                        {media(user.idpessoa, 84)}
                     </p>

                  </form>
                  <form>
                     <p className="tituloTipoAvaliacao">Dar Autonomia</p>

                     <p>
                        {media(user.idpessoa, 94)}
                     </p>

                  </form>
                  <form>
                     <p className="tituloTipoAvaliacao">Acessibilidade</p>

                     <p>
                        {media(user.idpessoa, 104)}
                     </p>

                  </form>
                  <form>
                     <p className="tituloTipoAvaliacao">Uso da Suati</p>

                     <p>
                        {media(user.idpessoa, 144)}
                     </p>

                  </form>
               </Paper>
            </Grid>
         </div>

      ));

      aux.push((
         <React.Fragment key={user.idpessoa}>
            {children}
         </React.Fragment>
      ));

      setBlocos(aux);
   }


   //mostrar cada nota separadamente
   //fazer grafico?

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
                     <Link href='avaliacao'>
                        Voltar Para a Avaliação.
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

export default Membro;
