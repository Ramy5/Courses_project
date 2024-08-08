import { t } from "i18next";
import React, { useEffect, useMemo, useState } from "react";
import { Button, MainCheckBox, MainPopup } from "../../../components";
import { Form, Formik } from "formik";
import { useRTL } from "../../../hooks/useRTL";
import { useNavigate, useParams } from "react-router-dom";
import customFetch from "../../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";
import { toast, useToast } from "react-toastify";
import { format } from "date-fns";
import { formatTime } from "../../../utils/helpers";

const postQuestionExam = async (newQuestionExam: any) => {
  const data = customFetch.post("/storeAnswer", newQuestionExam);
  return data;
};

const StudentExam = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [questionsExam, setQuestionsExam] = useState([]);
  const navigate = useNavigate();
  const isRTL = useRTL();
  const { id } = useParams();
  const queryClient = useQueryClient();

  // useEffect(() => {
  //     navigate(`/student/exam/${id}`, { replace: true });
  // }, [navigate, id]);

  const fetchStudentQuestionExam = async () => {
    const response = await customFetch(`/examQuestion/${id}?per_page=10000`);
    return response;
  };

  const { data, isFetching, isRefetching, isLoading } = useQuery({
    queryKey: ["student_quistionExam"],
    queryFn: fetchStudentQuestionExam,
  });

  const studentQuestionExam = data?.data?.data?.examQuestion;
  console.log("🚀 ~ StudentExam ~ studentQuestionExam:", studentQuestionExam);
  const examCourseName = studentQuestionExam?.[0]?.exam?.course.course_name;
  const examDuration = studentQuestionExam?.[0]?.exam?.duration;
  const examStartTime = studentQuestionExam?.[0]?.exam?.start_time;

  // const rondomExamQuestoin = (array) => {
  //   let rondomQuestion = array?.slice(); // Copy the array to avoid modifying the original one
  //   for (let i = rondomQuestion?.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [rondomQuestion[i], rondomQuestion[j]] = [
  //       rondomQuestion[j],
  //       rondomQuestion[i],
  //     ];
  //   }
  //   return rondomQuestion;
  // };

  const examDetails = {
    exam_name: examCourseName,
    exam_duration: examDuration,
    exam_questions: studentQuestionExam,
    start_time: examStartTime,
  };
  console.log("🚀 ~ StudentExam ~ examDetails:", examDetails);

  useEffect(() => {
    if (examDetails?.exam_duration) {
      setTimeRemaining(examDetails?.exam_duration * 60);
    }
  }, [examDetails?.exam_duration]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: prevAnswers[questionId] === answer ? null : answer,
    }));
  };

  // useEffect(() => {
  //   let timerInterval;
  //   const startTimer = () => {
  //     const timerInterval = setInterval(() => {
  //       setTimeRemaining((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(timerInterval);
  //           return 0;
  //         } else {
  //           return prev - 1;
  //         }
  //       });
  //     }, 1000);
  //   };
  //   const timerTimeout = setTimeout(startTimer, 1000);z
  //   return () => {
  //     clearTimeout(timerTimeout);
  //     clearInterval(timerInterval);
  //   };
  // }, [timeRemaining]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log("🚀 ~ handleKeyDown ~ e:", e.key) 
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        alert('Screenshots are disabled on this page.');
      }

      if (e.keyCode === 123 || 
          (e.ctrlKey && e.shiftKey && (e.keyCode === 'I'.charCodeAt(0) || e.keyCode === 'J'.charCodeAt(0))) || 
          (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))) {
        e.preventDefault();
        return false;
      }
    }; 

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      mutate({
        exam_id: id,
        questions: questionsExam,
      });
      toast.success(t("the test was successfully passed."));
      navigate("/student/exams/result", { state: id, replace: true });
    }
  }, [timeRemaining === 0]);

  const currentQuestion = examDetails?.exam_questions?.[questionNumber];
  console.log("🚀 ~ StudentExam ~ currentQuestion:", currentQuestion)
  const numberOfAnswer = Object.keys(answers).length;

  const unansweredQuestions =
    examDetails?.exam_questions?.length - numberOfAnswer;

  const handleNextQuestion = () => {
    setQuestionNumber((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setQuestionNumber((prevIndex) => prevIndex - 1);
  };

  const handleQuestionsExam = () => {
    setQuestionsExam((prev) => {
      const existingQuestionIndex = prev.findIndex(
        (q) => q.question_id === currentQuestion?.id
      );

      const updatedQuestions =
        existingQuestionIndex >= 0
          ? prev.map((q, index) =>
              index === existingQuestionIndex
                ? {
                    question_id: currentQuestion?.id,
                    answer_id: answers?.[currentQuestion?.id]?.id || null,
                  }
                : q
            )
          : [
              ...prev,
              {
                question_id: currentQuestion?.id,
                answer_id: answers?.[currentQuestion?.id]?.id || null,
              },
            ];

      return updatedQuestions;
    });
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-question-exam"],
    mutationFn: postQuestionExam,
    onSuccess: (data) => {
      queryClient.invalidateQueries("question");
      toast.success(t("the test was successfully passed."));
      navigate("/student/exams/result", { state: id, replace: true });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0];
      toast.error(errorMessage);
    },
  });

  if (isFetching || isRefetching || isLoading) return <Loading />;

  return (
    <Formik initialValues={{}} onSubmit={(values) => {}}>
      <Form>
        <div className="bg-[#D9D9D9] flex flex-col sm:flex-row gap-5 px-5 py-12 min-h-screen">
          <div className="w-full lg:w-[25%] md:w-[33%] sm:w-[40%] bg-white main_shadow pt-4 pb-8 rounded-xl h-fit px-5">
            <h2 className="bg-mainColor text-white font-semibold text-xl text-center rounded-xl py-5">
              {t("lectures")} <span>{examDetails.exam_name}</span>
            </h2>

            <h1 className="text-[#369252] font-bold text-6xl opacity-100 my-6">
              {/* {timeRemaining} */}
              {formatTime(timeRemaining)}
              {/* {convertMinutesToHHMMSS(timeRemaining)} */}
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
              {examDetails?.exam_questions?.map((question, index) => {
                const isAnswered = questionsExam?.find(
                  (item) => item.question_id == question?.id && item.answer_id
                );

                const notAnswered = questionsExam?.find(
                  (item) =>
                    item.question_id == question?.id && item.answer_id == null
                );

                return (
                  <div
                    key={question.id}
                    className={`w-8 h-8 rounded-full cursor-pointer ${
                      index === questionNumber ? "text-mainColor" : "text-white"
                    } text-center py-1 font-medium ${
                      isAnswered
                        ? "bg-[#369252]"
                        : notAnswered
                        ? "bg-mainRed"
                        : "bg-[#DDDDDD]"
                    }`}
                    onClick={() => setQuestionNumber(index)}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full lg:w-[75%] md:w-[67%] sm:w-[60%]">
            <div className="bg-[#F9F9F9] rounded-xl py-5 px-8 main_shadow mb-10">
              <p
                className={`px-2 py-3 rounded-xl w-fit md:px-8 font-medium md:semibold m-auto sm:m-0 bg-mainColor text-white`}
              >
                {t("remaining time:")}{" "}
                <span>{Math.floor(timeRemaining / 60)}</span> {t("minute")}
              </p>
            </div>
            <div>
              <div>
                <div className="fade-in">
                  <div className="bg-[#369252] h-3 w-48 rounded-t-3xl"></div>
                  <div
                    className={`${
                      isRTL ? "rounded-tl-xl" : "rounded-tr-xl"
                    } bg-white rounded-b-xl mb-4`}
                  >
                    <div className="flex items-center justify-between border-b border-b-[#2222220d] p-4">
                      <h2 className="font-semibold text-[#131313]">
                        {t("Question")}{" "}
                        <span>{currentQuestion?.questions_number}</span>
                      </h2>
                      <p className="text-mainColor border-2 border-black rounded-lg px-4 py-0.5">
                        <span>{currentQuestion?.questions_degrees}</span>{" "}
                        {t("grades")}
                      </p>
                    </div>
                    <p className="px-4 pt-10 pb-5 text-[#222222bf] font-medium no-copy">
                      {currentQuestion?.question}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-3 mb-5">
                    {currentQuestion?.answers?.map((ans, i) => {
                      return (
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
                          <span className="text-[#222222bf] font-medium no-copy">
                            {ans?.answer}
                          </span>
                        </li>
                      );
                    })}
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
                  <Button
                    bordered
                    action={() => {
                      setShowReceiptModal(false);
                    }}
                  >
                    {t("return to exam")}
                  </Button>
                  <Button
                    className="bg-mainRed"
                    action={() => {
                      mutate({
                        exam_id: id,
                        questions: questionsExam,
                      });
                    }}
                    loading={isPending}
                  >
                    {t("finish")}
                  </Button>
                </div>
              </MainPopup>
            )}

            <div className="flex items-center justify-end gap-4">
              {questionNumber > 0 && (
                <Button action={handlePrevQuestion}>{t("previous")}</Button>
              )}
              {questionNumber < examDetails?.exam_questions?.length - 1 ? (
                <Button
                  action={() => {
                    handleNextQuestion();
                    handleQuestionsExam();
                  }}
                >
                  {t("next")}
                </Button>
              ) : (
                <Button
                  action={() => {
                    setShowReceiptModal(true);
                    handleQuestionsExam();
                  }}
                >
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
