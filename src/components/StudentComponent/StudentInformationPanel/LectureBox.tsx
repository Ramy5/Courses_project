import { t } from "i18next";
import { FiFileText } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { MdDateRange, MdPerson } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { Link } from "react-router-dom";

interface LectureBox_TP {
  programTitle: string;
  programColor: string;
  lectureDate: Date | string;
  numOfStudents: number;
  instructors: string[];
}

const LectureBox: React.FC<LectureBox_TP> = ({
  programTitle,
  programColor,
  lectureDate,
  numOfStudents,
  instructors,
}) => (
  <div
    className={`rounded-xl border-s-8 bg-white p-4`}
    style={{ borderColor: programColor }}
  >
    <div className="flex items-center justify-between gap-1 mb-6">
      <div className="flex items-center gap-2">
        <span>
          <IoBookOutline color={programColor} size={30} />
        </span>
        <span className="text-2xl font-bold truncate w-44">
          {t(`${programTitle}`)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <FiFileText size={12} color={programColor} />
        <Link className="w-20 text-xs truncate" to="">
          {t("enrichment information")}
        </Link>
      </div>
    </div>

    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-col items-center gap-1">
        <p className="flex items-center gap-1">
          <span>
            <MdDateRange size={21} color={programColor} />
          </span>
          <span className="text-lg">{t("date")}</span>
        </p>
        <p className="text-lg font-bold" style={{ color: programColor }}>
          {t(`${lectureDate}`)}
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
          {numOfStudents}
        </p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="flex items-center gap-1">
          <span>
            <MdPerson size={21} color={programColor} />
          </span>
          <span className="text-lg">{t("instructors")}</span>
        </p>
        <p className="text-sm text-gray-500">
          {instructors.map((instructor: string, index: number) => {
            return <p key={index}>{t(`${instructor}`)}</p>;
          })}
        </p>
      </div>
    </div>
  </div>
);

export default LectureBox;
