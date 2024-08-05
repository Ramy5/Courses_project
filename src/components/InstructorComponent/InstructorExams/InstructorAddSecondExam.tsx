import { t } from "i18next";
import { BaseInput, Button, MainRadio } from "../..";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { MdNavigateNext } from "react-icons/md";

const InstructorAddSecondExam = ({
  setSteps,
  setGrades,
  fileExam,
  grades,
  questionExam,
  editExamData,
}: any) => {
  console.log("🚀 ~ grades:", grades);
  const [currentIndex, setCurrentIndex] = useState(0);
  const questionsPerPage = 2;

  const { values, setFieldValue } = useFormikContext();
  console.log("🚀 ~ values:", values)

  const filterBoolenFromExam = fileExam?.filter(
    (item) => item.answer == "true" || item.answer == "false"
  );

  const editExamQuestions = questionExam?.length
    ? questionExam
    : editExamData?.questions;

  const examInformation = {
    number_boolean_questions:
      editExamData?.num_q_trueOrFalse || Number(filterBoolenFromExam?.length),
    number_multiple_choice:
      editExamData?.num_q_multipleChoice ||
      fileExam?.length - filterBoolenFromExam?.length,
    total_number_questions:
      Number(editExamData?.num_q_trueOrFalse) +
        Number(editExamData?.num_q_multipleChoice) || fileExam?.length,
    score: Number(values.score),
    questions_answers_data: editExamQuestions,
  };

  const totalPages = Math.ceil(editExamQuestions?.length / questionsPerPage);

  const handleNext = () => {
    if (currentIndex < editExamQuestions?.length - 2) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 2);
    }
  };

  const currentQuestions = editExamQuestions?.slice(
    currentIndex,
    currentIndex + 2
  );
  console.log("🚀 ~ currentQuestions:", currentQuestions);

  const currentPage = Math.floor(currentIndex / questionsPerPage) + 1;

  const distributeGradesEvenly = (questions, totalScore) => {
    const numberOfQuestions = questions?.length;
    const gradePerQuestion = totalScore / numberOfQuestions;

    return questions.map((question) => ({
      id: question.id,
      grade: gradePerQuestion,
    }));
  };

  const handleDistributeGrades = () => {
    const { score, questions_answers_data } = examInformation;
    const grades = distributeGradesEvenly(questions_answers_data, score);
    setFieldValue("grades", grades);
    setGrades(grades);
  };

  const handleGradeChange = (e, itemId) => {
    const { value } = e.target;
    setGrades((prev) => {
      console.log("🚀 ~ setGrades ~ prev:", prev)
      const existingGradeIndex = prev?.findIndex((grade) => grade.id == itemId);
      if (existingGradeIndex !== -1) {
        const updatedGrades = [...prev];
        console.log("🚀 ~ setGrades ~ updatedGrades:", updatedGrades)
        updatedGrades[existingGradeIndex].grade = value;
        return updatedGrades;
      }
      return [...prev, { id: itemId, grade: value }];
    });
  };

  const getGradeValue = (itemId) => {
    const grade = grades?.find((grade) => {
      return grade.id == itemId;
    });
    return grade ? grade?.grade  : " " ; 
  };

  // useEffect(() => {
  //   if (editExamData) {
  //     setGrades(editGrade);
  //   }
  // }, []);

  return (
    <div className="flex flex-col my-16 gap-y-5">
      <div className="border border-[#0000001a] rounded-2xl">
        <div className="flex border-b border-b-[#0000001a] font-semibold text-center">
          <h2 className="border-e border-b-[#0000001a] px-6 py-3 w-40">
            {t("number of true and false questions")}
          </h2>
          <p className="flex items-center px-5 py-3">
            {examInformation?.number_boolean_questions}
          </p>
        </div>
        <div className="flex border-b border-b-[#0000001a] font-semibold text-center">
          <h2 className="border-e border-b-[#0000001a] px-5 py-3 w-40">
            {t("number of multiple choice questions")}
          </h2>
          <p className="flex items-center px-5 py-3">
            {examInformation.number_multiple_choice}
          </p>
        </div>
        <div className="flex border-b border-b-[#0000001a] font-semibold text-center">
          <h2 className="border-e border-b-[#0000001a] px-5 py-3 w-40">
            {t("total number of questions")}
          </h2>
          <p className="flex items-center px-5 py-3">
            {examInformation.total_number_questions}
          </p>
        </div>
        <div className="flex border-b border-b-[#0000001a] font-semibold text-center">
          <h2 className="border-e border-b-[#0000001a] px-5 py-3 w-40">
            {t("total score")}
          </h2>
          <p className="flex items-center px-5 py-3">
            {examInformation?.score}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button action={handleDistributeGrades}>
          {t("distribute grades evenly")}
        </Button>
      </div>

      <div className="my-4">
        {currentQuestions?.map((item, i) => {
          console.log("🚀 ~ {currentQuestions?.map ~ item:", item);
          return (
            <div
              key={i}
              className="flex flex-col mb-5 sm:flex-row gap-x-8 gap-y-8"
            >
              <div className="bg-[#2222220d] p-5 rounded-2xl w-full ">
                <div className={`rounded-2xl mb-4`}>
                  <div className="flex items-center justify-between border-b border-b-[#0000001a] p-4">
                    <h2 className="font-semibold text-[#131313]">
                      {t("Question")} <span>{item.questions_number}</span>
                    </h2>
                  </div>
                  <p className="px-4 pt-10 pb-5 text-[#222222bf] font-medium">
                    {item.question}
                  </p>
                </div>
                {item.answers && item.answers.length > 0 ? (
                  item.answers.map((answer, index) => {
                    console.log("🚀 ~ item.answers.map ~ answer:", answer);
                    if (!answer.answer) {
                      return null;
                    }
                    return (
                      <ul key={index} className="flex flex-col gap-3 mb-5">
                        <li className="flex items-center gap-1 px-4 py-3 bg-white cursor-pointer rounded-xl">
                          <MainRadio
                            id={`answer-${item.id}-${index}`}
                            name={`answer-${item.id}`}
                            label=""
                            checked={answer.is_true}
                            className="answer_checked"
                          />{" "}
                          <span
                            className={`${
                              answer.is_true && "text-green-600"
                            } text-[#222222bf] font-medium `}
                          >
                            {answer.answer}
                          </span>
                        </li>
                      </ul>
                    );
                  })
                ) : (
                  <p>No answers available</p>
                )}
              </div>
              
              <div className="flex flex-row items-center justify-between gap-2 sm:flex-col">
                <div className="flex items-center ">
                  <label htmlFor="grade" className="font-semibold me-3">
                    {t("grade")}
                  </label>
                  <BaseInput
                    name={`grades${item.id}`}
                    id={`grades-${item.id}`}
                    type="number"
                    className="w-full text-lg py-2 bg-[#2222220d] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                    placeholder={t("grade")}
                    labelProps="!font-semibold"
                    value={getGradeValue(item.id)}
                    onChange={(e) => handleGradeChange(e, item.id)}
                  />
                </div>
                <RiDeleteBin5Line
                  size={34}
                  className="m-0 mt-0 fill-mainRed sm:m-auto sm:mt-4"
                />
              </div>
            </div>
          );
        })}
        <div className="flex justify-end mt-2 gap-x-8">
          <div className="flex items-center gap-3">
            <div>
              <p className="font-medium">
                {currentPage} <span>{t("of")}</span> {totalPages}
              </p>
            </div>
            <Button
              className="relative h-7 w-7 justify-center inline-flex items-center rounded-md p-0 text-[#404B52] bg-[#F5F5F5]"
              action={handlePrevious}
              disabled={currentIndex === 0}
            >
              <MdNavigateNext />
            </Button>
            <Button
              className="relative h-7 w-7 justify-center inline-flex items-center rounded-md border-none p-0 text-[#404B52] bg-[#F5F5F5]"
              action={handleNext}
              disabled={
                currentIndex >=
                examInformation.questions_answers_data.length - 2
              }
            >
              <MdNavigateNext className="transform rotate-180" />
            </Button>
          </div>
          <div className="hidden w-full sm:w-52 sm:block"></div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-5">
        <Button bordered action={() => setSteps(1)}>
          {t("previous")}
        </Button>
        <Button
          action={() => {
            setSteps(3);
          }}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default InstructorAddSecondExam;
