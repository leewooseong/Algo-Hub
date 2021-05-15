import './App.css';
import React from "react"
import Home from './routes/Home'
import Algorithm from './routes/Algorithm'
import Mentoring from './routes/Mentoring'
import LoginRegister from "./routes/LoginRegister";
import Rank from './routes/Rank'
import Board from './routes/Board'
import { BrowserRouter, Route, Switch } from "react-router-dom"

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={LoginRegister} />
          <Route path="/category" component={Algorithm} />
          <Route path="/mentoring" component={Mentoring} />
          <Route path="/rank" component={Rank} />
          <Route path="/board" component={Board} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
