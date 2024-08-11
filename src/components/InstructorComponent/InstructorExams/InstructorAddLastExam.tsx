import { t } from "i18next";
import { useState } from "react";
import { Button, MainPopup } from "../..";
import { useNavigate } from "react-router-dom";
import { PiCheckCircleThin } from "react-icons/pi";
import { useFormikContext } from "formik";
import { formatDate } from "../../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../utils/constants";
import axios from "axios";
import Cookies from "js-cookie";

const postNewExam = async (newExam: any) => {
  const token = Cookies.get("token");
  const response = await axios.post(`${BASE_URL}exams`, newExam, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

const postEditExam = async (editExam: any, id) => {
  const token = Cookies.get("token");
  const response = await axios.post(`${BASE_URL}exams/${id}`, editExam, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

const InstructorAddLastExam = ({
  setSteps,
  fileExam,
  questionExam,
  file,
  editExamData,
  grades,
}: any) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { values } = useFormikContext();
  const queryClient = useQueryClient();

  const examInformation = {
    course_name: values?.course_name,
    duration: values?.duration,
    total_number_questions:
      questionExam?.length ||
      Number(editExamData?.num_q_trueOrFalse) +
        Number(editExamData?.num_q_multipleChoice),
    score: values?.score,
    passing_score: values?.passing_score,
    exam_date: values?.date,
  };

  const filterBoolenFromExam = fileExam?.filter(
    (item) => item.answer == "true" || item.answer == "false"
  );

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-exams"],
    mutationFn: postNewExam,
    onSuccess: (data) => {
      queryClient.invalidateQueries("exams");
      toast.success(t("the exam has been added successfully."));
      navigate("/instructor/exams");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0];
      toast.error(errorMessage);
    },
  });

  const { mutate: editExamMutate, isPending: editIsPendingExam } = useMutation({
    mutationKey: ["edit-exams"],
    mutationFn: (editExam: any) =>
      postEditExam(editExam, Number(editExamData?.id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries("exams");
      toast.success(t("the exam has been edited successfully."));
      navigate("/instructor/exams");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0];
      toast.error(errorMessage);
    },
  }); 

  const questions = editExamData?.questions?.map((question) => {
    const matchingGrade = grades?.find((grade) => grade.id == question.id);
    return {
      id: question.id,
      question: question.question,
      answers: question.answers,
      questions_degrees: matchingGrade ? matchingGrade.grade : 0,
      questions_number: question.questions_number,
    };
  });

  return (
    <div className="relative w-full m-auto sm:w-4/5">
      <div className="border-2 border-[#E7F0FB] rounded-2xl mt-20 overflow-hidden">
        <div className="flex border-b-2 border-b-[#E7F0FB] font-semibold text-center">
          <h2 className="px-6 py-4 w-40 bg-[#E7F0FB]">{t("exam name")}</h2>
          <p className="flex items-center px-5 py-4">
            {examInformation?.course_name}
          </p>
        </div>
        <div className="flex border-b-2 border-b-[#E7F0FB] font-semibold text-center">
          <h2 className=" px-5 py-4 w-40 bg-[#E7F0FB]">{t("duration")}</h2>
          <p className="flex items-center px-5 py-4">
            {examInformation?.duration} <span>{t("minute")}</span>
          </p>
        </div>
        <div className="flex border-b-2 border-b-[#E7F0FB] font-semibold text-center">
          <h2 className="px-5 py-4 w-40 bg-[#E7F0FB]">
            {t("total questions")}
          </h2>
          <p className="flex items-center px-5 py-4">
            {examInformation?.total_number_questions}
          </p> 
        </div>
        <div className="flex border-b-2 border-b-[#E7F0FB] font-semibold text-center">
          <h2 className="px-5 py-4 w-40 bg-[#E7F0FB]">{t("total score")}</h2>
          <p className="flex items-center px-5 py-4">
            {examInformation?.score}
          </p>
        </div>
        <div className="flex border-b-2 border-b-[#E7F0FB] font-semibold text-center">
          <h2 className="px-5 py-4 w-40 bg-[#E7F0FB]">
            {t("degree of success")}
          </h2>
          <p className="flex items-center px-5 py-4">
            {examInformation?.passing_score}
          </p>
        </div>
        <div className="flex border-b-2 border-b-[#E7F0FB] font-semibold text-center">
          <h2 className="px-5 py-4 w-40 bg-[#E7F0FB]">{t("exam date")}</h2>
          <p className="flex items-center px-5 py-4">
            {formatDate(examInformation?.exam_date)}
          </p>
        </div>
      </div>

      {showModal && (
        <MainPopup
          onClose={() => setShowModal(false)}
          className="bg-white w-[90vw] sm:w-[60vw] lg:w-[50vw] xl:w-[50vw]"
        >
          <div className="py-12 text-center">
            <PiCheckCircleThin size={120} className="m-auto fill-mainColor" />
            <p className="text-2xl font-semibold text-mainColor my-7">
              {t("the test structure has been completed")}
            </p>

            <Button
              action={() => {
                const finalExamData = {
                  course_id: values?.course_id,
                  title_ar: values?.title_ar,
                  title_en: values?.title_en,
                  instructions_ar: values?.instructions_ar,
                  instructions_en: values?.instructions_en,
                  start_time: values?.start_time?.split(":").slice(0, 2).join(":"),
                  attachment: file,
                  date: formatDate(values?.date),
                  score: values?.score,
                  total_score: values?.score,
                  num_q_trueOrFalse:
                    editExamData?.num_q_trueOrFalse ||
                    filterBoolenFromExam?.length,
                  num_q_multipleChoice:
                    editExamData?.num_q_multipleChoice ||
                    fileExam?.length - filterBoolenFromExam?.length,
                  passing_score: values?.passing_score,
                  duration: values?.duration,
                  exam_type: values?.exam_type,
                  questions: questionExam?.length ? questionExam : questions,
                };

                if (!!editExamData) {
                  editExamMutate(finalExamData);
                } else {
                  mutate(finalExamData);
                }
              }}
              loading={isPending || editIsPendingExam}
            >
              {t("ok")}
            </Button>
          </div>
        </MainPopup>
      )}

      <div className="flex items-center justify-end gap-5 mt-8">
        <Button bordered action={() => setSteps(2)}>
          {t("previous")}
        </Button>
        <Button action={() => setShowModal(true)}>{t("submit")}</Button>
      </div>
    </div>
  );
};

export default InstructorAddLastExam;
