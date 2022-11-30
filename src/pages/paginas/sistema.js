import React, { useEffect, useState } from "react";
import { Grid, styled, Paper, Button, Container, Typography, Link } from "@material-ui/core"
import Axios from 'axios';
import { useParams } from "react-router-dom";
import { Chart } from "react-google-charts";

function Sistema() {
   const [sistema, setSistema] = useState({});
   const [users, setUsers] = useState([]);
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

   const buscarSistema = (id) => {
      Axios.post('https://avaliacao-360.herokuapp.com/api/selecionaSistema', {
         id: id,
      }).then((response) => {
         setSistema(response.data[0]);
      })
   }

   const buscarUsers = (id) => {
      Axios.post('https://avaliacao-360.herokuapp.com/api/buscarUsersSistema', {
         sistemaid: id,
      }).then((response) => {
         setUsers(response.data);
         buscarNotas(id)
      })

   }

   const buscarNotas = (id) => {
      Axios.post('https://avaliacao-360.herokuapp.com/api/selecionaAvaliacoesPessoa', {
         id: id,
      }).then((response) => {
         for (let i = 0; i < response.data.length; i++) {

            teste.push(response.data[i])

         }
      })
   }

   useEffect(() => {
      buscarSistema(id);
      buscarUsers(id);
   }, [id])

   useEffect(() => {
      for (let i = 0; i < users.length; i++) {
         buscarNotas(users[i].idpessoa)
      }
   }, [users])

   function media(tipo) {
      const result = teste.filter(item => item.referenciaidtipoavaliacao === tipo);
      let resultLength = 0;
      let media = 0;
      for (let i in result) {
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

   function imprimeGrafico(title, tipo) {
      const result = teste.filter(item => item.referenciaidtipoavaliacao === tipo);
      let nota1 = 0, nota2 = 0, nota3 = 0, nota4 = 0, nota5 = 0, nota6 = 0, nota7 = 0;
      for (let i in result) {

         if (result[i].nota) {
            if (result[i].nota === 1)
               nota1++;
            if (result[i].nota === 2)
               nota2++;
            if (result[i].nota === 3)
               nota3++;
            if (result[i].nota === 4)
               nota4++;
            if (result[i].nota === 5)
               nota5++;
            if (result[i].nota === 6)
               nota6++;
            if (result[i].nota === 7)
               nota7++;
         }
      }

      const data = [
         ["Nota", "Votos"],
         ["1", nota1], ["2", nota2], ["3", nota3],
         ["4", nota4], ["5", nota5], ["6", nota6], ["7", nota7],
      ];

      const options = {
         chart: {
            title: title,
            subtitle: sistema.nome,
            colors: ["red", "orange", "orange", "yellow", "green", "green", "blue"],
         },
      };
      const graficoStyle = { padding: 10, width: 500, margin: "5px auto" }
      return (
         <div style={graficoStyle}>
            <Chart
               chartType="Bar"
               width="500px"
               height="250px"
               data={data}
               options={options}
            />
         </div>
      )

   }

   function imprimeNotas(title, id) {
      return (
         <form>
            <p className="tituloTipoAvaliacao">{title}</p>

            <p>Media:</p>
            <p>
               {media(id)}
            </p>
            <p>
               {imprimeGrafico(title, id)}
            </p>

         </form>
      )
   }

   function imprimeBlocos() {
      const paperStyle = { padding: 20, width: 600, margin: "20px auto" }
      const blockStyle = { color: "white", backgroundColor: "white", margin: "auto" }
      const gridStyle = { padding: 5 }
      const aux = [];
      let children = [];

      children.push((
         //fazer if else da capitania ou nao
         <div className="blocoPessoa" style={blockStyle}>
            <Grid style={gridStyle}>
               <Paper elevation={10} style={paperStyle}>
                  <p className="tituloNomePessoa">{sistema.nome}</p>
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
                  {imprimeNotas("Imparcialidade (Diretor)", 74)}
                  {imprimeNotas("Facilitador (Diretor)", 84)}
                  {imprimeNotas("Dar Autonomia (Diretor)", 94)}
                  {imprimeNotas("Acessibilidade (Diretor)", 104)}
                  {imprimeNotas("Uso da Suati (Diretor)", 144)}
               </Paper>

            </Grid>
         </div>

      ));

      aux.push((
         <React.Fragment key={sistema.id}>
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

export default Sistema;
