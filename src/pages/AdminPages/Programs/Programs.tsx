import { FaFolder, FaUserAlt } from "react-icons/fa";
import { Button, DotsDropDown, TitlePage } from "../../../components";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { PiStudentBold } from "react-icons/pi";
import Pagination from "../../../components/UI/Pagination";
import { GrView } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";

const Programs = () => {
  const [openRow, setOpenRow] = useState<number | null>(null);
  console.log("🚀 ~ Programs ~ openRow:", openRow)

  const navigate = useNavigate();

  const programsData = [
    {
      id: 1,
      title: "ذكاء اصطناعي",
      courses: "20 مقرر",
      Instructors: "15 محاضر",
      students: "+5000 طالب",
    },
    {
      id: 2,
      title: "ذكاء اصطناعي",
      courses: "20 مقرر",
      Instructors: "15 محاضر",
      students: "+5000 طالب",
    },
    {
      id: 3,
      title: "ذكاء اصطناعي",
      courses: "20 مقرر",
      Instructors: "15 محاضر",
      students: "+5000 طالب",
    },
    {
      id: 4,
      title: "ذكاء اصطناعي",
      courses: "20 مقرر",
      Instructors: "15 محاضر",
      students: "+5000 طالب",
    },
    {
      id: 5,
      title: "ذكاء اصطناعي",
      courses: "20 مقرر",
      Instructors: "15 محاضر",
      students: "+5000 طالب",
    },
  ];

  const handleStudySchedule = (instructorId: number) => {
    navigate(`/programs/StudySchedule/${instructorId}`);
  };

  const handleToggleDropDown = (id: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  };

  return (
    <div>
      <div>
        <TitlePage
          mainTitle="Programs"
          supTitle=""
          ThirdLink={`/programs/programInfo/${openRow}`}
          icon={<FaFolder size={28} className="fill-mainColor" />}
        />

        <div className="flex justify-end">
          <Button action={() => navigate("/programs/create")}>{t("add program +")}</Button>
        </div>

        <div className="grid grid-cols-1 gap-4 my-8 md:grid-cols-2 lg:grid-cols-3">
          {programsData.map((program, index) => (
            <div
              key={index}
              className="p-4 text-center bg-white rounded-2xl border-[3.4px] border-[#025464]"
            >
              <div className="flex items-center justify-between w-full">
                <h2 className="font-semibold text-xl text-[#025464]">
                  {program.title}
                </h2>
                <DotsDropDown
                  instructorId={program.id}
                  instructorRoute="/programs/programInfo"
                  firstName="view program data"
                  firstIcon={<GrView size={22} className="fill-mainColor" />}
                  secondName="delete program"
                  secondIcon={<RiDeleteBin5Line size={22} className="fill-mainRed" />}
                  isOpen={openRow == program.id}
                  onToggle={() => handleToggleDropDown(program.id)}
                />
              </div>
              <div className="my-4">
                <div className="flex gap-2 items-center">
                  <CgNotes size={25} className=" text-mainColor" />
                  <p className="font-medium text-xl">{program.courses}</p>
                </div>
                <div className="flex gap-2 items-center my-3">
                  <FaUserAlt size={25} className="fill-mainColor" />
                  <p className="font-medium text-xl">{program.Instructors}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <PiStudentBold size={25} className="fill-mainColor" />
                  <p className="font-medium text-xl">{program.students}</p>
                </div>
              </div>
              <div className="text-mainGray opacity-55"></div>
              <Button
                className="border border-[#404B52] text-black font-medium mt-3"
                bordered
                action={() => handleStudySchedule(program.id)}
              >
                {t("school schedule")}
              </Button>
            </div>
          ))}
        </div>

        <div>
          <Pagination
            showNavigation={true}
            //   table={table}
            currentPage="1"
            totalPages={40}
          />
        </div>
      </div>
    </div>
  );
};

export default Programs;
