import { t } from "i18next";
import { ProjectsTabs, TitlePage } from "../../../components";
import { IoBulbOutline } from "react-icons/io5";

const StudentProjects = () => {
  return (
    <div>
      <TitlePage
        mainTitle={t("projects")}
        icon={<IoBulbOutline className="text-xl text-mainColor" />}
      />

      <ProjectsTabs />
    </div>
  );
};

export default StudentProjects;
