import { t } from "i18next";
import {
  BaseInput,
  Button,
  MainPopup,
  StudentPersonalContact,
  StudentPersonalContactWithOptionalIcon,
  Table,
  TitlePage,
} from "../../../components";
import { PiCertificate, PiMapPinLight, PiStudent } from "react-icons/pi";
import studentProfileCover from "../../../assets/students/studentProfileCover.svg";
import { HiOutlineIdentification } from "react-icons/hi";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdOutlineEmail, MdPeople } from "react-icons/md";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/helpers";
import Loading from "../../../components/UI/Loading";
import { useAppSelector } from "../../../hooks/reduxHooks";
import ProfileStudent from "./ProfileStudent";

const getStudentProfile = async (id: string) => {
  const response = await customFetch(`student/${id}`);
  return response.data;
};

const addNewReceipt = async (newReceipt: any) => {
  const data = customFetch.post("receiptStore", newReceipt);
  return data;
};



const deleteStudent = async (studentId: string) => {
  const data = customFetch.delete(`delete/${studentId}`);
  return data;
};

const StudentProfile = () => {
  const initialValues = {
    receipt_number: "",
    amount_paid: "",
    amount_date: "",
  };

  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const { id: studentProfileId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["show-student"],
    queryFn: () => getStudentProfile(studentProfileId),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-receipt"],
    mutationFn: addNewReceipt,
    onSuccess: (data: any) => {
      setShowReceiptModal(false);
      toast.success(t("the receipt added successfully"));
      queryClient.invalidateQueries("show-student");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error[0]?.receipt_number[0] ||
        error?.response?.data?.error[0]?.amount_paid[0] ||
        error?.response?.data?.error[0]?.amount_date[0];

      toast.error(errorMessage);
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["delete-student"],
    mutationFn: () => deleteStudent(studentProfileId),
    onSuccess: (data: any) => {
      toast.success(t("student has deleted successfully"));
      navigate("/students");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const {
    id = "",
    full_name = "",
    id_number = "",
    email = "",
    address = "",
    qualification = "",
    personal_image = "",
    academicData = {},
    parent = {},
    receipts = [],
    blocked_status = 0,
  } = data?.data?.student || {};

  const studentProfileData = {
    id: id,
    full_name: full_name,
    profileCover: studentProfileCover,
    personal_image: personal_image,
    phoneNumber: "+009735625632",
    blocked_status: blocked_status,
  };

  const studentAcademicData = [
    {
      title: t("academic number"),
      value: academicData?.Academic_code,
    },
    {
      title: t("program"),
      value: academicData?.program?.specialization,
    },
    {
      title: t("level"),
      value: academicData?.program?.academic_levels,
    },
    {
      title: t("date of enrollment"),
      value: academicData?.joined_date,
    },
    {
      title: t("section number"),
      value: academicData?.group,
    },
    {
      title: t("educational qualification"),
      value: academicData?.program?.program_name,
    },
  ];

  const receiptColumn = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        header: () => <span>{t("amount paid")}</span>,
        accessorKey: "price",
        cell: (info) => `${info.getValue()}$`,
      },
      {
        header: () => <span>{t("amount deserved")}</span>,
        accessorKey: "amountDeserved",
        cell: (info) => `${1000}$`,
      },
      {
        header: () => <span>{t("date")}</span>,
        accessorKey: "receipt_date",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("receipt number")}</span>,
        accessorKey: "receipt_num",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const handleAddNewReceipt = async (values: any) => {
    const newReceipt = {
      student_id: +studentProfileId,
      price: +values.amount_paid,
      receipt_date: formatDate(values.amount_date),
      receipt_num: +values.receipt_number,
    };

    await mutate(newReceipt);
  };

  if (isRefetching || isLoading || isFetching) return <Loading />;

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {}}>
      {({ values, setFieldValue }) => {
        return (
          <Form>
            <div>
              <TitlePage
                mainTitle={t("students data")}
                supTitle={full_name}
                mainLink="/students"
                icon={
                  <PiStudent size={28} className="font-bold fill-mainColor" />
                }
              />
            </div>

            <div className="bg-white rounded-xl">
              {/* CONTENT HEADER */}
              <ProfileStudent
                personalData={studentProfileData}
                navigation="/instructors/edit/"
                blocking={true}
                deleteStudent={() => deleteMutate(studentProfileData.id)}
              />

              <div className="flex flex-col gap-10 p-4 pt-0 lg:p-8 my-20">
                {/* PERSONAL DETAILS */}
                <div className="p-6 lg:p-10 bg-mainColor/15 rounded-xl">
                  <div className="grid items-center gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
                    <StudentPersonalContact
                      contactTitle={t("address")}
                      contactValue={address}
                      icon={<PiMapPinLight size={30} />}
                    />
                    <StudentPersonalContact
                      contactTitle={t("phone")}
                      contactValue={studentProfileData.phoneNumber}
                      icon={<IoMdPhonePortrait size={30} />}
                    />
                    <StudentPersonalContact
                      contactTitle={t("email")}
                      contactValue={email}
                      icon={<MdOutlineEmail size={30} />}
                    />
                    <StudentPersonalContactWithOptionalIcon
                      contactTitle={t("id number")}
                      contactValue={id_number}
                      icon={
                        <HiOutlineIdentification
                          className="text-mainColor"
                          size={30}
                        />
                      }
                    />
                    <StudentPersonalContactWithOptionalIcon
                      contactTitle={t("educational qualification")}
                      contactValue={qualification}
                      icon={
                        <PiCertificate className="text-mainColor" size={30} />
                      }
                    />
                  </div>
                </div>

                {/* ACADEMIC DETAILS */}
                <div className="p-6 lg:p-10 bg-lightGray rounded-xl">
                  <h2 className="mb-10 text-2xl font-bold">
                    {t("academic data")}
                  </h2>

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
                <div className="p-6 lg:p-10 bg-lightGray rounded-xl">
                  <h2 className="mb-10 text-2xl font-bold">
                    {t("father data")}
                  </h2>

                  <div className="grid items-center gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
                    <StudentPersonalContact
                      contactTitle={t("name")}
                      contactValue={parent?.full_name}
                      icon={<MdPeople size={30} />}
                    />
                    <StudentPersonalContact
                      contactTitle={t("phone")}
                      contactValue={parent?.phone}
                      icon={<IoMdPhonePortrait size={30} />}
                    />
                    <StudentPersonalContact
                      contactTitle={t("email")}
                      contactValue={parent?.email}
                      icon={<MdOutlineEmail size={30} />}
                    />
                  </div>
                </div>

                {/* ADD A RECEIPT */}
                <div className="flex flex-col p-10 bg-lightGray rounded-xl">
                  <Button
                    action={() => setShowReceiptModal(true)}
                    className="self-end mb-6"
                  >
                    {t("+ add a receipt")}
                  </Button>

                  <Table
                    className={"bg-mainColor/90"}
                    data={receipts || []}
                    columns={receiptColumn}
                  />
                </div>
              </div>
            </div>
            {showReceiptModal && (
              <MainPopup onClose={() => setShowReceiptModal(false)}>
                <h2 className="mb-4 text-2xl font-bold lg:mb-8">
                  {t("payment receipt")}
                </h2>
                <div className="grid items-center gap-4 my-8 lg:grid-cols-view">
                  <p className="text-xl w-36">{t("receipt number")}</p>
                  <BaseInput
                    name="receipt_number"
                    id="receipt_number"
                    className="text-gray-700 lg:w-1/2"
                  />
                </div>
                <div className="grid items-center gap-4 my-8 lg:grid-cols-view">
                  <p className="text-xl w-36">{t("amount paid")}</p>
                  <BaseInput
                    name="amount_paid"
                    id="amount_paid"
                    className="text-gray-700 lg:w-1/2"
                  />
                </div>
                <div className="grid items-center gap-4 my-8 lg:grid-cols-view">
                  <p className="text-xl w-36">{t("amount date")}</p>
                  <input
                    type="date"
                    name="amount_date"
                    id="amount_date"
                    className="text-gray-700 lg:w-1/2"
                    onChange={(e) =>
                      setFieldValue("amount_date", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center justify-end gap-8 mt-12">
                  <Button
                    className="bg-white text-mainColor"
                    loading={isPending}
                    action={() => handleAddNewReceipt(values)}
                  >
                    {t("confirm")}
                  </Button>
                </div>
              </MainPopup>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default StudentProfile;