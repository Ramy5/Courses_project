import { Form, Formik } from "formik";
import { BaseInput, Button, Table } from "../..";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../UI/Loading";
import { useNavigate } from "react-router-dom";

const StudyScheduleFirstStep = ({
  setSteps,
  setScheduleData,
  scheduleData,
  setEditStudySchedule,
}) => {
  const [activeButton, setActiveButton] = useState<any>(
    JSON.parse(localStorage.getItem("day")) || {
      id: 1,
      day: "Saturday",
    }
  );
  const navigate = useNavigate();
  console.log("🚀 ~ activeButton:", activeButton);

  const initialValues = {
    start_date: "",
    end_date: "",
    day: activeButton,
  };

  const fetchDaysData = async () => {
    const response = await customFetch(`/days`);
    return response;
  };

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["days_data"],
    queryFn: fetchDaysData,
  });

  const dayData = data?.data.data.days;

  const studyScheduleColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("course")}</span>,
        accessorKey: "course_name",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("level")}</span>,
        accessorKey: "level",
        cell: (info) => <span>{t(`${info.getValue()}`)}</span>,
      },
      {
        header: () => <span>{t("branch")}</span>,
        accessorKey: "group_name",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("instructor")}</span>,
        accessorKey: "teacher_name",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("start time")}</span>,
        accessorKey: "start_time",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("end time")}</span>,
        accessorKey: "end_time",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "action",
        cell: (info) => {
          console.log("🚀 ~ info.row.original.day_id:", info.row.original);

          return (
            <div className="flex items-center gap-5">
              <FaRegEdit
                size={24}
                className="cursor-pointer fill-mainColor"
                onClick={() => {
                  setEditStudySchedule(info.row.original);
                  setSteps(4);
                }}
              />
              <RiDeleteBin5Line
                size={24}
                className="cursor-pointer fill-mainRed"
                onClick={() => {
                  const scheduleTableFilter =
                    scheduleData?.lecture_time?.filter((data: any) => {
                      return data.id != info.row.original.id;
                    });
                  setScheduleData({
                    ...scheduleData,
                    lecture_time: scheduleTableFilter,
                  });
                }}
              />
            </div>
          );
        },
      },
    ],
    [scheduleData]
  );

  useEffect(() => {
    setScheduleData((prevState) => ({
      ...prevState,
      day: activeButton,
    }));
  }, [activeButton]);

  const filterScheduleTable = scheduleData?.lecture_time?.filter(
    (item) => item.day_id === activeButton.id
  );

  {
    isLoading || (isRefetching && <Loading />);
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
          {({ values, setFieldValue }) => {
            // useEffect(() => {
            //   setScheduleData(values);
            // }, [values.start_date || values.end_date]);
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
                    value={scheduleData?.start_date}
                    labelProps="font-semibold text-base"
                    onChange={(e) => {
                      setScheduleData((prevState) => ({
                        ...prevState,
                        start_date: e.target.value,
                      }));
                    }}
                  />
                  <BaseInput
                    name="end_date"
                    id="end_date"
                    type="date"
                    label={t("end date")}
                    className="w-full text-lg py-1 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                    placeholder={t("")}
                    value={scheduleData?.end_date}
                    labelProps="font-semibold text-base"
                    onChange={(e) => {
                      setScheduleData((prevState) => ({
                        ...prevState,
                        end_date: e.target.value,
                      }));
                    }}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>

      <div className="bg-[#F9F9F9] p-4 my-5 rounded-2xl flex justify-between flex-col sm:flex-row gap-y-5 items-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {dayData?.map((item) => (
            <Button
              key={item}
              className={`${
                activeButton.id === item.id
                  ? "bg-mainColor text-white"
                  : "bg-transparent text-mainGray"
              } px-3`}
              action={() => {
                setActiveButton({ id: item.id, day: item.day });
                setScheduleData((prevState) => ({
                  ...prevState,
                  day: { id: item.id, day: item.day },
                }));
                localStorage.setItem(
                  "day",
                  JSON.stringify({ id: item.id, day: item.day })
                );
              }}
            >
              {item.day}
            </Button>
          ))}
        </div>

        <Button className="px-4 py-3" action={() => setSteps(4)}>
          {t("add lecture timing +")}
        </Button>
      </div>

      {filterScheduleTable?.length ? (
        <Table data={filterScheduleTable} columns={studyScheduleColumns} />
      ) : (
        ""
      )}

      <div className="flex items-center justify-end gap-5 mt-12">
        <Button action={() => setSteps(2)}>{t("next")}</Button>
        <Button className="bg-mainRed" action={() => navigate(-1)}>
          {t("cancel")}
        </Button>
      </div>
    </div>
  );
};

export default StudyScheduleFirstStep;
