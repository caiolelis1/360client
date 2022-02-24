import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Grid, styled, Paper, TextField, Button, Select, InputLabel, MenuItem, Typography, Link, Avatar } from "@material-ui/core"
import TeslaLogo from './logo_tesla1.jpg'
const Registro = () => {

    const [subsistemas, setSubsistemas] = useState();
    const [subsistema, setSubsistema] = useState();
    const [usuario, setUsuario] = useState();
    const [nome, setNome] = useState();
    const [senha, setSenha] = useState();


    const registrar = () => {

        Axios.post("https://avaliacao-360.herokuapp.com/api/registrar", {
            usuario: usuario,
            subsistema: subsistema,
            nome: nome,
            senha: senha,
        }).then((response)=>{

            console.log(response);

            if(response.data!==''){
                alert("SUA CONTA FOI CRIADA COM SUCESSO, "+nome+"! JÁ PODE AVALIAR.")
                window.location.href = 'login';
            }
            else{
                alert("POR FAVOR INSIRA OS DADOS CORRETAMENTE")
            }

            /*if(response.data.message){
                setRegistroStatus(response.data.message)
            }else{
                setRegistroStatus("Sua conta foi criada com sucesso, "+ nomeRegistro +"! Já pode avaliar acima.");
            }
            console.log(response);*/
        })

    }

    const buscarSubsistemas = () => {
        console.log("buscando subsistemas!")
        Axios.post('https://avaliacao-360.herokuapp.com/api/selecionaSubsistemas').then((response) => {
            if(response.data.message){
                console.log(response.data.message)
            } else{
                console.log("achou subsistemas!")
                setSubsistemas(response.data)
            }
        })
    }

    useEffect(()=>{
        console.log("use effect acontecendo!")
        buscarSubsistemas();
    },[])

    const paperStyle={padding: 20, height:'70vh', width:280, margin:"20px auto"}
    const btstilo={margin:'10px 0'}
    const Bootbot = styled(Button)({
        backgroundColor: '#4ed840',
        borderColor: '#4ed840',
    })
    return(
        <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                    <Avatar alt='rcc' src={TeslaLogo}/>
                        <h2>Cadastro</h2>
                    </Grid>
                    <InputLabel>Subsistema</InputLabel>
                        <Select label="Subsitema" fullWidth required onChange={(e)=>{setSubsistema(e.target.value)}}>
                            <MenuItem value={null}>Escolha seu subsistema</MenuItem>
                            {subsistemas.map((subsistema) =>(
                                <MenuItem key={subsistema.idsubsistema} value={subsistema.idsubsistema}>{subsistema.nome}</MenuItem>
                            ))}
                        </Select>
                    <TextField label="Nome de Usuário" placeholder="Defina o User" fullWidth required onChange={(e)=>{setUsuario(e.target.value)}}/>
                    <TextField label="Nome Completo" placeholder="Insira seu Nome" fullWidth required onChange={(e)=>{setNome(e.target.value)}}/>
                    <TextField label="Senha" placeholder="Insira a Senha" type='password' fullWidth required onChange={(e)=>{setSenha(e.target.value)}}/>
                    <Bootbot type="submit" variant='contained' onClick={() => registrar()} fullWidth style={btstilo}> Cadastrar</Bootbot>
                    <Typography> Já possui cadastro?
                        <Link href='login'>
                            Voltar ao Login
                        </Link>
                    </Typography>
                </Paper>
        </Grid>
    )
  
};

export default Registro;
