import React, { Fragment, useEffect, useState } from "react";
import "./style.css";
import questionsData from "../data/questions.json";

const InGameScreen = ({ data, onDataChange }: any) => {
  const [timeLeft, setTimeLeft] = useState(90);
  const [quesId, setQuesId] = useState(0);
  const [selectedAnswerIndices, setSelectedAnswerIndices] = useState<string[]>([
    "",
  ]);
  const [submit, setSubmit] = useState(false);
  const correctAnswers: { question: string; answer: string }[] = [];
  let point: number = 0;
  let [colorCircle, setColorCircle] = useState("#0063d7");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1); // Decrease time left by 1 second
    }, 1000);

    timeLeft === 5
      ? setColorCircle("#F90b0f")
      : timeLeft === 0
      ? (() => {
          clearInterval(timer);
          // handleClickSubmit();
          // setSubmit((prev) => !prev);
          onDataChange(3, [correctAnswers, selectedAnswerIndices, point]);
        })()
      : "";

    // Clean up interval when component unmounts or time runs out
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time to display as MM:SS
  const formattedTime = `${Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`;

  const handleNextBtn = () => {
    setQuesId((prev) => prev + 1);
  };

  const handlePrevBtn = () => {
    setQuesId((prev) => prev - 1);
  };

  const handleAnswerClick = (quesId: number, answer: string) => {
    // Tạo một bản sao của mảng states hiện tại
    const newSelectedAnswerIndices = [...selectedAnswerIndices];
    // Cập nhật trạng thái của câu trả lời đã chọn cho câu hỏi có ID là quesId
    newSelectedAnswerIndices[quesId] = answer;
    // Cập nhật mảng states mới
    setSelectedAnswerIndices(newSelectedAnswerIndices);
  };

  //Tính điểm
  // useEffect(() => {
  questionsData.forEach((question) => {
    const correctAnswer = question.answers.find((answer) => answer.correct);
    if (correctAnswer) {
      correctAnswers.push({
        question: question.question_content,
        answer: correctAnswer.answer_content,
      });
    }
  });

  const score = (correctAnswers: any[], selectedAnswerIndices: any[]) => {
    selectedAnswerIndices.forEach((selectedAnswer: any) => {
      correctAnswers.forEach((correctAnswer: any) => {
        if (selectedAnswer === correctAnswer.answer) {
          point += 1;
        }
      });
    });
    // console.log("Diem: ", point);
  };
  score(correctAnswers, selectedAnswerIndices);
  // console.log(correctAnswers, selectedAnswerIndices);
  // });

  //xử lý click submit
  const showConfirm = () => {
    const result = window.confirm(
      "Bạn có chắc chắn muốn thực hiện hành động này?"
    );
    if (result) {
      onDataChange(3, [correctAnswers, selectedAnswerIndices, point]);
    }
  };

  const handleClickSubmit = () => {
    setSubmit((prev) => !prev);
    showConfirm();
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
        <button
          className="submit-btn"
          style={{
            display:
              parseInt(questionsData[quesId].id) !== questionsData.length
                ? "none"
                : "",
          }}
          onClick={handleClickSubmit}
        >
          Submit
        </button>
      </div>
      <div className="questions-container">
        <div className="timer">
          {formattedTime}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="70px"
            height="70px"
          >
            <defs>
              <linearGradient id="GradientColor">
                <stop offset="0%" stopColor={colorCircle} />
                <stop offset="100%" stopColor={colorCircle} />
              </linearGradient>
            </defs>
            <circle cx="35" cy="35" r="33" strokeLinecap="round" />
          </svg>
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
              className={
                selectedAnswerIndices[quesId] === answer.answer_content
                  ? "answer-item selected-item"
                  : "answer-item"
              }
              onClick={() => handleAnswerClick(quesId, answer.answer_content)}
            >
              {index + 1}. {answer.answer_content}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default InGameScreen;
