import { t } from "i18next";
import { CiCalendarDate } from "react-icons/ci";
import { IoDocumentTextOutline, IoTimeOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import Back from "../../UI/Back";
import { Button } from "../..";
import { GoArrowLeft } from "react-icons/go";

interface StudentHomeworkDescription_TP {
  isProject?: boolean;
  description: string;
  instructions: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  grade: number;
  pdf;
  links: object[];
}

const StudentHomeworkDescription = (props: StudentHomeworkDescription_TP) => {
  const {
    isProject,
    description,
    instructions,
    startDate,
    startTime,
    endDate,
    endTime,
    grade,
    pdf,
    links,
  } = props;

  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="space-y-16">
      {/* DESCRIPTION */}
      <div>
        <h2 className="mb-2 text-2xl font-bold text-mainColor">
          {isProject ? t("project description") : t("homework description")}
        </h2>
        <p>{description}</p>
      </div>

      {/* INSTRUCTIONS */}
      <div>
        <h2 className="mb-2 text-2xl font-bold text-mainColor">
          {t("instruction")}
        </h2>
        <p>{instructions}</p>
      </div>

      {/* DATE */}
      <div className="space-y-4">
        <div className="flex items-center gap-6">
          <p className="text-2xl text-mainColor">{"date from"}:</p>
          <p className="flex items-center gap-2">
            <span>
              <CiCalendarDate className="text-2xl text-mainColor" />
            </span>
            <span className="text-gray-700">{startDate}</span>
          </p>
          <p className="flex items-center gap-2">
            <span>
              <IoTimeOutline className="text-2xl text-mainColor" />
            </span>
            <span className="text-gray-700">{startTime}</span>
          </p>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-2xl text-mainColor">{"date to"}:</p>
          <p className="flex items-center gap-2">
            <span>
              <CiCalendarDate className="text-2xl text-mainColor" />
            </span>
            <span className="text-gray-700">{endDate}</span>
          </p>
          <p className="flex items-center gap-2">
            <span>
              <IoTimeOutline className="text-2xl text-mainColor" />
            </span>
            <span className="text-gray-700">{endTime}</span>
          </p>
        </div>
      </div>

      {/* GRADE */}
      <p className="flex items-center gap-4">
        <span className="text-2xl font-bold text-mainColor">{t("grade")}:</span>
        <span className="text-xl font-bold">{grade}</span>
      </p>

      {/* SAMPLE */}
      <div className="">
        <h2 className="mb-4 text-2xl font-bold text-mainColor">
          {isProject ? t("sample project") : t("sample assignments")}
        </h2>
        <p className="flex items-center gap-1 px-4 py-2 bg-white border w-max">
          <span>
            <IoDocumentTextOutline className="text-2xl text-green-600" />
          </span>
          <span>{pdf}</span>
        </p>
      </div>

      {/* LINKS */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-mainColor">
          {t("enrichment links")}
        </h2>
        <div className="flex flex-col gap-4">
          {links?.map((link) => {
            return (
              <Link
                className="py-1 border-b w-max text-mainColor border-mainColor"
                key={link.id}
                to={link.url}
              >
                {link.url}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ADD HOMEWORK OR PROJECT */}
      <div className="flex items-center justify-between w-full mt-24">
        <Button
          action={() => navigate(`/students/addHomeworks/${id}`)}
          className="flex items-center gap-2 text-green-800 bg-transparent border border-mainColor"
        >
          <span>{!isProject ? t("add homework") : t("add project")}</span>
          <GoArrowLeft />
        </Button>
        <Back />
      </div>
    </div>
  );
};

export default StudentHomeworkDescription;
