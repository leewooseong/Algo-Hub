import React from "react";
import MentoMenti from "../components/mentoring/mentomenti/MentoMenti";
import MentiView from "../components/mentoring/mentiview/MentiView";
import Header from "../components/layout/Header";
import { Route, Switch } from "react-router-dom";
import Footer from "../components/layout/Footer";
import MentorWriting from "../components/mentoring/mentomenti/MentorWriting";

class Mentoring extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/mentoring" component={MentoMenti} />
          <Route path="/mentoring/mentiview/writing" component={MentorWriting} />
          <Route path="/mentoring/mentiview" component={MentiView} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Mentoring;
