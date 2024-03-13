import React, { Fragment, useEffect, useState } from "react";
import "./style.css";

import questionsData from "../data/questions.json";

const ReviewScreen = ({ data, onDataChange }: any) => {
  const [quesId, setQuesId] = useState(0);

  const handleNextBtn = () => {
    setQuesId((prev) => prev + 1);
  };

  const handlePrevBtn = () => {
    setQuesId((prev) => prev - 1);
  };

  const handleAnswer = (quesId: any, answer_content: any) => {
    let className = "";

    data[1][quesId] === answer_content
      ? answer_content === data[0][quesId].answer
        ? (className = " correct-answer answer-item-review")
        : (className = " incorrect-answer answer-item-review")
      : (className = "answer-item-review");

    answer_content === data[0][quesId].answer
      ? (className = " correct-answer answer-item-review")
      : "";

    return className;
  };

  return (
    <Fragment>
      <div className="ingame-btn">
        <button
          className={quesId === 0 ? "prev-btn disabled-button" : "prev-btn"}
          onClick={handlePrevBtn}
        >
          Previous
        </button>
        <button
          className={
            quesId === questionsData.length - 1
              ? "next-btn disabled-button"
              : "next-btn"
          }
          onClick={handleNextBtn}
        >
          Next
        </button>
        <button className="submit-btn" onClick={() => onDataChange(1)}>
          Restart
        </button>
      </div>
      <div className="questions-container">
        <div className="timer" style={{ color: "red" }}>
          End!
        </div>
        <div className="questions-content">
          <h3>
            Question {questionsData[quesId].id}/{questionsData.length}
          </h3>
          <h2>{questionsData[quesId].question_content}</h2>
        </div>
      </div>
      <div className="answers-container">
        {questionsData[quesId].answers.map((answer, index) => {
          return (
            <div
              key={index}
              className={`${handleAnswer(quesId, answer.answer_content)}`}
            >
              {index + 1}. {answer.answer_content}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default ReviewScreen;
