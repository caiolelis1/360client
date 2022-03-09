import Axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { DadosUnstated } from '../avaliacao/dadosunstated.js';
import { useUnstated } from '@gitbook/unstated';
import { Grid, styled, Paper, Button, Container, Typography, Link } from "@material-ui/core"
import { isAuthenticated, getTokenUser } from '../../services/auth';

function Administrador(){

    const [userId, setUserId] = useState();
    const [subsistemas, setSubsistemas] = useState([]);
    const [pessoas, setPessoas] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);

    const [blocos, setBlocos] = useState([]);

    const dados = useUnstated(DadosUnstated);
    const btstilo2={margin:'10px 10px', width:230};
    const Bootbot = styled(Button)({
        backgroundColor: '#4ed840',
        borderColor: '#4ed840',
    });
    const containerStyle={padding: 20, margin:"20px auto", maxWidth:1200};

    const buscarUser = (id) => {
        Axios.post('https://avaliacao-360.herokuapp.com/api/buscarUser', {
            userid: id,
        }).then((response) => {
            if(response.data[0].admin!=1){
                window.location.replace("https://youthful-euclid-69864e.netlify.app/login")
            }
        })
    }

    //faz a media de um tipo das avaliações de uma pessoa
    function media(id,tipo){

        const resultaux = dados.state.avaliacoes.filter(item => item.referenciaidpessoa === id);
        const result = resultaux.filter(item => item.referenciaidtipoavaliacao === tipo);

        let media = 0;
        for(let i in result) {

            if(result[i].nota){
                
                result[i].nota = parseInt(result[i].nota, 10);

                media += result[i].nota;
            }

        }

        media = media/result.length;

        return media;

    }

    //seleciona todos subsistemas, coloca no state e chama função selecionaPessoas(logo abaixo)
    async function selecionaSubsistemas(){
        return Axios.post("https://avaliacao-360.herokuapp.com/api/selecionaSubsistemas", {
        }).then((response)=>{
            setSubsistemas(response.data);
            dados.setSubsistemas(subsistemas);
            selecionaPessoas();
        });
    }

    //seleciona todas pessoas, coloca no state e chama função selecionaAvaliacoes(logo abaixo)
    async function selecionaPessoas(){
        return Axios.post("https://avaliacao-360.herokuapp.com/api/selecionaPessoas", {
        }).then((response)=>{
            setPessoas(response.data);
            dados.setPessoas(pessoas);
            selecionaAvaliacoes();
        });
    }

    //seleciona todas avaliações,e coloca no state e chama função imprimeBlocos(logo abaixo)
    async function selecionaAvaliacoes(){
        return Axios.post("https://avaliacao-360.herokuapp.com/api/selecionaAvaliacoes", {
        }).then((response)=>{
            setAvaliacoes(response.data);
            dados.setAvaliacoes(avaliacoes);
            imprimeBlocos();
        });
    }

    //criar state como array vazio.
    //ter cinco states auxiliares, os quais armazenam as avaliacoes ATUAIS.
    //dar push, um por um, do seguinte:
    //taina{
        //comprometimento=1;
        //comunicacao=2;
        //companheirismo=3;
    //}

    //imprime o resultado das avaliações recebidas de todas pessoas
    function imprimeBlocos() {
        console.log("imprimindo blocos")
        const paperStyle={padding: 20, height:'70vh', width:600, margin:"20px auto"}
        const aux = [];
        const subsistemas = dados.state.subsistemas;
        
        for (let i = 0; i < subsistemas.length; i++) { //loop para passar por todos subsistemas
          let children = [];
          const subsistemasItem = subsistemas[i];
          const pessoas = dados.state.pessoas;
          
          for (let j = 0; j < pessoas.length; j++) { //loop para passar por todos pessoas
            const pessoasItem = pessoas[j];
            
            if (pessoasItem.referenciaidsubsistema === subsistemasItem.idsubsistema) { //confere se pessoa é de um certo subsistema
              children.push((
                <div className="blocoPessoa">
                <Grid>
                <Paper elevation={10} style={paperStyle}>

                <p className="tituloNomePessoa">
                  {pessoasItem.nomecompleto}
                </p>
                  <form>
                    <p className="tituloTipoAvaliacao">Comunicação</p>
                    
                    <p>
                        {media(pessoasItem.idpessoa,1)}
                    </p>

                </form>
                <form>
                    <p className="tituloTipoAvaliacao">Companheirismo</p>
                    
                    <p>
                        {media(pessoasItem.idpessoa,2)}
                    </p>

                </form>
                <form>
                    <p className="tituloTipoAvaliacao">Pontualidade</p>
                    
                    <p>
                        {media(pessoasItem.idpessoa,3)}
                    </p>

                </form>
                <form>
                    <p className="tituloTipoAvaliacao">Proatividade</p>
                    
                    <p>
                        {media(pessoasItem.idpessoa,4)}
                    </p>

                </form>
                <form>
                    <p className="tituloTipoAvaliacao">Qualidade do trabalho</p>
                    
                    <p>
                        {media(pessoasItem.idpessoa,5)}
                    </p>

                </form>
                </Paper>
                </Grid>
                </div>
                
              ));
            }
          }
          
          aux.push((
            <React.Fragment key={subsistemasItem.idsubsistema}>
              <p className="tituloSubsistema">{subsistemasItem.nome}</p>
              {children}
            </React.Fragment>
          ));
        }

        setBlocos(aux);
      }

      useEffect(()=>{
        selecionaSubsistemas()
        setUserId(getTokenUser().id);
      }, [])

    useEffect(()=>{
        buscarUser(userId);
    }, [userId])

    return<>{isAuthenticated() ?
        <div>
        <Grid>
        <div className="pageAvaliacao">
        <p></p>
        <img src="https://static.wixstatic.com/media/d979eb_5158f599534e4f0480b44a267fc68e83~mv2_d_3508_2480_s_4_2.png/v1/fill/w_367,h_259,al_c,q_85,usm_0.66_1.00_0.01/d979eb_5158f599534e4f0480b44a267fc68e83~mv2_d_3508_2480_s_4_2.webp"
                    width="100" height="70" />

                <h3>Avaliação 360 | Versão Web 0.1</h3>
        <Container elevation={5} style={containerStyle}>
            
                <Bootbot type="submit" variant='contained' onClick={() => selecionaSubsistemas()} fullWidth style={btstilo2}> Ver Resultados</Bootbot> 
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
        : <Redirect to="/login" />
    }</>

}

export default Administrador;