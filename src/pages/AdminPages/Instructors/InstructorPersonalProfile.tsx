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
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";
import { useNavigate, useParams } from "react-router-dom";

export type InstructorPersonalData_TP = {
  profileCover?: string;
  personalImage?: string;
  instructorName?: string;
};

const InstructorPersonalProfile = () => {
  const [selectAll, setSelectAll] = useState<Boolean>(false);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [openRow, setOpenRow] = useState<number | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // const instructorPersonalData = {
  //   id: 1,
  //   profileCover: ProfileCover,
  //   personalImage: PersonalImage,
  //   name: "Dimitres Viga",
  //   jobTitle: "محاضر شبكات",
  //   phoneNumber: "+009735625632",
  //   emial: "Albert Adam@gmail.com",
  //   address: "123,المنصورة الجديدة",
  //   linkedIn: "user@example.com",
  //   facebook: "user@example.com",
  //   whatsapp: "+009759568548",
  //   twitter: "user@example.com",
  // };

  const fetchInstructorPersonal = async () => {
    const response = await customFetch(`/teacher/${id}`);
    return response;
  };

  const { data, isLoading, error, isRefetching } = useQuery({
    queryKey: ["instructor_personal"],
    queryFn: fetchInstructorPersonal,
  });

  const instructorPersonalData = data?.data.data.teacher || {};

  useEffect(() => {
    if (error) {
      toast.error(`${error.message}`);
    }
  }, [error]);

  // const studentsDataFee = [
  //   {
  //     index: 1,
  //     id: 1,
  //     type_certificate: "بكالروريوس",
  //     certificate_name: "حاسبات ومعلومات",
  //     donor: "معد مصر",
  //     date_acquisition: "25/3/2001",
  //     specialization: "علوم الحاسب",
  //     appreciation: "جيد جدا",
  //   },
  //   {
  //     index: 2,
  //     id: 2,
  //     type_certificate: "بكالروريوس",
  //     certificate_name: "حاسبات ومعلومات",
  //     donor: "معد مصر",
  //     date_acquisition: "25/3/2001",
  //     specialization: "علوم الحاسب",
  //     appreciation: "جيد جدا",
  //   },
  // ];

  const handleHeaderCheckboxClick = () => {
    const allCheckBoxes = document.querySelectorAll(
      'input[name="selectedItem"]'
    );
    allCheckBoxes.forEach((checkbox) => {
      checkbox.checked = !selectAll;
    });
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (event: any, selectedRow: any) => {
    const checkboxId = event.target.id;
    if (event.target.checked) {
      setSelectedRows((prevSelectedItems: any) => [
        ...prevSelectedItems,
        selectedRow.row.original,
      ]);
    } else {
      setSelectedRows((prevSelectedItems: any) =>
        prevSelectedItems.filter((item: any) => item.id !== +checkboxId)
      );
    }
  };

  const handleToggleDropDown = (id: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  };

  const instructorPersonalColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => {
          return (
            <input
              type="checkbox"
              className="w-5 h-5 cursor-pointer"
              id={crypto.randomUUID()}
              name="selectedItem"
              onClick={handleHeaderCheckboxClick}
            />
          );
        },
        accessorKey: "checkbox",
        cell: (info: any) => {
          return (
            <div className="flex items-center justify-center gap-4">
              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer"
                id={info.row.original.id}
                name="selectedItem"
                onClick={(event) => handleCheckboxChange(event, info)}
              />
            </div>
          );
        },
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
              firstName="view course description"
              firstIcon={<GrView size={22} className="fill-mainColor" />}
              secondName="edit course description"
              secondIcon={<FaRegEdit size={22} className="fill-mainColor" />}
              isOpen={openRow == info.row.index}
              onToggle={() => handleToggleDropDown(info.row.index)}
              onFirstClick={() => {}}
              onSecondClick={() => {
                navigate(`/instructors/edit/${id}`);
              }}
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
          blocking={true}
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
