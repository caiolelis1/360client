import { Redirect } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { DadosUnstated } from './dadosunstated.js';
import {useUnstated } from '@gitbook/unstated';
import { isAuthenticated, getTokenUser } from '../../services/auth';
import { Grid, styled, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Paper, Button, Container } from "@material-ui/core"
import { format } from "date-fns";
import './styles.css';

function Avaliacao(){

    const [buttonClicked, setButtonClicked] = useState(false);
    const [subsistemas, setSubsistemas] = useState([]);
    const [pessoas, setPessoas] = useState([]);
    const [userId, setUserId] = useState();
    const [data] = useState(new Date());

    const containerStyle={padding: 20, margin:"20px auto", maxWidth:1200};
    const btstilo={margin:'10px 10px', width:200};
    const btstilo2={margin:'10px 10px', width:230};
    const dados = useUnstated(DadosUnstated);
    const Bootbot = styled(Button)({
        backgroundColor: '#4ed840',
        borderColor: '#4ed840',
    })
    const Bootbot2 = styled(Button)({
        backgroundColor: '#999999',
        borderColor: '#999999',
    })
    

    const buscarUser = (id) => {
        Axios.post('https://avaliacao-360.herokuapp.com/api/buscarUser', {
            userid: id,
        }).then((response) => {
            if(response.data[0].avaliou==1){
                alert("Você já avaliou, obrigado!");
                window.location.replace("https://youthful-euclid-69864e.netlify.app/login")
            }
            if(response.data[0].admin==1){
                console.log("Este usuário é admin!")
            }
        })
    }

    //função para enviar avaliação para o banco de dados, linha 52
    const fazRequisicaoAvaliacao = (anorecebido,edicaorecebido,referenciaidpessoarecebido,referenciaidtipoavaliacaorecebido,notarecebido) => {

        Axios.post("https://avaliacao-360.herokuapp.com/api/insertAvaliacao", {

            ano: anorecebido,
            edicao: edicaorecebido,
            referenciaidpessoa: referenciaidpessoarecebido,
            referenciaidtipoavaliacao: referenciaidtipoavaliacaorecebido,
            nota: notarecebido,

        }).then((response)=>{
            
            alert("Obrigado pela sua contribuição, suas respostas foram enviadas");
            window.location.replace("https://youthful-euclid-69864e.netlify.app/login")
            //console.log(response);
        })

    }


    //função para enviar todas avaliações para a função de requisição, linha 179
    function enviaAvaliacoes(){
        if(!buttonClicked){

            setButtonClicked(true)

            for(var i=0; i<dados.state.avaliacoes.length; i++){
    
                fazRequisicaoAvaliacao(dados.state.avaliacoes[i].ano,dados.state.avaliacoes[i].edicao,dados.state.avaliacoes[i].referenciaidpessoa,dados.state.avaliacoes[i].referenciaidtipoavaliacao,dados.state.avaliacoes[i].nota); //(linha 32)
    
            }
        }

    }

    const [blocos, setBlocos] = useState([]);

    //função que atualiza o state (objeto) avaliação 
    function atualizaStateAvaliacao(recebidoidpessoa,recebidoidtipoavaliacao,recebidonota){
        let posicao = {
            referenciaidpessoa: recebidoidpessoa,
            ano: format(data,'Y'),
            edicao: 1,
            referenciaidtipoavaliacao: recebidoidtipoavaliacao,
            nota: recebidonota,
        };

        dados.pushAvaliacao(posicao);
    }

    //imprime o fomulário da avaliação de todas pessoas de todos subsistemas
    function imprimeBlocos() {

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
                //se for returna o seguinte HTML
              children.push((
                <div className="blocoPessoa">


                <Grid>
                <Paper elevation={10} style={paperStyle}>
                <p className="tituloNomePessoa">
                  {pessoasItem.nomecompleto}
                </p>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Comunicação</FormLabel>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,1,1)} label="Péssimo" />
                                <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,1,2)} label="Ruim" />
                                <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,1,3)} label="Médio" />
                                <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,1,4)} label="Bom" />
                                <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,1,5)} label="Muito Bom" />
                                <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,1,null)} label="Não Sei" />
                            </RadioGroup>
                    </FormControl> 
                    <br></br>             
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Companheirismo</FormLabel>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,2,1)} label="Péssimo" />
                                <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,2,2)} label="Ruim" />
                                <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,2,3)} label="Médio" />
                                <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,2,4)} label="Bom" />
                                <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,2,5)} label="Muito Bom" />
                                <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,2,null)} label="Não Sei" />
                            </RadioGroup>
                    </FormControl> 
                    <br></br>   
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Pontualidade</FormLabel>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,3,1)} label="Péssimo" />
                                <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,3,2)} label="Ruim" />
                                <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,3,3)} label="Médio" />
                                <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,3,4)} label="Bom" />
                                <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,3,5)} label="Muito Bom" />
                                <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,3,null)} label="Não Sei" />
                            </RadioGroup>
                    </FormControl>
                    <br></br>     
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Proatividade</FormLabel>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,4,1)} label="Péssimo" />
                                <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,4,2)} label="Ruim" />
                                <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,4,3)} label="Médio" />
                                <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,4,4)} label="Bom" />
                                <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,4,5)} label="Muito Bom" />
                                <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,4,null)} label="Não Sei" />
                            </RadioGroup>
                    </FormControl>  
                    <br></br>    
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Qualidade do trabalho</FormLabel>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,5,1)} label="Péssimo" />
                                <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,5,2)} label="Ruim" />
                                <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,5,3)} label="Médio" />
                                <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,5,4)} label="Bom" />
                                <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,5,5)} label="Muito Bom" />
                                <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa,5,null)} label="Não Sei" />
                            </RadioGroup>
                    </FormControl> 
                    <p className="tituloTipoAvaliacao">Fale Mais Sobre {pessoasItem.nomecompleto}</p>
                    <textarea onChange={(e) => {atualizaStateAvaliacao(pessoasItem.idpessoa,6,e.target.value)}} placeholder=' Máximo de 255 Caractéres' rows="4" cols="50" maxLength={255} />
                  
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

      //seleciona todas pessoas e guarda no state e chama imprimeBlocos (logo acima)
    async function selecionaPessoas(){
        return Axios.post("https://avaliacao-360.herokuapp.com/api/selecionaPessoas", {
        }).then((response)=>{
            setPessoas(response.data);
            dados.setPessoas(pessoas);
            imprimeBlocos();
        });
    }

    //seleciona todos subsistemas e guarda no state e chama selecionaPessoas (logo acima)
    async function selecionaSubsistemas(){
        return Axios.post("https://avaliacao-360.herokuapp.com/api/selecionaSubsistemas", {
        }).then((response)=>{
            setSubsistemas(response.data);
            dados.setSubsistemas(subsistemas);
            selecionaPessoas(); //chama pessoas
        });
    }


    useEffect(()=>{
        setUserId(getTokenUser().id);
    }, [])

    useEffect(()=>{
        buscarUser(userId);
    }, [userId])

    return <>{isAuthenticated() ?
        <div>
        <Grid>
        <div className="pageAvaliacao">
        <img src="https://static.wixstatic.com/media/d979eb_5158f599534e4f0480b44a267fc68e83~mv2_d_3508_2480_s_4_2.png/v1/fill/w_367,h_259,al_c,q_85,usm_0.66_1.00_0.01/d979eb_5158f599534e4f0480b44a267fc68e83~mv2_d_3508_2480_s_4_2.webp"
                    width="100" height="70" />

                <h3>Avaliação 360 | Versão Web 0.1</h3>
        <Container elevation={5} style={containerStyle}>
            
                <Bootbot type="submit" variant='contained' onClick={() => selecionaSubsistemas()} fullWidth style={btstilo2}> Começar a avaliação</Bootbot>

                <div>
                    {blocos}
                </div>

                <Bootbot2 type="submit"  variant='contained' onClick={() => enviaAvaliacoes()} fullWidth style={btstilo}> Enviar a avaliação</Bootbot2>
                


            
            </Container>
            </div>
            </Grid>
        </div>
        : <Redirect to="/login" />
    }</>

    
}

export default Avaliacao;
