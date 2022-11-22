import React, { useEffect, useState } from "react";
import { Grid, styled, Paper, Button, Container, Typography, Link } from "@material-ui/core"
import Axios from 'axios';
import { useParams } from "react-router-dom";
import { getTokenUser } from "../../services/auth";

function Membro() {

    
   const [userId, setUserId] = useState();
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

   const buscarLogin = (id) => {
        Axios.post('https://avaliacao-360.herokuapp.com/api/buscarUser', {
            userid: id,
        }).then((response) => {
            if(!((response.data[0].idpessoa===id)||(response.data[0].diretor===1)||(response.data[0].diretorGeral===1)||(response.data[0].capitao===1)||(response.data[0].diretorGeral===1)||(response.data[0].admin===1))){
                window.location.replace("https://youthful-euclid-69864e.netlify.app/lista")
            }

        })
    }   

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
        setUserId(getTokenUser().id)
        buscarUser(id);
    }, [id])
    useEffect(() =>{
        buscarLogin(userId);
    }, [userId])

   function media(id, tipo) {

      const resultaux = notas.filter(item => item.referenciaidpessoa === id);
      const result = resultaux.filter(item => item.referenciaidtipoavaliacao === tipo);
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

   function arrayNota(id, tipo) {

      const resultaux = notas.filter(item => item.referenciaidpessoa === id);
      const result = resultaux.filter(item => item.referenciaidtipoavaliacao === tipo);
      let space = " - ";
      var arrayNotas = [];
      for (let i in result) {
         console.log(result[i].nota)

         if (result[i].nota) {
            result[i].nota = parseInt(result[i].nota, 10);

            arrayNotas.push(result[i].nota);
            arrayNotas.push(space);
         }
      }
      arrayNotas.pop();
      return arrayNotas;
   }

   function arrayTexto(id, tipo) {

      const resultaux = notas.filter(item => item.referenciaidpessoa === id);
      const result = resultaux.filter(item => item.referenciaidtipoavaliacao === tipo);
      var arrayNotas = [];
      for (let i in result) {
         console.log(result[i].nota)

         if (result[i].nota) {
            arrayNotas.push(result[i].nota);
         }
      }
      return arrayNotas;
   }

   function imprimeNotas(title, id) {
      var aux = arrayNota(user.idpessoa, id)

      if (aux.length > 1) {
         return (
            <form>
               <p className="tituloTipoAvaliacao">{title}</p>

               <p>Media:</p>
               <p>
                  {media(user.idpessoa, id)}
               </p>
               <p>Notas:</p>
               <p>
                  {arrayNota(user.idpessoa, id)}
               </p>

            </form>
         )
      }

      if (aux.length === 1) {
         return (
            <form>
               <p className="tituloTipoAvaliacao">{title}</p>
               <p>Nota:</p>
               <p>
                  {arrayNota(user.idpessoa, id)}
               </p>

            </form>
         )
      }
   }

   function imprimeFeedback(title, id) {
      const divStyle = { marginBottom: "10px" }
      const array = arrayTexto(user.idpessoa, id);

      return (
         <form>
            <p className="tituloTipoAvaliacao">{title}</p>
            <p className="feedbackText">
               {array.map((texto) =>
                  <div style={divStyle}>
                     <p>{texto}</p>
                  </div>

               )}
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

      children.push((
         <div className="blocoPessoa" style={blockStyle}>
            <Grid style={gridStyle}>
               <Paper elevation={10} style={paperStyle}>
                  <p className="tituloNomePessoa">{user.nomecompleto}</p>
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
                  {imprimeNotas("Imparcialidade", 74)}
                  {imprimeNotas("Facilitador", 84)}
                  {imprimeNotas("Dar Autonomia", 94)}
                  {imprimeNotas("Acessibilidade", 104)}
                  {imprimeNotas("Uso da Suati", 144)}
               </Paper>

               <Paper elevation={10} style={paperStyle}>
                  <p className="tituloNomePessoa"> Feedbacks </p>
                  {imprimeFeedback("No que você acha que seu colega mandou bem nesse último mês?", 114)}
                  {imprimeFeedback("Qual ponto você acha que seu colega pode melhorar / desenvolver?", 124)}
                  {imprimeFeedback("Em 10 anos, você acha que o Tesla ainda será marcante em sua vida? Se sim, profissionalmente, emocionalmente ou os dois?", 134)}
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

export default Membro;
