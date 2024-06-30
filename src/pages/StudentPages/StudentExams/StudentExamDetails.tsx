import { t } from "i18next";
import React from "react";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";

const StudentExamDetails = () => {
  const navigate = useNavigate();

  const examDetails = {
    id: 1,
    exam_name: "الفزياء",
    exam_title: "اختبار فصلي اول",
    exam_type: "اختبار فصلي",
    instructions:
      "تتطلب مناقشة العلاقة بين اللغة و الخطاب النظر في مجموعة من العلاقات، كعلاقة اللغة بالسلطة و الإيديولوجية و الثقافة، و طرح جملة من المستويات النظرية و المشكلات المعرفية، كأصل اللغة،و سلطة اللغة، و السلط المساندة لها، و التمييز الذي تقيمه اللسانيات بين اللغة و الكلام و الخطاب، و الوحدات المشكلة للخطاب و اللسانيات الداخلية و الخارجية، و النظر في بعض المسائل الابستيمولوجية التي تطرحها هذه العلاقة ضمن ميدان معرفي يحاول التأسيس لمناهجه و مفاهيمه و مسائله على الرغم مما  و المشكلات المعرفية، كأصل اللغة،و سلطة اللغة، و السلط المساندة لها، ",
    exam_mark: "100",
    degree_success: "50",
    exam_date: "21/8/2024",
    exam_duration: "45 دقيقة",
  };
  return (
    <div className="bg-white py-10 px-8 rounded-3xl">
      <h2 className="text-2xl font-semibold text-mainColor text-center sm:text-start">
        {t("exam")} <span>{examDetails.exam_name}</span>
      </h2>
      <div className="flex my-6 flex-col sm:flex-row gap-8 sm:gap-24 text-center sm:text-start">
        <div>
          <h2 className="text-xl font-medium text-mainColor">
            {t("exam title")}
          </h2>
          <p className="font-medium">{examDetails.exam_title}</p>
        </div>
        <div>
          <h2 className="text-xl font-medium text-mainColor">
            {t("exam type")}
          </h2>
          <p className="font-medium">{examDetails.exam_type}</p>
        </div>
      </div>

      <div className="mb-12  text-center sm:text-start">
        <h2 className="text-xl font-medium text-mainColor">
          {t("instructions")}
        </h2>
        <p className="font-medium">{examDetails.instructions}</p>
      </div>

      <div className="flex my-10 flex-col sm:flex-row gap-8 sm:gap-24 text-center sm:text-start">
        <div>
          <h2 className="text-xl font-medium text-mainColor">
            {t("exam mark:")}{" "}
            <span className="font-medium text-black">
              {examDetails.exam_mark}
            </span>
          </h2>
        </div>
        <div>
          <h2 className="text-xl font-medium text-mainColor">
            {t("degree of success:")}{" "}
            <span className="font-medium text-black">
              {examDetails.degree_success}
            </span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 sm:gap-24 text-center sm:text-start">
        <div>
          <h2 className="text-xl font-medium text-mainColor">
            {t("exam date:")}{" "}
            <span className="font-medium text-black">
              {examDetails.exam_date}
            </span>
          </h2>
        </div>
        <div>
          <h2 className="text-xl font-medium text-mainColor">
            {t("exam duration:")}{" "}
            <span className="font-medium text-black">
              {examDetails.exam_duration}
            </span>
          </h2>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button bordered action={() => navigate(-1)}>
          {t("retreat")}
        </Button>
        <Button action={() => navigate(`/student/exam/${examDetails.id}`)}>{t("start exam")}</Button>
      </div>
    </div>
  );
};

export default StudentExamDetails;
