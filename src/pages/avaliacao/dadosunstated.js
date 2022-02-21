import { Container } from '@gitbook/unstated';

export class DadosUnstated extends Container<{
  alunos: Object,
  subsistemas: Object,
  avaliacoes: Object,
  }> {
  state = {
    alunos: null,
    subsistemas: null,
    avaliacoes: [],
  };

  pushAvaliacao(recebido){

    let aux=this.state.avaliacoes;

    if(this.state.avaliacoes.length === 0){

      aux.push(recebido);

    }
    else{

      for(var i=0; i<this.state.avaliacoes.length; i++){

        if((this.state.avaliacoes[i].referenciaidpessoa === recebido.referenciaidpessoa) && (this.state.avaliacoes[i].referenciaidtipoavaliacao === recebido.referenciaidtipoavaliacao)){

          aux[i].nota = recebido.nota;

          break;
        }
        else if(i===this.state.avaliacoes.length-1){ //se tiver chegado no ultimo e nao tiver inserido

          aux.push(recebido);
        }

      }
    
    }

    this.setState({ avaliacoes: aux });
    console.log(this.state.avaliacoes);
  }

  setPessoas(recebido){
    this.setState({ pessoas: recebido });
  }

  setSubsistemas(recebido){
    this.setState({ subsistemas: recebido });
  }

  setAvaliacoes(recebido){
    this.setState({ avaliacoes: recebido });
  }

  setStatusUm(id){
    let aux=this.state.nodesPadrao;
    aux[id-1].status=1;
    this.setState({ nodesPadrao: aux });
  }
 
  setResultados(valor){
    this.setState({ resultados: valor});
  }

}