import { t } from "i18next";
import React, { useEffect, useMemo, useState } from "react";
import { Button, MainCheckBox, MainPopup } from "../../../components";
import { Form, Formik } from "formik";
import { useRTL } from "../../../hooks/useRTL";
import { useNavigate } from "react-router-dom";

const StudentExam = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const navigate = useNavigate();
  const isRTL = useRTL();

  const examDetails = {
    exam_name: "الفيزياء",
    exam_duration: "60:00",
    exam_questions: [
      {
        id: 1,
        questions_number: "الاول",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answer: ["٢٥ كولوم", "٢٥ كيلو كولوم", "٤٠ كولوم", "٧٠ كولوم"],
      },
      {
        id: 2,
        questions_number: "الثاني",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answer: ["٢٥ كولوم", "٢٥ كيلو كولوم", "٤٠ كولوم", "٧٠ كولوم"],
      },
      {
        id: 3,
        questions_number: "الثالث",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answer: ["٢٥ كولوم", "٢٥ كيلو كولوم", "٤٠ كولوم", "٧٠ كولوم"],
      },
      {
        id: 4,
        questions_number: "الرابع",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answer: ["٢٥ كولوم", "٢٥ كيلو كولوم", "٤٠ كولوم", "٧٠ كولوم"],
      },
      {
        id: 5,
        questions_number: "الخامس",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answer: ["٢٥ كولوم", "٢٥ كيلو كولوم", "٤٠ كولوم", "٧٠ كولوم"],
      },
      {
        id: 6,
        questions_number: "السادس",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answer: ["٢٥ كولوم", "٢٥ كيلو كولوم", "٤٠ كولوم", "٧٠ كولوم"],
      },
      {
        id: 7,
        questions_number: "السابع",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answer: ["٢٥ كولوم", "٢٥ كيلو كولوم", "٤٠ كولوم", "٧٠ كولوم"],
      },
      {
        id: 8,
        questions_number: "الثامن",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answer: ["٢٥ كولوم", "٢٥ كيلو كولوم", "٤٠ كولوم", "٧٠ كولوم"],
      },
      {
        id: 9,
        questions_number: "التاسع",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answer: ["٢٥ كولوم", "٢٥ كيلو كولوم", "٤٠ كولوم", "٧٠ كولوم"],
      },
      {
        id: 10,
        questions_number: "العاشر",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answer: ["٢٥ كولوم", "٢٥ كيلو كولوم", "٤٠ كولوم", "٧٠ كولوم"],
      },
    ],
  };

  const handleNextQuestion = () => {
    setQuestionNumber((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setQuestionNumber((prevIndex) => prevIndex - 1);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: prevAnswers[questionId] === answer ? null : answer,
    }));
  };

  const getStatusClass = (questionId, index) => {
    if (index < questionNumber && answers[questionId]) {
      return "bg-[#369252]";
    } else if (index < questionNumber && !answers[questionId]) {
      return "bg-mainRed";
    } else {
      return "bg-[#DDDDDD]";
    }
  };

  const convertDurationToSeconds = (duration) => {
    const [minutes, seconds] = duration.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const initialTime = useMemo(
    () => convertDurationToSeconds(examDetails.exam_duration),
    [examDetails.exam_duration]
  );

  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const startTimer = () => {
      const timerInterval = setInterval(() => {
        if (initialTime <= 1) {
          clearInterval(timerInterval);
          setTimeRemaining(0);
        } else {
          setTimeRemaining((prev) => prev - 1);
        }
      }, 1000);
    };

    const timerTimeout = setTimeout(startTimer, 1000);

    return () => clearTimeout(timerTimeout);
  }, [initialTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const currentQuestion = examDetails.exam_questions[questionNumber];

  const numberOfAnswer = Object.keys(answers).length;

  const unansweredQuestions =
    examDetails.exam_questions.length - numberOfAnswer;

  const initialValues = {};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
      }}
    >
      <Form>
        <div className="bg-[#D9D9D9] flex flex-col sm:flex-row gap-5 px-5 py-12 min-h-screen">
          <div className="w-full lg:w-[25%] md:w-[33%] sm:w-[40%] bg-white main_shadow pt-4 pb-8 rounded-xl h-fit px-5">
            <h2 className="bg-mainColor text-white font-semibold text-xl text-center rounded-xl py-5">
              {t("lectures")} <span>{examDetails.exam_name}</span>
            </h2>

            <h1 className="text-[#369252] font-bold text-6xl opacity-100 my-6">
              {formatTime(timeRemaining)}
            </h1>

            <div className="flex gap-2 items-center">
              <div className="w-5 h-5 bg-mainRed rounded-full"></div>
              <p>{t("an unanswered question")}</p>
            </div>
            <div className="flex gap-2 items-center my-2">
              <div className="w-5 h-5 bg-[#369252] rounded-full"></div>
              <p>{t("question answered")}</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-5 h-5 bg-[#DDDDDD] rounded-full"></div>
              <p>{t("question not displayed")}</p>
            </div>

            <div className="grid grid-cols-5 gap-3 my-8 justify-items-center">
              {examDetails.exam_questions.map((question, index) => (
                <div
                  key={question.id}
                  //   className="w-8 h-8 bg-[#DDDDDD] rounded-full text-white text-center py-1 font-medium"
                  className={`w-8 h-8 rounded-full ${
                    index === questionNumber ? "text-mainColor" : "text-white"
                  } text-center py-1 font-medium ${getStatusClass(
                    question.id,
                    index
                  )}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[75%] md:w-[67%] sm:w-[60%]">
            <div className="bg-[#F9F9F9] rounded-xl py-5 px-8 main_shadow mb-10">
              <p
                className={`px-2 py-3 rounded-xl w-fit md:px-8 font-medium md:semibold m-auto sm:m-0 bg-mainColor text-white`}
              >
                {t("remaining time:")} <span>{30}</span> {t("minute")}
              </p>
            </div>
            <div>
              <div>
                <div>
                  <div className="bg-[#369252] h-3 w-48 rounded-t-3xl"></div>
                  <div
                    className={`${
                      isRTL ? "rounded-tl-xl" : "rounded-tr-xl"
                    } bg-white rounded-b-xl mb-4`}
                  >
                    <div className="flex items-center justify-between border-b border-b-[#2222220d] p-4">
                      <h2 className="font-semibold text-[#131313]">
                        {t("Question")}{" "}
                        <span>{currentQuestion.questions_number}</span>
                      </h2>
                      <p className="text-mainColor border-2 border-black rounded-lg px-4 py-0.5">
                        <span>{currentQuestion.questions_degrees}</span>{" "}
                        {t("grades")}
                      </p>
                    </div>
                    <p className="px-4 pt-10 pb-5 text-[#222222bf] font-medium">
                      {currentQuestion.questions}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-3 mb-5">
                    {currentQuestion.answer.map((ans, i) => (
                      <li
                        key={i}
                        className="bg-white px-4 py-3 rounded-xl flex gap-1 items-center cursor-pointer"
                        onClick={() =>
                          handleAnswerChange(currentQuestion.id, ans)
                        }
                      >
                        <MainCheckBox
                          id={`answer-${currentQuestion.id}-${i}`}
                          name={`answer-${currentQuestion.id}`}
                          label=""
                          checked={answers[currentQuestion.id] === ans}
                          readOnly
                        />{" "}
                        <span className="text-[#222222bf] font-medium">
                          {ans}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {showReceiptModal && (
              <MainPopup
                onClose={() => setShowReceiptModal(false)}
                className="bg-white"
              >
                <div className="text-center">
                  <p className="font-semibold text-lg my-6 text-black">
                    {t("there are unanswered questions")}
                  </p>

                  <p className="text-[#131313] font-medium text-lg my-6">
                    {t(
                      "once completed, you will not be able to return to the test"
                    )}
                  </p>

                  {unansweredQuestions !== 0 && (
                    <p className=" text-[#131313] font-medium text-lg my-6">
                      ({t("you are about to submit your test answer")})
                    </p>
                  )}

                  <p className="text-[#369252] font-medium text-lg my-6">
                    {t("questions answered:")} <span>{numberOfAnswer}</span>
                  </p>

                  <p className="text-mainRed font-medium text-lg my-6">
                    {t("unanswered questions:")}{" "}
                    <span>{unansweredQuestions}</span>
                  </p>
                </div>

                <div className="flex items-center justify-center gap-8 mt-12">
                  <Button bordered action={() => setShowReceiptModal(false)}>
                    {t("return to exam")}
                  </Button>
                  <Button
                    className="bg-mainRed"
                    action={() => navigate("/student/exams/result")}
                  >
                    {t("finish")}
                  </Button>
                </div>
              </MainPopup>
            )}

            <div className="flex items-center justify-end gap-4">
              {questionNumber > 0 && (
                <Button action={handlePrevQuestion}>{t("Prev")}</Button>
              )}
              {questionNumber < examDetails.exam_questions.length - 1 ? (
                <Button action={handleNextQuestion}>{t("Next")}</Button>
              ) : (
                <Button action={() => setShowReceiptModal(true)}>
                  {t("finish exam")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default StudentExam;
