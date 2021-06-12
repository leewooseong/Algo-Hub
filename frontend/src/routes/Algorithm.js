import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/layout/Header";
// import Appbar from '../components/layout/Appbar'
import AlgorithmMain from "../components/layout/AlgorithmMain";
import ProblemMain from "../components/layout/ProblemMain";
import SolutionMain from "../components/layout/SolutionMain";
import Footer from "../components/layout/Footer";
import ProblemWriting from "../components/algorithm/ProblemWriting";
import SolutionWriting from "../components/algorithm/SolutionWriting";
import useCertificate from "../use/useCertificate";
import "../styles/Algorithm.css";

export default function Algorithm() {
  const user = useCertificate(true);
  return (
    <div className="App">
      <Header user={user} />
      {/* <Appbar /> */}
      <Switch>
        <Route exact path="/category" component={AlgorithmMain} />
        <Route path="/category/algorithm/writing" component={ProblemWriting} />
        <Route
          path="/category/algorithm/solution/writing"
          component={SolutionWriting}
        />
        <Route
          path="/category/algorithm/solution/:no"
          component={SolutionMain}
        />
        <Route path="/category/algorithm/:no" component={ProblemMain} />
      </Switch>
      <Footer />
    </div>
  );
}
