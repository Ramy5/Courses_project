import { t } from "i18next";
import { CiCalendarDate } from "react-icons/ci";
import { FaArrowLeft, FaBookReader } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";
import { Link } from "react-router-dom";

const HomeworkRequiredBox = (props) => {
  const { color, subject, professor, taskName, startDate, endDate, id } = props;

  return (
    <Link
      to={`/students/homeworks/${id}`}
      className={`rounded-lg border-s-[12px] p-4 border border-gray-400 shadow-xl bg-gray-100 space-y-4`}
      style={{ borderInlineStartColor: color }}
    >
      <p className="flex items-center gap-3">
        <span>
          <FaBookReader className="text-2xl text-mainColor" />
        </span>
        <span className="text-xl font-bold">{subject}</span>
      </p>
      <p className="flex items-center gap-3">
        <span>
          <IoMdPerson className="text-3xl text-mainColor" />
        </span>
        <span>
          {`${t("professor")}`}: {professor}
        </span>
      </p>
      <p className="flex items-center gap-3">
        <span>
          <FiFileText className="text-3xl text-mainColor" />
        </span>
        <span>
          {`${t("homework")}`} {id}: {taskName}
        </span>
      </p>
      <div className="flex items-center gap-6">
        <p className="flex items-center gap-3">
          <span>
            <CiCalendarDate className="text-3xl text-mainColor" />
          </span>
          <span>{startDate}</span>
        </p>
        <span>
          <FaArrowLeft className="text-xl text-mainColor" />
        </span>
        <p className="flex items-center gap-3">
          <span>
            <CiCalendarDate className="text-3xl text-mainColor" />
          </span>
          <span>{endDate}</span>
        </p>
      </div>
    </Link>
  );
};

export default HomeworkRequiredBox;
