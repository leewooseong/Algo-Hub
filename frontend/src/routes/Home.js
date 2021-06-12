import React from "react";
import Header from "../components/layout/Header";
import useCertificate from "../use/useCertificate";
import "../styles/Home.css";

export default function Home() {
  const user = useCertificate(true);
  return (
    <div className="App">
      <Header user={user} />
    </div>
  );
}
