import Axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { DadosUnstated } from '../avaliacao/dadosunstated.js';
import {useUnstated } from '@gitbook/unstated';
import { isAuthenticated } from '../../services/auth';

function Administrador(){

    const [subsistemas, setSubsistemas] = useState([]);
    const [pessoas, setPessoas] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);

    const [blocos, setBlocos] = useState([]);

    const dados = useUnstated(DadosUnstated);

    //faz a media de um tipo das avaliações de uma pessoa
    function media(id,tipo){

        const resultaux = dados.state.avaliacoes.filter(item => item.referenciaidpessoa === id);
        const result = resultaux.filter(item => item.referenciaidtipoavaliacao === tipo);

        let media = 0;
        for(let i in result) {

            result[i].nota = parseInt(result[i].nota, 10);

            media += result[i].nota;
        }

        media = media/result.length;

        return media;

    }

    //seleciona todos subsistemas, coloca no state e chama função selecionaPessoas(logo abaixo)
    async function selecionaSubsistemas(){
        return Axios.post("http://localhost:3001/api/selecionaSubsistemas", {
        }).then((response)=>{
            console.log(response.data)
            setSubsistemas(response.data);
            dados.setSubsistemas(subsistemas);
            selecionaPessoas();
        });
    }

    //seleciona todas pessoas, coloca no state e chama função selecionaAvaliacoes(logo abaixo)
    async function selecionaPessoas(){
        return Axios.post("http://localhost:3001/api/selecionaPessoas", {
        }).then((response)=>{
            console.log(response.data)
            setPessoas(response.data);
            dados.setPessoas(pessoas);
            selecionaAvaliacoes();
        });
    }

    //seleciona todas avaliações,e coloca no state e chama função imprimeBlocos(logo abaixo)
    async function selecionaAvaliacoes(){
        return Axios.post("http://localhost:3001/api/selecionaAvaliacoes", {
        }).then((response)=>{
            console.log(response.data)
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
      }, [])

    return<>{isAuthenticated() ?
        <div>
            <div className="App">
                <div className = "paineldecontrole">

                <div>   
                    <button onClick={() => selecionaSubsistemas()}>Ver avaliações</button>
                </div>
                
                <div>
                    {blocos}
                </div>
                {subsistemas.map((subsistema) =>(
                        <h1>{subsistema.nome}</h1>
                    ))}
                </div>
            </div>
        </div>
        : <Redirect to="/login" />
    }</>

}

export default Administrador;