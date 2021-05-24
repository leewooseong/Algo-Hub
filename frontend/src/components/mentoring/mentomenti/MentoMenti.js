import React, { Component } from "react";
import MentorMentiInfo from "./MentoMentiInfo";
import MentoRequestButton from '../MentoRequestButton'

export default class MentiView extends Component {
  render() {
    return <main className="main__section">
      <h2 className="section__title">멘토 찾기</h2>
      <MentorMentiInfo />
      <MentoRequestButton />
    </main>;
  }
}
