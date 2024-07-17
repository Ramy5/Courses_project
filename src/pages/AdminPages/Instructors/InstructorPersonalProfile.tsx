import TitlePage from "../../../components/UI/TitlePage";
import ProfileCover from "../../../assets/instructors/profile-cover.svg";
import PersonalImage from "../../../assets/instructors/instructor_2.svg";
import { t } from "i18next";
import { DotsDropDown, ProfileIntroduction, Table } from "../../../components";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { GrView } from "react-icons/gr";
import InstructorSocialInformation from "../../../components/AdminComponent/Instructors/InstructorSocialInformation";
import { FaRegEdit } from "react-icons/fa";
import InstructorSpecialization from "../../../components/AdminComponent/Instructors/InstructorSpecialization";
import customFetch from "../../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";

export type InstructorPersonalData_TP = {
  profileCover?: string;
  personalImage?: string;
  instructorName?: string;
};

const InstructorPersonalProfile = () => {
  // const [selectAll, setSelectAll] = useState<Boolean>(false);
  // const [selectedRows, setSelectedRows] = useState<any>([]);
  const [openRow, setOpenRow] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchInstructorPersonal = async () => {
    const response = await customFetch(`/teacher/${id}`);
    return response;
  };

  const { data, isLoading, error, isRefetching, refetch } = useQuery({
    queryKey: ["instructor_personal"],
    queryFn: fetchInstructorPersonal,
  });

  const instructorPersonalData = data?.data.data.teacher || {};
  console.log(
    "🚀 ~ InstructorPersonalProfile ~ instructorPersonalData:",
    instructorPersonalData
  );

  useEffect(() => {
    if (error) {
      toast.error(`${error.message}`);
    }
  }, [error]);

  const deleteInstructor = async (instructorId) => {
    const response = await customFetch.delete(`/teacher/${instructorId}`);
    return response;
  };

  const { mutate } = useMutation({
    mutationKey: ["add-instructor-contact"],
    mutationFn: deleteInstructor,
    onSuccess: (data) => {
      queryClient.invalidateQueries("delete_instructor");
      toast.success(`${t("the instructor has been successfully deleted")}`);
      refetch();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0];
      toast.error(errorMessage);
    },
  });

  // const handleHeaderCheckboxClick = () => {
  //   const allCheckBoxes = document.querySelectorAll(
  //     'input[name="selectedItem"]'
  //   );
  //   allCheckBoxes.forEach((checkbox) => {
  //     checkbox.checked = !selectAll;
  //   });
  //   setSelectAll(!selectAll);
  // };

  // const handleCheckboxChange = (event: any, selectedRow: any) => {
  //   const checkboxId = event.target.id;
  //   if (event.target.checked) {
  //     setSelectedRows((prevSelectedItems: any) => [
  //       ...prevSelectedItems,
  //       selectedRow.row.original,
  //     ]);
  //   } else {
  //     setSelectedRows((prevSelectedItems: any) =>
  //       prevSelectedItems.filter((item: any) => item.id !== +checkboxId)
  //     );
  //   }
  // };

  const handleToggleDropDown = (id: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  };

  const instructorPersonalColumns = useMemo<ColumnDef<any>[]>(
    () => [
      // {
      //   header: () => {
      //     return (
      //       <input
      //         type="checkbox"
      //         className="w-5 h-5 cursor-pointer"
      //         id={crypto.randomUUID()}
      //         name="selectedItem"
      //         onClick={handleHeaderCheckboxClick}
      //       />
      //     );
      //   },
      //   accessorKey: "checkbox",
      //   cell: (info: any) => {
      //     return (
      //       <div className="flex items-center justify-center gap-4">
      //         <input
      //           type="checkbox"
      //           className="w-5 h-5 cursor-pointer"
      //           id={info.row.original.id}
      //           name="selectedItem"
      //           onClick={(event) => handleCheckboxChange(event, info)}
      //         />
      //       </div>
      //     );
      //   },
      // },
      {
        header: () => <span>{t("#")}</span>,
        accessorKey: "#",
        cell: (info) => info.row.index + 1,
      },
      {
        header: () => <span>{t("type of certificate")}</span>,
        accessorKey: "type_certificate",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("certificate name")}</span>,
        accessorKey: "certificate_name",
        cell: (info) => <span>{t(`${info.getValue()}`)}</span>,
      },
      {
        header: () => <span>{t("donor")}</span>,
        accessorKey: "donor",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("date of acquisition")}</span>,
        accessorKey: "date_acquisition",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("specialization")}</span>,
        accessorKey: "specialization",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("appreciation")}</span>,
        accessorKey: "appreciation",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "action",
        cell: (info) => {
          const rowIndex = info.row.index;
          const totalRows = info.table.getCoreRowModel().rows.length;
          return (
            <DotsDropDown
              firstName="edit"
              firstIcon={<FaRegEdit size={22} className="fill-mainColor" />}
              secondName="delete"
              secondIcon={
                <RiDeleteBin5Line size={22} className="fill-mainRed" />
              }
              isOpen={openRow == info.row.index}
              onToggle={() => handleToggleDropDown(info.row.index)}
              onFirstClick={() => {
                navigate(`/instructors/edit/${id}`, {
                  state: info.row.original,
                });
              }}
              onSecondClick={() => {}}
              isLastRow={rowIndex === totalRows - 1}
            />
          );
        },
      },
    ],
    [openRow]
  );

  if (isLoading || isRefetching) return <Loading />;

  return (
    <div>
      <div>
        <TitlePage
          mainTitle="instructors"
          supTitle={`${instructorPersonalData?.full_name}`}
          mainLink="/instructors"
        />
      </div>

      <div className="pb-2 bg-white rounded-2xl">
        <ProfileIntroduction
          personalData={instructorPersonalData}
          navigation="/instructors/edit/"
          blocking={true}
          deleteInstructor={() => mutate(instructorPersonalData.id)}
        />

        <InstructorSocialInformation personalData={instructorPersonalData} />

        <div className="bg-[#E6EAEE] rounded-2xl my-7 mx-5 py-6">
          <h2 className="mb-5 text-2xl font-semibold text-center ms-5 sm:text-start">
            {t("scientific certificates")}
          </h2>
          <Table
            data={instructorPersonalData?.certificates}
            columns={instructorPersonalColumns}
            className="bg-mainColor"
          />
        </div>

        <InstructorSpecialization
          personalData={
            instructorPersonalData?.qualifications &&
            instructorPersonalData?.qualifications[0]
          }
        />
      </div>
    </div>
  );
};

export default InstructorPersonalProfile;
