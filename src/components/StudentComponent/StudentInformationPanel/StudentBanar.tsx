import { t } from "i18next";
import instructorPerson from "../../../assets/studentInformationPanel/person.svg";
import { useAppSelector } from "../../../hooks/reduxHooks";

interface StudentBanar_TP {
  userName?: string;
}

const StudentBanar: React.FC<StudentBanar_TP> = ({ userName }) => {
  const { user } = useAppSelector((slice) => slice.user);

  return (
    <div className="flex items-center gap-8 px-6 py-2 bg-no-repeat bg-cover student_banner-img">
      <div className="hidden lg:inline-block">
        <img src={instructorPerson} alt="instructor person" />
      </div>
      <div>
        <h2 className="mb-3 text-4xl font-bold text-white">
          {t(`hello, ${user?.name}`)}
        </h2>
        <p className="font-bold text-white">
          {t(
            "today we are happy to have you with us. We hope that you are in the best condition and we wish you excellence and success"
          )}
        </p>
      </div>
    </div>
  );
};

export default StudentBanar;
