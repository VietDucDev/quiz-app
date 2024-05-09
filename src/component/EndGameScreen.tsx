import { Fragment } from "react";
import "./style.css";

const EndGameScreen = ({ data, onDataChange }: any) => {
  const handleTryAgain = () => {
    onDataChange(2);
  };
  const handleReview = () => {
    onDataChange(4, data);
  };
  return (
    <Fragment>
      <h1 className="end-game-content">Your score is: {data[2]}</h1>
      <div className="end-btn-container">
        <button className="tryAgain-btn" onClick={handleTryAgain}>
          Try again
        </button>
        <button className="review-btn" onClick={handleReview}>
          Review
        </button>
      </div>
    </Fragment>
  );
};

export default EndGameScreen;
