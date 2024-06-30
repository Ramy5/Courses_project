import { TitlePage, ViewHomeworkTable } from "../../../components";
import { t } from "i18next";
import { SlBookOpen } from "react-icons/sl";

const StudentViewHomework = () => {
  const data = {
    studentName: "فراس يحيى سعيد الزهراني",
    studentCode: "13345577",
    assignmentTitle: "كيرشوف",
    instructions:
      "تتطلب مناقشة العلاقة بين اللغة و الخطاب النظر في مجموعة من العلاقات، كعلاقة اللغة بالسلطة و الإيديولوجية و الثقافة، و طرح جملة من المستويات النظرية و المشاكل المعرفية، كأصل اللغة، و سلطة اللغة، و السلط المساندة لها، و التمييز الذي تقيمه اللسانيات بين اللغة و الكلام و الخطاب، و الوحدات",
    studentAnswer:
      "تتطلب مناقشة العلاقة بين اللغة و الخطاب النظر في مجموعة من العلاقات، كعلاقة اللغة بالسلطة و الإيديولوجية و الثقافة، و طرح جملة من المستويات النظرية و المشاكل المعرفية، كأصل اللغة، و سلطة اللغة، و السلط المساندة لها، و التمييز الذي تقيمه اللسانيات بين اللغة و الكلام و الخطاب، و الوحدات",
    attachedFile: "/path/to/الواجب.pdf",
    attachedFileName: "الواجب.pdf",
  };

  return (
    <div>
      <TitlePage
        mainTitle={t("homeworks")}
        mainLink="/students/homeworks"
        supTitle="فارس محمد"
        icon={<SlBookOpen className="text-xl text-mainColor" />}
      />

      <div>
        <ViewHomeworkTable data={data} />
      </div>
    </div>
  );
};

export default StudentViewHomework;
