import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Avaliacao from "./pages/avaliacao/avaliacao";
import { Provider} from '@gitbook/unstated';
import Administrador from './pages/administrador/administrador';
import Login from './pages/login/login';
import Registro from './pages/login/registro';

function App(){

  return (
    <Provider>
    <Router>
      <Switch>
        <Route exact path="/" component= {Login}/>
        <Route exact path="/administrador" component= {Administrador}/>
        <Route exact path="/avaliacao" component= {Avaliacao}/>
        <Route exact path="/login" component= {Login}/>
        <Route exact path="/registro" component= {Registro}/>
      </Switch>
    </Router>
    </Provider>

  );
}

export default App;