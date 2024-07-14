import { Form, Formik } from "formik";
import { BaseInput, Button, DotsDropDown, MainPopup, Table } from "../..";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../UI/Loading";

const StudyScheduleFirstStep = ({ setSteps, setScheduleData, addTimeLecture }) => {
  const [activeButton, setActiveButton] = useState<any>({
    id: 1,
    day: "Saturday",
  });
  console.log("🚀 ~ StudyScheduleFirstStep ~ activeButton:", activeButton);

  const initialValues = {
    start_date: "",
    end_date: "",
    day: activeButton,
  };

  const fetchDatsData = async () => {
    const response = await customFetch(`/days`);
    return response;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["days_data"],
    queryFn: fetchDatsData,
  });

  const dayData = data?.data.data.days;
  console.log("🚀 ~ StudyScheduleFirstStep ~ dayData:", dayData);

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
            <div className="flex items-center gap-5">
              <FaRegEdit size={24} className="cursor-pointer fill-mainColor" />
              <RiDeleteBin5Line
                size={24}
                className="cursor-pointer fill-mainRed"
              />
            </div>
          );
        },
      },
    ],
    []
  );

  {
    isLoading && <Loading />;
  }

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold">
        {t("study schedule for artificial intelligence program")}
      </h2>

      <div className="bg-[#F9F9F9] p-4 my-5 rounded-2xl">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log("🚀 ~ StudyScheduleFirstStep ~ values:", values);
            setScheduleData(values);
          }}
        >
          {({ values }) => {
            useEffect(() => {
              setScheduleData(values);
            }, [values]);
            return (
              <Form>
                <div className="flex flex-col justify-between my-3 md:flex-row gap-y-4">
                  <p className="text-base font-semibold">
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
            );
          }}
        </Formik>
      </div>

      <div className="bg-[#F9F9F9] p-4 my-5 rounded-2xl flex justify-between flex-col sm:flex-row gap-y-5 items-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {dayData?.map((day) => (
            <Button
              key={day}
              className={`${
                activeButton.id === day.id
                  ? "bg-mainColor text-white"
                  : "bg-transparent text-mainGray"
              } px-3`}
              action={() => {
                setActiveButton({ id: day.id, day: day.day });
              }}
            >
              {day.day}
            </Button>
          ))}
        </div>

        <Button className="px-4 py-3" action={() => setSteps(4)}>
          {t("add lecture timing +")}
        </Button>
      </div>

      <Table data={studyScheduleData} columns={studyScheduleColumns} />

      <div className="flex items-center justify-end gap-5 mt-12">
        <Button action={() => {
          
          setSteps(2)
          }}>{t("Next")}</Button>
        <Button className="bg-mainRed">{t("cancel")}</Button>
      </div>
    </div>
  );
};

export default StudyScheduleFirstStep;
