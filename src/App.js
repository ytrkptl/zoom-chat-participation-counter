import React from "react";
import Header from "./components/Header/Header";
import ParticipationCounter from "./components/ParticipationCounter/ParticipationCounter";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <ParticipationCounter />
      <Footer />
    </div>
  );
};

export default App;
