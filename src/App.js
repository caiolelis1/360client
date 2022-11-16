import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Avaliacao from "./pages/avaliacao/avaliacao";

import { Provider} from '@gitbook/unstated';
import Administrador from './pages/administrador/administrador';
import Login from './pages/login/login';
import Registro from './pages/login/registro';
import NotReady from './pages/avaliacao/notReady';
import Membro from './pages/paginas/membro';
import Sistema from './pages/paginas/sistema';
import Subsistema from './pages/paginas/subsistema';

function App(){

  return (
    <Provider>
    <Router>
      <Switch>
        <Route exact path="/" component= {Login}/>
        <Route exact path="/administrador" component= {Administrador}/>
        <Route exact path="/login" component= {Login}/>
        <Route exact path="/avaliacao" component= {NotReady}/>
        <Route exact path="/registro" component= {Registro}/>
        <Route exact path="/membro/:id" component= {Membro}/>
        <Route exact path="/sistema" component={Sistema}/>
        <Route exact path="/subsistema" component={Subsistema} />
      </Switch>
    </Router>
    </Provider>

  );
}

export default App;
