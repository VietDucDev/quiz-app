import React, { Fragment } from "react";
import "./style.css";

const StartGameScreen = ({ data, onDataChange }: any) => {
  const handleButtonClick = () => {
    onDataChange(2);
  };
  return (
    <Fragment>
      <h1 className="start-conten">Welcome to React Quiz Game!</h1>
      <button className="start-btn" onClick={handleButtonClick}>
        Start
      </button>
    </Fragment>
  );
};

export default StartGameScreen;
