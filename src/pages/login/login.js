import React, { useState } from 'react';
import Axios from 'axios';
import { loginToken } from '../../services/auth';
import { Grid, styled, Paper, TextField, Button, Link, Typography, Avatar } from "@material-ui/core" 
import TeslaLogo from './logo_tesla1.jpg'


const Login = () => {

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const [loginStatus, setLoginStatus] = useState();

    const login = () => {

        Axios.post("https://avaliacao-360.herokuapp.com/api/login", {
            usuario: usuario,
            senha: senha,
        }).then((response)=>{
            if(response.data.message){
                setLoginStatus(response.data.message)
            }else{
                //enviaAvaliacoes();
                loginToken(response.data[0]);
                window.location.href = 'avaliacao';
            }
            console.log(response);
        })

    }
    const Bootbot = styled(Button)({
        backgroundColor: '#4ed840',
        borderColor: '#4ed840',
    })
    const paperStyle={padding: 20, height:'70vh', width:280, margin:"20px auto"}
    const btstilo={margin:'10px 0'}
    return(
        <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                    <Avatar alt='rcc' src={TeslaLogo}/>
                        <h2>Login</h2>
                    </Grid>
                    <TextField label="Nome de Usuário" placeholder="Insira o User" fullWidth required onChange={(e)=>{setUsuario(e.target.value)}}/>
                    <TextField label="Senha" placeholder="Insira a Senha" type='password' fullWidth required onChange={(e)=>{setSenha(e.target.value)}}/>
                    {loginStatus}
                    <Bootbot type="submit" variant='contained' onClick={() => login()} fullWidth style={btstilo}> Logar</Bootbot>
                    <Typography> Ainda não tem Cadastro?
                        <Link href='registro'>
                            Cadastre-se
                        </Link>
                    </Typography>
                </Paper>
        </Grid>
    )

  
};

export default Login;
