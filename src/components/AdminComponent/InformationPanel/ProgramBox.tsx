import { t } from "i18next";
import { FiFileText } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import { PiStudent } from "react-icons/pi";

interface ProgramBox_TP {
  programTitle: string;
  programColor: string;
  numOfCourses: number;
  numOfStudents: number;
  numOfInstructor: number;
}

const ProgramBox = (props: ProgramBox_TP) => {
  const {
    programTitle,
    programColor,
    numOfCourses,
    numOfStudents,
    numOfInstructor,
  } = props;

  return (
    <div
      className={`rounded-xl border-s-8 bg-white p-4`}
      style={{ borderColor: programColor }}
    >
      <h2 className="flex items-end gap-2 mb-6">
        <span>
          <IoBookOutline color={programColor} size={30} />
        </span>
        <span className="text-2xl font-bold truncate">
          {t(`${programTitle}`)}
        </span>
      </h2>

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col items-center gap-1">
          <p className="flex items-center gap-1">
            <span>
              <FiFileText size={21} color={programColor} />
            </span>
            <span className="text-lg">{t("courses")}</span>
          </p>
          <p className="text-lg font-bold" style={{ color: programColor }}>
            +{t(`${numOfCourses}`)}
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 px-2 border-gray-400 border-x">
          <p className="flex items-center gap-1">
            <span>
              <PiStudent size={21} color={programColor} />
            </span>
            <span className="text-lg">{t("students")}</span>
          </p>
          <p className="text-lg font-bold" style={{ color: programColor }}>
            +{t(`${numOfStudents}`)}
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="flex items-center gap-1">
            <span>
              <MdPerson size={21} color={programColor} />
            </span>
            <span className="text-lg">{t("instructors")}</span>
          </p>
          <p className="text-lg font-bold" style={{ color: programColor }}>
            +{t(`${numOfInstructor}`)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgramBox;
