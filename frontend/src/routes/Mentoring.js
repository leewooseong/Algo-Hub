import React from "react";
import MentoMenti from "../components/mentoring/mentomenti/MentoMenti";
import MentiView from "../components/mentoring/mentiview/MentiView";
import Header from "../components/layout/Header";
import { Route, Switch } from "react-router-dom";
import Footer from "../components/layout/Footer";
import MentorWriting from "../components/mentoring/mentomenti/MentorWriting";
import MentoReview from "../components/mentoring/mentiview/MentoReview";
import MentoNotice from "../components/mentoring/mentiview/MentoNotice";
import MentoCurriculum from "../components/mentoring/mentiview/MentoCurriculum";
import MentoCuration from "../components/mentoring/mentiview/MentoCuration";
import ReviewWriting from "../components/mentoring/mentiview/ReviewWriting";
import MentorModifyWriting from "../components/mentoring/mentiview/MentorModifyWriting";
import ReviewModifyWriting from "../components/mentoring/mentiview/ReviewModifyWriting";

class Mentoring extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/mentoring" component={MentoMenti} />

          <Route
            path="/mentoring/mentiview/:name/detail/review"
            component={MentoReview}
          />
          <Route
            path="/mentoring/mentiview/:name/detail/notice"
            component={MentoNotice}
          />
          <Route
            path="/mentoring/mentiview/:name/detail/curriculum"
            component={MentoCurriculum}
          />
          <Route
            path="/mentoring/mentiview/:name/detail/curation"
            component={MentoCuration}
          />
          <Route
            path="/mentoring/mentiview/modify/:id/board"
            component={MentorModifyWriting}
          />
          <Route
            path="/mentoring/mentiview/modify/:id/review"
            component={ReviewModifyWriting}
          />
          <Route
            path="/mentoring/mentiview/writing/mentor/board"
            component={MentorWriting}
          />
          <Route
            path="/mentoring/mentiview/writing/:name/review"
            component={ReviewWriting}
          />
          <Route path="/mentoring/mentiview/:name" component={MentiView} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Mentoring;
