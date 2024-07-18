import { FaFolder, FaUserAlt } from "react-icons/fa";
import {
  Button,
  DotsDropDown,
  MainPopup,
  TitlePage,
} from "../../../components";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { PiStudentBold } from "react-icons/pi";
import Pagination from "../../../components/UI/Pagination";
import { GrView } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";
import { toast } from "react-toastify";

const Programs = () => {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  const fetchProgramData = async () => {
    const response = await customFetch(`/programs`);
    return response;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["programs_data"],
    queryFn: fetchProgramData,
  });

  const programData = data ? data?.data.data.programs : {};

  useEffect(() => {
    if (error) {
      toast.error(`${error.message}`);
    }
  }, [error]);

  const handleStudySchedule = (instructorId: number) => {
    navigate(`/programs/StudySchedule/${instructorId}`);
  };

  const handleToggleDropDown = (id: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  };

  if (isLoading) return <Loading />;

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
          <Button action={() => navigate("/programs/create")}>
            {t("add program +")}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 my-8 md:grid-cols-2 lg:grid-cols-3">
          {programData &&
            programData?.map((program, index) => (
              <div
                key={index}
                className="p-4 text-center bg-white rounded-2xl border-[3.4px] border-[#025464]"
              >
                <div className="flex items-center justify-between w-full">
                  <h2 className="font-semibold text-xl text-[#025464]">
                    {program.program_name}
                  </h2>
                  <DotsDropDown
                    firstName="view program data"
                    firstIcon={<GrView size={22} className="fill-mainColor" />}
                    secondName="delete program"
                    secondIcon={
                      <RiDeleteBin5Line size={22} className="fill-mainRed" />
                    }
                    isOpen={openRow == program.id}
                    onToggle={() => handleToggleDropDown(program.id)}
                    onFirstClick={() => {
                      navigate(`/programs/programInfo/${program.id}`);
                    }}
                    onSecondClick={() => {setShowDeleteModal(true)}}
                  />
                </div>
                <div className="my-4">
                  <div className="flex items-center gap-2">
                    <CgNotes size={25} className=" text-mainColor" />
                    <p className="text-xl font-medium">
                      {program.courses_count} <span>{t("Course")}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 my-3">
                    <FaUserAlt size={25} className="fill-mainColor" />
                    <p className="text-xl font-medium">
                      {program.course_teachers_count}{" "}
                      <span>{t("instructor")}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <PiStudentBold size={25} className="fill-mainColor" />
                    <p className="text-xl font-medium">
                      {program.students_count} <span>{t("student")}</span>
                    </p>
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

        {showDeleteModal && (
          <MainPopup onClose={() => setShowDeleteModal(false)}>
            <div>
              <h2 className="text-2xl px-16 py-20 text-center">
                {t(
                  "the program will be deleted as well as all academic data associated with the program"
                )}
              </h2>
              <div className="flex justify-center gap-3 mb-4">
                <Button bordered>{t("confirm deletion")}</Button>
                <Button bordered className="px-[50px]">{t("cancel")}</Button>
              </div>
            </div>
          </MainPopup>
        )}

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
