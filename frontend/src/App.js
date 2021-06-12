import "./App.css";
import React from "react";
import Algorithm from "./routes/Algorithm";
import Mentoring from "./routes/Mentoring";
import LoginRegister from "./routes/LoginRegister";
import Room from "./components/mentoring/chatting/Room";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/mentoring/mentiview/:m_name/:room"
            component={Room}
          />
          <Route path="/auth" component={LoginRegister} />
          <Route path="/category" component={Algorithm} />
          <Route path="/mentoring" component={Mentoring} />
          <Redirect path="*" to="/category" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
