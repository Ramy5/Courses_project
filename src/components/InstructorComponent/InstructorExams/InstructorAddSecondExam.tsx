import { t } from "i18next";
import { BaseInput, Button, MainRadio } from "../..";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useFormikContext } from "formik";
import { useState } from "react";
import { MdNavigateNext } from "react-icons/md";

const InstructorAddSecondExam = ({ setSteps, setGrades }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const questionsPerPage = 2;

  const examInformation = {
    number_boolean_questions: 20,
    number_multiple_choice: 20,
    total_number_questions: 40,
    total_score: 100,
    questions_answers_data: [
      {
        id: 1,
        questions_number: "الاول",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answers: [
          { label: "٢٥ كولوم", value: true },
          { label: "٢٥ كيلو كولوم", value: false },
          { label: "٤٠ كولوم", value: false },
          { label: "٧٠ كولوم", value: false },
        ],
      },
      {
        id: 2,
        questions_number: "الثاني",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answers: [
          { label: "٢٥ كولوم", value: false },
          { label: "٢٥ كيلو كولوم", value: false },
          { label: "٤٠ كولوم", value: true },
          { label: "٧٠ كولوم", value: false },
        ],
      },
      {
        id: 3,
        questions_number: "الثالث",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answers: [
          { label: "٢٥ كولوم", value: false },
          { label: "٢٥ كيلو كولوم", value: false },
          { label: "٤٠ كولوم", value: false },
          { label: "٧٠ كولوم", value: true },
        ],
      },
      {
        id: 4,
        questions_number: "الرابع",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answers: [
          { label: "٢٥ كولوم", value: true },
          { label: "٢٥ كيلو كولوم", value: false },
          { label: "٤٠ كولوم", value: false },
          { label: "٧٠ كولوم", value: false },
        ],
      },
      {
        id: 5,
        questions_number: "الخامس",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answers: [
          { label: "٢٥ كولوم", value: false },
          { label: "٢٥ كيلو كولوم", value: false },
          { label: "٤٠ كولوم", value: true },
          { label: "٧٠ كولوم", value: false },
        ],
      },
      {
        id: 6,
        questions_number: "السادس",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answers: [
          { label: "٢٥ كولوم", value: true },
          { label: "٢٥ كيلو كولوم", value: false },
          { label: "٤٠ كولوم", value: false },
          { label: "٧٠ كولوم", value: false },
        ],
      },
      {
        id: 7,
        questions_number: "السابع",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answers: [
          { label: "٢٥ كولوم", value: false },
          { label: "٢٥ كيلو كولوم", value: false },
          { label: "٤٠ كولوم", value: true },
          { label: "٧٠ كولوم", value: false },
        ],
      },
      {
        id: 8,
        questions_number: "الثامن",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answers: [
          { label: "٢٥ كولوم", value: false },
          { label: "٢٥ كيلو كولوم", value: true },
          { label: "٤٠ كولوم", value: false },
          { label: "٧٠ كولوم", value: false },
        ],
      },
      {
        id: 9,
        questions_number: "التاسع",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answers: [
          { label: "٢٥ كولوم", value: true },
          { label: "٢٥ كيلو كولوم", value: false },
          { label: "٤٠ كولوم", value: false },
          { label: "٧٠ كولوم", value: false },
        ],
      },
      {
        id: 10,
        questions_number: "العاشر",
        questions_degrees: 3,
        questions:
          "اذا كان التيار المار في المصباح ٥ امبير، فما الشحنة التي تمر خلالة خلال خمس دقائق",
        answers: [
          { label: "٢٥ كولوم", value: false },
          { label: "٢٥ كيلو كولوم", value: false },
          { label: "٤٠ كولوم", value: true },
          { label: "٧٠ كولوم", value: false },
        ],
      },
    ],
  };

  const totalPages = Math.ceil(
    examInformation.questions_answers_data.length / questionsPerPage
  );

  const handleNext = () => {
    if (currentIndex < examInformation.questions_answers_data.length - 2) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 2);
    }
  };

  const currentQuestions = examInformation.questions_answers_data.slice(
    currentIndex,
    currentIndex + 2
  );
  const currentPage = Math.floor(currentIndex / questionsPerPage) + 1;

  const { values, setFieldValue } = useFormikContext();

  const distributeGradesEvenly = (questions, totalScore) => {
    const numberOfQuestions = questions.length;
    const gradePerQuestion = totalScore / numberOfQuestions;

    return questions.map((question) => ({
      id: question.id,
      grade: gradePerQuestion,
    }));
  };

  const handleDistributeGrades = () => {
    const { total_score, questions_answers_data } = examInformation;
    const grades = distributeGradesEvenly(questions_answers_data, total_score);
    setFieldValue("grades", grades);
  };

  return (
    <div className="flex flex-col my-16 gap-y-5">
      <div className="border border-[#0000001a] rounded-2xl">
        <div className="flex border-b border-b-[#0000001a] font-semibold text-center">
          <h2 className="border-e border-b-[#0000001a] px-6 py-3 w-40">
            {t("number of true and false questions")}
          </h2>
          <p className="flex items-center px-5 py-3">
            {examInformation.number_boolean_questions}
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
            {examInformation.total_score}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button action={handleDistributeGrades}>
          {t("distribute grades evenly")}
        </Button>
      </div>

      <div className="my-4">
        {currentQuestions.map((item, i) => (
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
                  {item.questions}
                </p>
              </div>
              {item.answers.map((answer, index) => {
                return (
                  <ul className="flex flex-col gap-3 mb-5">
                    <li className="flex items-center gap-1 px-4 py-3 bg-white cursor-pointer rounded-xl">
                      <MainRadio
                        id={`answer-${item.id}-${index}`}
                        name={`answer-${item.id}`}
                        label=""
                        checked={answer.value}
                        className="answer_checked"
                      />{" "}
                      <span
                        className={`${
                          answer.value && "text-green-600"
                        } text-[#222222bf] font-medium `}
                      >
                        {answer.label}
                      </span>
                    </li>
                  </ul>
                );
              })}
            </div>
            <div className="flex flex-row items-center justify-between gap-2 sm:flex-col">
              <div className="flex items-center ">
                <label htmlFor="grade" className="font-semibold me-3">
                  {t("grade")}
                </label>
                <BaseInput
                  name={`grades.${i}`}
                  id={`grades.${item.id}`}
                  type="number"
                  className="w-full text-lg py-2 bg-[#2222220d] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("grade")}
                  labelProps="!font-semibold"
                  onChange={(e) => {
                    setGrades((prev) => [
                      ...prev,
                      { id: item.id, grade: e.target.value },
                    ]);
                  }}
                />
              </div>
              <RiDeleteBin5Line
                size={34}
                className="m-0 mt-0 fill-mainRed sm:m-auto sm:mt-4"
              />
            </div>
          </div>
        ))}
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
          {t("Previous")}
        </Button>
        <Button action={() => setSteps(3)}>{t("Next")}</Button>
      </div>
    </div>
  );
};

export default InstructorAddSecondExam;
