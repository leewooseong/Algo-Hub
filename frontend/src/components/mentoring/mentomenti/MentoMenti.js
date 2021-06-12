import React, { useState, useEffect } from "react";
import MentorMentiInfo from "./MentoMentiInfo";
import useCertificate from "../../../use/useCertificate";
import axios from "axios";

export default function MentiView() {
  return (
    <main className="main__section">
      <h2 className="section__title">멘토 찾기</h2>
      <MentorMentiInfo />
    </main>
  );
}
