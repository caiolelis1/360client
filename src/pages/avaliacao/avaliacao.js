import { Redirect } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { DadosUnstated } from './dadosunstated.js';
import { useUnstated } from '@gitbook/unstated';
import { isAuthenticated, getTokenUser } from '../../services/auth';
import { Grid, styled, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Paper, Button, Container } from "@material-ui/core"
import { format } from "date-fns";
import './styles.css';

function Avaliacao() {

    const [buttonClicked, setButtonClicked] = useState(false);
    const [subsistemas, setSubsistemas] = useState([]);
    const [pessoas, setPessoas] = useState([]);
    const [userId, setUserId] = useState();
    const [data] = useState(new Date());

    const containerStyle = { padding: 20, margin: "20px auto", maxWidth: 1200 };
    const btstilo = { margin: '10px 10px', width: 200 };
    const btstilo2 = { margin: '10px 10px', width: 230 };
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

            if (response.data[0].avaliou === 1) {
                alert("Você já avaliou, obrigado!");
                window.location.replace("https://youthful-euclid-69864e.netlify.app/login")
            }

        })
    }

    //função para enviar avaliação para o banco de dados, linha 52
    const fazRequisicaoAvaliacao = (anorecebido, edicaorecebido, referenciaidpessoarecebido, referenciaidtipoavaliacaorecebido, notarecebido) => {
        Axios.post("https://avaliacao-360.herokuapp.com/api/insertAvaliacao", {
            ano: anorecebido,
            edicao: edicaorecebido,
            referenciaidpessoa: referenciaidpessoarecebido,
            referenciaidtipoavaliacao: referenciaidtipoavaliacaorecebido,
            nota: notarecebido,
            userid: userId,
        }).then((response) => {
            alert("Obrigado pela sua contribuição, suas respostas foram enviadas");
            window.location.replace("http://teslaufmg.online")
        })

    }

    //função para enviar todas avaliações para a função de requisição, linha 179
    function enviaAvaliacoes() {
        if (!buttonClicked) {
            setButtonClicked(true)
            for (var i = 0; i < dados.state.avaliacoes.length; i++) {
                fazRequisicaoAvaliacao(dados.state.avaliacoes[i].ano, dados.state.avaliacoes[i].edicao, dados.state.avaliacoes[i].referenciaidpessoa, dados.state.avaliacoes[i].referenciaidtipoavaliacao, dados.state.avaliacoes[i].nota); //(linha 32)
            }
        }
    }

    const [blocos, setBlocos] = useState([]);

    //função que atualiza o state (objeto) avaliação 
    function atualizaStateAvaliacao(recebidoidpessoa, recebidoidtipoavaliacao, recebidonota) {
        let posicao = {
            referenciaidpessoa: recebidoidpessoa,
            ano: format(data, 'Y'),
            edicao: 1,
            referenciaidtipoavaliacao: recebidoidtipoavaliacao,
            nota: recebidonota,
        };

        dados.pushAvaliacao(posicao);
    }

    //imprime o fomulário da avaliação de todas pessoas de todos subsistemas
    function imprimeBlocos() {

        const paperStyle = { padding: 20, width: 600, margin: "20px 25px" }
        const aux = [];

        let children = [];
        const pessoas = dados.state.pessoas;



        for (let j = 0; j < pessoas.length; j++) { //loop para passar por todos pessoas
            const pessoasItem = pessoas[j];
            //se for returna o seguinte HTML
            if (pessoasItem.capitao === 1 || pessoasItem.diretorGeral === 1 || pessoasItem.diretor === 1) {
                children.push((
                    <div className="blocoPessoa">
                        <Grid>
                            <Paper elevation={10} style={paperStyle}>
                                <p className="tituloNomePessoa">
                                    {pessoasItem.nomecompleto}
                                </p>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Pontualidade</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 3, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 3, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 3, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 3, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 3, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 3, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 3, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Comunicação / Clareza</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 1, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 1, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 1, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 1, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 1, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 1, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 1, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Proatividade / Criatividade</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 4, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 4, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 4, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 4, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 4, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 4, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 4, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Relacionamento / Interação</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 2, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 2, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 2, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 2, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 2, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 2, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 2, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Habilidade de Trabalho em Equipe</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 6, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 6, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 6, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 6, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 6, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 6, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 6, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Engajamento / Motivação</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 5, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 5, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 5, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 5, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 5, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 5, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 5, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Delegar Tarefas / Imparcialidade</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 74, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 74, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 74, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 74, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 74, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 74, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 74, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Facilitador</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 84, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 84, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 84, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 84, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 84, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 84, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 84, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Dar Autonomia aos Membros</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 94, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 94, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 94, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 94, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 94, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 94, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 94, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Acessibilidade</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 104, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 104, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 104, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 104, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 104, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 104, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 104, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <p className="tituloTipoAvaliacao">no que você acha que seu colega mandou bem nesse último mês?</p>
                                <textarea onChange={(e) => { atualizaStateAvaliacao(pessoasItem.idpessoa, 11, e.target.value) }} placeholder=' Máximo de 255 Caractéres' rows="4" cols="50" maxLength={255} />

                                <br></br>
                                <p className="tituloTipoAvaliacao">qual ponto você acha que seu colega pode melhorar / desenvolver?</p>
                                <textarea onChange={(e) => { atualizaStateAvaliacao(pessoasItem.idpessoa, 12, e.target.value) }} placeholder=' Máximo de 255 Caractéres' rows="4" cols="50" maxLength={255} />

                                <br></br>
                                <p className="tituloTipoAvaliacao">Em 10 anos, você acha que o Tesla ainda será marcante em sua vida? Se sim, profissionalmente, emocionalmente ou os dois?</p>
                                <textarea onChange={(e) => { atualizaStateAvaliacao(pessoasItem.idpessoa, 13, e.target.value) }} placeholder=' Máximo de 255 Caractéres' rows="4" cols="50" maxLength={255} />

                            </Paper>
                        </Grid>
                    </div>
                ));
            }
            else {
                children.push((
                    <div className="blocoPessoa">

                        <Grid>
                            <Paper elevation={10} style={paperStyle}>
                                <p className="tituloNomePessoa">
                                    {pessoasItem.nomecompleto}
                                </p>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Pontualidade</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 3, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 3, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 3, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 3, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 3, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 3, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 3, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Comunicação / Clareza</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 1, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 1, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 1, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 1, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 1, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 1, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 1, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Proatividade / Criatividade</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 4, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 4, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 4, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 4, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 4, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 4, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 4, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Relacionamento / Interação</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 2, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 2, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 2, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 2, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 2, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 2, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 2, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Habilidade de Trabalho em Equipe</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 6, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 6, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 6, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 6, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 6, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 6, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 6, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Engajamento / Motivação</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 5, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 5, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 5, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 5, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 5, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 5, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 5, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Presença em Reuniões</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 24, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 24, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 24, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 24, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 24, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 24, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 24, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Participação em Reuniões</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 34, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 34, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 34, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 34, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 34, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 34, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 34, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Cumprimento de Tarefas</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 44, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 44, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 44, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 44, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 44, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 44, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 44, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Comprometimento</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 54, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 54, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 54, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 54, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 54, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 54, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 54, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>
                                <br></br>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Organização</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="Não Sei" name="radio-buttons-group">
                                        <FormControlLabel value="op1" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 64, 1)} label="1" />
                                        <FormControlLabel value="op2" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 64, 2)} label="2" />
                                        <FormControlLabel value="op3" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 64, 3)} label="3" />
                                        <FormControlLabel value="op4" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 64, 4)} label="4" />
                                        <FormControlLabel value="op5" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 64, 5)} label="5" />
                                        <FormControlLabel value="op6" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 64, 6)} label="6" />
                                        <FormControlLabel value="op7" control={<Radio />} onClick={() => atualizaStateAvaliacao(pessoasItem.idpessoa, 64, 7)} label="7" />
                                    </RadioGroup>
                                </FormControl>

                            </Paper>
                        </Grid>

                    </div>
                ));
            }

        }

        aux.push((
            <React.Fragment>
                {children}
            </React.Fragment>
        ));

        setBlocos(aux);
    }

    //seleciona todas pessoas e guarda no state e chama imprimeBlocos (logo acima)
    async function selecionaPessoas() {
        return Axios.post("https://avaliacao-360.herokuapp.com/api/selecionaPessoas", {
        }).then((response) => {
            setPessoas(response.data);
            dados.setPessoas(pessoas);
            imprimeBlocos();
        });
    }

    //seleciona todos subsistemas e guarda no state e chama selecionaPessoas (logo acima)
    async function selecionaSubsistemas() {
        return Axios.post("https://avaliacao-360.herokuapp.com/api/selecionaSubsistemas", {
        }).then((response) => {
            setSubsistemas(response.data);
            dados.setSubsistemas(subsistemas);
            selecionaPessoas(); //chama pessoas
        });
    }

    useEffect(() => {
        setUserId(getTokenUser().id);
    }, [])

    useEffect(() => {
        buscarUser(userId);
    }, [userId])

    return <>{isAuthenticated() ?
        <div>
            <Grid>
                <div className="pageAvaliacao">
                    <p></p>
                    <img src="https://static.wixstatic.com/media/d979eb_5158f599534e4f0480b44a267fc68e83~mv2_d_3508_2480_s_4_2.png/v1/fill/w_367,h_259,al_c,q_85,usm_0.66_1.00_0.01/d979eb_5158f599534e4f0480b44a267fc68e83~mv2_d_3508_2480_s_4_2.webp"
                        width="100" height="70" alt="Logo Tesla" />
                    <h3>Avaliação 360 | Versão Web 0.1</h3>
                    <Container elevation={5} style={containerStyle}>
                        <Bootbot type="submit" variant='contained' onClick={() => selecionaSubsistemas()} fullWidth style={btstilo2}> Começar a avaliação</Bootbot>
                        <div>{blocos}</div>
                        <Bootbot2 type="submit" variant='contained' onClick={() => enviaAvaliacoes()} fullWidth style={btstilo}> Enviar a avaliação</Bootbot2>
                    </Container>
                </div>
            </Grid>
        </div>
        : <Redirect to="/login" />
    }</>

}

export default Avaliacao;
