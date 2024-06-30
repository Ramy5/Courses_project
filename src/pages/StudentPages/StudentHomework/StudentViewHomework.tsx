import { TitlePage } from "../../../components";
import { t } from "i18next";
import { SlBookOpen } from "react-icons/sl";

const StudentViewHomework = () => {
  return (
    <div>
      <TitlePage
        mainTitle={t("homeworks")}
        mainLink="/students/homeworks"
        supTitle="فارس محمد"
        icon={<SlBookOpen className="text-xl text-mainColor" />}
      />
    </div>
  );
};

export default StudentViewHomework;
