import { useMemo, useState } from "react";
import {
  DotsDropDown,
  ProfileIntroduction,
  StudentPersonalContact,
  StudentPersonalContactWithOptionalIcon,
} from "../../components";
import { MdOutlineEmail, MdPeople } from "react-icons/md";
import studentProfileCover from "../../assets/students/studentProfileCover.svg";
import studentProfileImg from "../../assets/students/studentProfileImg.svg";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { GrView } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { IoMdPhonePortrait } from "react-icons/io";
import { PiCertificate, PiMapPinLight } from "react-icons/pi";

const PersonlyProfile = () => {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [openRow, setOpenRow] = useState<number | null>(null);

  const studentProfileData = {
    id: 1,
    profileCover: studentProfileCover,
    personalImage: studentProfileImg,
    name: "معاذ ادم",
    phoneNumber: "+009735625632",
    email: "Albert Adam@gmail.com",
    address: "123,المنصورة الجديدة",
    idNumber: "2394894757",
    educationalQualification: "الثانوية العامه",
    fatherName: "adam",
    fatherPhone: "+3435465543",
    fatherEmail: "albertadam@gmail.com",
  };

  const studentAcademicData = [
    {
      title: t("academic number"),
      value: "123456789012",
    },
    {
      title: t("program"),
      value: "Software Engineering",
    },
    {
      title: t("level"),
      value: "4",
    },
    {
      title: t("date of enrollment"),
      value: "01/09/2022",
    },
    {
      title: t("section number"),
      value: "2",
    },
    {
      title: t("educational qualification"),
      value: "درجة البكالوريوس في علوم الكمبيوتر",
    },
  ];

  const studentsDataFee = [
    {
      index: 1,
      id: 1,
      type_certificate: "بكالروريوس",
      certificate_name: "حاسبات ومعلومات",
      donor: "معد مصر",
      date_acquisition: "25/3/2001",
      specialization: "علوم الحاسب",
      appreciation: "جيد جدا",
    },
    {
      index: 2,
      id: 2,
      type_certificate: "بكالروريوس",
      certificate_name: "حاسبات ومعلومات",
      donor: "معد مصر",
      date_acquisition: "25/3/2001",
      specialization: "علوم الحاسب",
      appreciation: "جيد جدا",
    },
  ];

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

  const studentsColumnsFee = useMemo<ColumnDef<any>[]>(
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
              instructorRoute=""
              instructorId={info.row.original.id}
              firstName="view course description"
              firstIcon={<GrView size={22} className="fill-mainColor" />}
              secondName="edit course description"
              secondIcon={<FaRegEdit size={22} className="fill-mainColor" />}
              isOpen={openRow == info.row.original.id}
              onToggle={() => handleToggleDropDown(info.row.original.id)}
              isLastRow={rowIndex === totalRows - 1}
            />
          );
        },
      },
    ],
    [openRow]
  );

  return (
    <div>
      <div className="pb-2 bg-white rounded-2xl">
        <ProfileIntroduction
          personalData={studentProfileData}
          blocking={false}
        />
        {/* 
        <div className="px-8 py-6 mx-5 bg-mainBg rounded-2xl mt-28">
          <div className="flex flex-col items-center justify-between md:flex-row gap-y-5">
            <div className="flex flex-col items-center gap-2 text-center lg:flex-row lg:text-start lg:items-start">
              <div
                className="w-[50px] h-[50px] rounded-full bg-mainColor flex items-center justify-center "
                style={{ boxShadow: "0px 4px 4px 0px #00000080" }}
              >
                <MdPhoneIphone size={26} className="fill-white" />
              </div>
              <div className="mt-[6px] lg:mt-3 font-medium">
                <p className="text-mainGray">{t("phone")}</p>
                <span>{studentProfileData.phoneNumber}</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center lg:flex-row lg:text-start lg:items-start">
              <div
                className="w-[50px] h-[50px] rounded-full bg-mainColor text-white flex items-center justify-center"
                style={{ boxShadow: "0px 4px 4px 0px #00000080" }}
              >
                <HiOutlineMail size={26} />
              </div>
              <div className="mt-[6px] lg:mt-3 font-medium">
                <p className="text-mainGray">{t("E-mail")}</p>
                <span>{studentProfileData.emial}</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center lg:flex-row lg:text-start lg:items-start">
              <div
                className="w-[50px] h-[50px] rounded-full bg-mainColor text-white flex items-center justify-center"
                style={{ boxShadow: "0px 4px 4px 0px #00000080" }}
              >
                <IoLocationOutline size={26} />
              </div>
              <div className="mt-[6px] lg:mt-3 font-medium">
                <p className="text-mainGray">{t("address")}</p>
                <span>{studentProfileData.address}</span>
              </div>
            </div>
          </div>
            <div>

            </div>
        </div> */}

        <div className="flex flex-col gap-10 p-4 pt-0 lg:p-8 mt-24">
          {/* PERSONAL DETAILS */}
          <div className="p-6 lg:p-10 bg-mainColor/15 rounded-xl">
            <div className="grid items-center gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
              <StudentPersonalContact
                contactTitle={t("address")}
                contactValue={studentProfileData.address}
                icon={<PiMapPinLight size={30} />}
              />
              <StudentPersonalContact
                contactTitle={t("phone")}
                contactValue={studentProfileData.phoneNumber}
                icon={<IoMdPhonePortrait size={30} />}
              />
              <StudentPersonalContact
                contactTitle={t("email")}
                contactValue={studentProfileData.email}
                icon={<MdOutlineEmail size={30} />}
              />
              <StudentPersonalContactWithOptionalIcon
                contactTitle={t("id number")}
                contactValue={studentProfileData.idNumber}
                icon={
                  <HiOutlineIdentification
                    className="text-mainColor"
                    size={30}
                  />
                }
              />
              <StudentPersonalContactWithOptionalIcon
                contactTitle={t("educational qualification")}
                contactValue={studentProfileData.educationalQualification}
                icon={<PiCertificate className="text-mainColor" size={30} />}
              />
            </div>
          </div>

          {/* ACADEMIC DETAILS */}
          <div className="p-6 lg:p-10 bg-mainColor/15 rounded-xl">
            <h2 className="mb-10 text-2xl font-bold">{t("academic data")}</h2>

            <div className="grid items-center gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
              {studentAcademicData.map((item, index) => (
                <StudentPersonalContactWithOptionalIcon
                  key={index}
                  contactTitle={item.title}
                  contactValue={item.value}
                />
              ))}
            </div>
          </div>

          {/* FATHER  DETAILS */}
          <div className="p-6 lg:p-10 bg-mainColor/15 rounded-xl">
            <h2 className="mb-10 text-2xl font-bold">{t("father data")}</h2>

            <div className="grid items-center gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
              <StudentPersonalContact
                contactTitle={t("name")}
                contactValue={studentProfileData.fatherName}
                icon={<MdPeople size={30} />}
              />
              <StudentPersonalContact
                contactTitle={t("phone")}
                contactValue={studentProfileData.fatherPhone}
                icon={<IoMdPhonePortrait size={30} />}
              />
              <StudentPersonalContact
                contactTitle={t("email")}
                contactValue={studentProfileData.fatherEmail}
                icon={<MdOutlineEmail size={30} />}
              />
            </div>
          </div>

          {/* ADD A RECEIPT */}
          {/* <div className="flex flex-col p-10 bg-mainColor/15 rounded-xl">
                  <Button
                    action={() => setShowReceiptModal(true)}
                    className="self-end mb-6"
                  >
                    {t("+ add a receipt")}
                  </Button>

                  <Table
                    className={"bg-mainColor/90"}
                    data={receiptData || []}
                    columns={receiptColumn}
                  />
                </div> */}
        </div>
      </div>
    </div>
  );
};

export default PersonlyProfile;
