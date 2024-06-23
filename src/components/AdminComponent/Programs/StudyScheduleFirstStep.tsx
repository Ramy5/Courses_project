import { Form, Formik } from "formik";
import { BaseInput, Button, DotsDropDown, Table } from "../..";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const StudyScheduleFirstStep = ({ setSteps }: any) => {
  const [activeButton, setActiveButton] = useState<string>("saturday");
  const navigate = useNavigate();

  const initialValues = {
    start_date: "",
    end_date: "",
  };

  const days = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

  const studyScheduleData = [
    {
      id: 1,
      course: "ذكاء اصطناعي",
      level: "3",
      section: "شعبة - 2",
      instructor: "محمد احمد خضر",
      start_date: "8م",
      end_date: "10م",
    },
    {
      id: 2,
      course: "ذكاء اصطناعي",
      level: "3",
      section: "شعبة - 2",
      instructor: "محمد احمد خضر",
      start_date: "8م",
      end_date: "10م",
    },
  ];

  const studyScheduleColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("course")}</span>,
        accessorKey: "course",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("level")}</span>,
        accessorKey: "level",
        cell: (info) => <span>{t(`${info.getValue()}`)}</span>,
      },
      {
        header: () => <span>{t("section")}</span>,
        accessorKey: "section",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("instructor")}</span>,
        accessorKey: "instructor",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("start date")}</span>,
        accessorKey: "start_date",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("end date")}</span>,
        accessorKey: "end_date",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "action",
        cell: (info) => {
          return (
            <div className="flex gap-5 items-center">
              <FaRegEdit size={24} className="fill-mainColor cursor-pointer" />
              <RiDeleteBin5Line
                size={24}
                className="fill-mainRed cursor-pointer"
              />
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="mt-12">
      <h2 className="font-semibold text-xl">
        {t("study schedule for artificial intelligence program")}
      </h2>

      <div className="bg-[#F9F9F9] p-4 my-5 rounded-2xl">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log("🚀 ~ StudyScheduleFirstStep ~ values:", values);
          }}
        >
          <Form>
            <div className="flex justify-between flex-col md:flex-row my-3 gap-y-4">
              <p className="font-semibold text-base">
                {t("current academic period")}
              </p>
              <BaseInput
                name="start_date"
                id="start_date"
                type="date"
                label={t("start date")}
                className="w-full text-lg py-1 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("")}
                labelProps="font-semibold text-base"
              />
              <BaseInput
                name="end_date"
                id="end_date"
                type="date"
                label={t("end date")}
                className="w-full text-lg py-1 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("")}
                labelProps="font-semibold text-base"
              />
            </div>
          </Form>
        </Formik>
      </div>

      <div className="bg-[#F9F9F9] p-4 my-5 rounded-2xl flex justify-between flex-col sm:flex-row gap-y-5 items-center">
        <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {days.map((day) => (
            <Button
              key={day}
              className={`${
                activeButton === day
                  ? "bg-mainColor text-white"
                  : "bg-transparent text-mainGray"
              } px-3`}
              action={() => setActiveButton(day)}
            >
              {t(day)}
            </Button>
          ))}
        </div>

        <Button className="px-4 py-3" action={() => (navigate("/programs/LectureTime"))}>{t("add lecture timing +")}</Button>
      </div>

      <Table data={studyScheduleData} columns={studyScheduleColumns} />

      <div className="mt-12 flex items-center justify-end gap-5">
        <Button action={() => setSteps(2)}>{t("Next")}</Button>
        <Button className="bg-mainRed">{t("cancel")}</Button>
      </div>
    </div>
  );
};

export default StudyScheduleFirstStep;
