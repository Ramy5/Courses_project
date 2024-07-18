import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  DotsDropDown,
  ProfileIntroduction,
  Table,
  TitlePage,
} from "../../components";
import { FaRegEdit } from "react-icons/fa";
import { t } from "i18next";
import { GrView } from "react-icons/gr";
import InstructorSocialInformation from "../../components/AdminComponent/Instructors/InstructorSocialInformation";
import InstructorSpecialization from "../../components/AdminComponent/Instructors/InstructorSpecialization";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import Loading from "../../components/UI/Loading";

const InstructorProfile = () => {
  // const [selectAll, setSelectAll] = useState<Boolean>(false);
  // const [selectedRows, setSelectedRows] = useState<any>([]);
  const [openRow, setOpenRow] = useState<number | null>(null);

  const fetchInstructorProfile = async () => {
    const response = await customFetch(`profile`);
    return response;
  };

  const { data, isLoading, error, isRefetching, refetch } = useQuery({
    queryKey: ["instructor_profile"],
    queryFn: fetchInstructorProfile,
  });
  console.log("🚀 ~ InstructorProfile ~ data:", data);

  const instructorPersonalData = data?.data.data.teacher || {};

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

  // const handleToggleDropDown = (id: number) => {
  //   setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  // };

  const certificatesColumnsFee = useMemo<ColumnDef<any>[]>(
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
      // {
      //   header: () => <span>{t("")}</span>,
      //   accessorKey: "action",
      //   cell: (info) => {
      //     const rowIndex = info.row.index;
      //     const totalRows = info.table.getCoreRowModel().rows.length;
      //     return (
      //       <DotsDropDown
      //         instructorRoute=""
      //         instructorId={info.row.original.id}
      //         firstName="view course description"
      //         firstIcon={<GrView size={22} className="fill-mainColor" />}
      //         secondName="edit course description"
      //         secondIcon={<FaRegEdit size={22} className="fill-mainColor" />}
      //         isOpen={openRow == info.row.original.id}
      //         onToggle={() => handleToggleDropDown(info.row.original.id)}
      //         isLastRow={rowIndex === totalRows - 1}
      //       />
      //     );
      //   },
      // },
    ],
    [openRow]
  );

  if (isLoading || isRefetching) return <Loading />;

  return (
    <div>
      <div>
        {/* <TitlePage
          mainTitle="instructors"
          supTitle={instructorPersonalData?.full_name}
          mainLink="/instructors"
        /> */}
        <h2 className="text-2xl font-semibold text-mainGray opacity-90 mb-4">
          {t("instructors")}
        </h2>
      </div>

      <div className="pb-2 bg-white rounded-2xl">
        <ProfileIntroduction personalData={instructorPersonalData} />

        <InstructorSocialInformation personalData={instructorPersonalData} />

        <div className="bg-[#E6EAEE] rounded-2xl my-7 mx-5 py-6">
          <h2 className="mb-5 text-2xl font-semibold text-center ms-5 sm:text-start">
            {t("scientific certificates")}
          </h2>
          <Table
            data={instructorPersonalData?.certificates}
            columns={certificatesColumnsFee}
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

export default InstructorProfile;
