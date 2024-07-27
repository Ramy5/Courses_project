import { t } from "i18next";
import { CiCalendarDate } from "react-icons/ci";
import { IoDocumentTextOutline, IoTimeOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import Back from "../../UI/Back";
import { Button } from "../..";
import { GoArrowLeft } from "react-icons/go";

interface StudentHomeworkDescription_TP {
  isProject?: boolean;
  desc: string;
  instructions: string;
  start_date: string;
  startTime: string;
  end_date: string;
  endTime: string;
  degree: number;
  attachment: File;
  links: string;
  isInstructotHomework?: boolean;
  isInstructorProject?: boolean;
}

const StudentHomeworkDescription = (props: StudentHomeworkDescription_TP) => {
  const {
    isProject,
    desc: description,
    instructions,
    start_date: startDate,
    startTime,
    end_date: endDate,
    endTime,
    degree: grade,
    score,
    attachment: pdf,
    links,
    isInstructotHomework,
    isInstructorProject,
  } = props;

  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="space-y-8 lg:space-y-16">
      {/* DESCRIPTION */}
      <div>
        <h2 className="mb-2 text-2xl font-bold text-mainColor">
          {isProject || isInstructorProject
            ? t("project description")
            : t("homework description")}
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
        <div className="flex flex-wrap items-center gap-6">
          <p className="text-2xl text-mainColor">
            {isInstructotHomework ? t("start of delivery") : t("date from")}:
          </p>
          <div className="flex items-center gap-6">
            <p className="flex items-center gap-2">
              <span>
                <CiCalendarDate className="text-2xl text-mainColor" />
              </span>
              <span className="text-gray-700">{startDate}</span>
            </p>
            {!isInstructotHomework && (
              <p className="flex items-center gap-2">
                <span>
                  <IoTimeOutline className="text-2xl text-mainColor" />
                </span>
                <span className="text-gray-700">{startTime}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <p className="text-2xl text-mainColor">
            {isInstructotHomework ? t("end of delivery") : t("date to")}:
          </p>
          <div className="flex items-center gap-6">
            <p className="flex items-center gap-2">
              <span>
                <CiCalendarDate className="text-2xl text-mainColor" />
              </span>
              <span className="text-gray-700">{endDate}</span>
            </p>
            {!isInstructotHomework && (
              <p className="flex items-center gap-2">
                <span>
                  <IoTimeOutline className="text-2xl text-mainColor" />
                </span>
                <span className="text-gray-700">{endTime}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* GRADE */}
      <p className="flex items-center gap-4">
        <span className="text-2xl font-bold text-mainColor">{t("grade")}:</span>
        <span className="text-xl font-bold">
          {isInstructorProject ? score : grade}
        </span>
      </p>

      {/* SAMPLE */}
      <div className="">
        <h2 className="mb-4 text-2xl font-bold text-mainColor">
          {isProject || isInstructorProject
            ? t("sample project")
            : t("sample assignments")}
        </h2>
        <p className="flex items-center gap-1 px-4 py-2 bg-white border w-max">
          <span>
            <IoDocumentTextOutline className="text-2xl text-green-600" />
          </span>
          <Link to={pdf} target="_blank">
            {pdf}
          </Link>
        </p>
      </div>

      {/* LINKS */}
      {!isInstructotHomework && (
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
      )}

      {/* ADD HOMEWORK OR PROJECT */}
      <div className="flex items-center justify-between w-full mt-24">
        <Button
          action={() => {
            if (isProject) {
              navigate(`/students/addProjects/${id}`);
              return;
            }

            if (isInstructotHomework) {
              navigate(`/instructors/viewAllHomeworks/${id}`);
              return;
            }

            if (isInstructorProject) {
              navigate(`/instructors/viewAllProject/${id}`);
              return;
            }

            navigate(`/students/addHomeworks/${id}`);
          }}
          className="flex items-center gap-2 text-green-800 bg-transparent border border-mainColor"
        >
          {isInstructotHomework && <span>{t("view students homework")}</span>}
          {!isInstructotHomework && (
            <span>
              {!isProject || !isInstructorProject
                ? t("add homework")
                : t("add project")}
            </span>
          )}
          <GoArrowLeft />
        </Button>
        <Back className="border bg-mainColor/5 border-mainColor text-mainColor" />
      </div>
    </div>
  );
};

export default StudentHomeworkDescription;
