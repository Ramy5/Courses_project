import { t } from "i18next";
import { Button, DotsDropDown, Table, TitlePage } from "../../../components";
import { FaFolder, FaUserAlt } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { PiStudentBold } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { GrView } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { toast } from "react-toastify";
import Loading from "../../../components/UI/Loading";

const ProgramInformation = () => {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const navigate = useNavigate();
  const { id: programParamID } = useParams();

  const handleToggleDropDown = (id: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  };

  const fetchProgramData = async () => {
    const response = await customFetch(`/program/${programParamID}`);
    return response;
  };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["program_data"],
    queryFn: fetchProgramData,
  });

  const programData = data?.data?.data || {};

  useEffect(() => {
    if (error) {
      toast.error(`${error.message}`);
    }
  }, [error]);

  const coursesColumnsFee = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("course code")}</span>,
        accessorKey: "course_code",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("course name")}</span>,
        accessorKey: "course_name",
        cell: (info) => <span>{t(`${info.getValue()}`)}</span>,
      },
      {
        header: () => <span>{t("level")}</span>,
        accessorKey: "level",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "action",
        cell: (info) => {
          const rowIndex = info.row.index;
          const totalRows = info.table.getCoreRowModel().rows.length;
          const editData = { ...info.row.original, programData };
          return (
            <DotsDropDown
              instructorRoute="/programs/courseDescription"
              instructorId={info.row.original.id}
              firstName="view course description"
              firstIcon={<GrView size={22} className="fill-mainColor" />}
              secondName="edit course description"
              secondIcon={<FaRegEdit size={22} className="fill-mainColor" />}
              isOpen={openRow == info.row.original.id}
              onToggle={() => handleToggleDropDown(info.row.original.id)}
              onFirstClick={() => {
                navigate(`/programs/courseDescription/${info.row.original.id}`);
              }}
              onSecondClick={() => {
                navigate("/programs/create", { state: info.row.original });
              }}
              isLastRow={rowIndex === totalRows - 1}
            />
          );
        },
      },
    ],
    [openRow]
  );

  if (isLoading || isFetching) return <Loading />;

  return (
    <div>
      <TitlePage
        mainTitle="Programs"
        mainLink="/programs"
        supTitle={`${t("Program")} ${programData.program_name}`}
        icon={<FaFolder size={28} className="fill-mainColor" />}
      />

      <div className="p-5 bg-white rounded-2xl">
        <div className="p-5 bg-lightGray rounded-2xl">
          <div className="w-full mb-6 text-center">
            <span className="font-medium">{programData.program_type === "educational" ? `${t("Study program")}` : `${t("training program")}`}</span>
            <h2 className="text-3xl font-semibold text-mainColor">
              {programData.program_name}
            </h2>
            <span className="font-medium">{programData.program_code}</span>
            <p className="font-medium">
              {t("time period :")} {programData.start_date} -{" "}
              {programData.end_date}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-semibold text-mainColor">
              {t("vision")}
            </h2>
            <p className="text-2xl font-medium">{programData.vision}</p>
          </div>

          <div className="my-6">
            <h2 className="mb-2 text-2xl font-semibold text-mainColor">
              {t("message")}
            </h2>
            <p className="text-2xl font-medium">{programData.message}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="border-e-0 md:border-e-[3px] border-mainColor text-center md:text-start mb-5">
              <h2 className="text-2xl font-semibold text-mainColor">
                {t("distribution of program estimates (%)")}
              </h2>
              <ul className="mt-5 text-xl font-semibold list-disc list-inside">
                <li className="grid grid-cols-2">
                  <div className="flex items-center gap-3">
                    <GoDotFill size={25} className="fill-mainColor" />
                    <p>{t("excellent")}</p>
                  </div>
                  <p>{programData.excellence}</p>
                </li>
                <li className="grid grid-cols-2 my-3">
                  <div className="flex items-center gap-3">
                    <GoDotFill size={25} className="fill-mainColor" />
                    <p>{t("very good")}</p>
                  </div>
                  <p>{programData.very_good}</p>
                </li>
                <li className="grid grid-cols-2">
                  <div className="flex items-center gap-3">
                    <GoDotFill size={25} className="fill-mainColor" />
                    <p>{t("good")}</p>
                  </div>
                  <p>{programData.good}</p>
                </li>
                <li className="grid grid-cols-2 my-3">
                  <div className="flex items-center gap-3">
                    <GoDotFill size={25} className="fill-mainColor" />
                    <p>{t("acceptable")}</p>
                  </div>
                  <p>{programData.acceptable}</p>
                </li>
              </ul>
            </div>
            <div className="mb-5 mx-auto">
              <h2 className="text-2xl font-semibold text-mainColor">
                {t("statistics")}
              </h2>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-8">
                  <CgNotes size={25} className=" text-mainColor" />
                </div>
                <p className="text-xl font-medium">
                  {programData.courses_count} <span>{t("Course")}</span>
                </p>
              </div>
              <div className="flex items-center gap-3 my-4">
                <div className="w-8">
                  <FaUserAlt size={25} className="fill-mainColor" />
                </div>
                <p className="text-xl font-medium">
                  {programData.course_teachers_count}{" "}
                  <span>{t("instructor")}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8">
                  <PiStudentBold size={28} className="fill-mainColor" />
                </div>
                <p className="text-xl font-medium">
                  {programData.students_count} <span>{t("student")}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-4 md:grid-cols-2">
            <div className="text-center md:text-start">
              <h2 className="text-2xl font-semibold text-center text-mainColor md:text-start">
                {t("number academic levels")}
              </h2>
              <p className="mt-3 text-xl font-semibold ms-0 md:ms-16">
                {programData.academic_levels}
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-mainColor">
                {t("number classes")}
              </h2>
              <p className="mt-3 text-xl font-semibold text-center">
                {programData.number_classes}
              </p>
            </div>
          </div>
        </div>

        <div className="py-6 bg-lightGray rounded-2xl mt-7">
          <div className="flex items-center justify-between px-5 mb-6">
            <h2 className="text-2xl font-semibold text-center sm:text-start">
              {t("Courses")}
            </h2>
            <Button
              action={() =>
                navigate("/programs/create", {
                  state: { program_id: programData?.id },
                })
              }
            >
              {t("add")}
            </Button>
          </div>
          <Table
            data={programData?.courses}
            columns={coursesColumnsFee}
            className="bg-mainColor"
          />
        </div>
      </div>
    </div>
  );
};

export default ProgramInformation;
