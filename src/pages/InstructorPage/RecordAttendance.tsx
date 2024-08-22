import { useEffect, useMemo, useState } from "react";
import { t } from "i18next";
import { ColumnDef } from "@tanstack/react-table";
import { Button, Table } from "../../components";
import { Form, Formik } from "formik";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import customFetch from "../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/UI/Loading";
import { formatDate } from "../../utils/helpers";
import { toast } from "react-toastify";
import BaseSelect from "../../components/UI/BaseSelect";

const postAttendance = async (newAttendance: any) => {
  const data = customFetch.post("/courseAttendance", newAttendance);
  return data;
};

const RecordAttendance = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [coursesSelect, setCoursesSelect] = useState(null);
  console.log("🚀 ~ RecordAttendance ~ coursesSelect:", coursesSelect);
  const [dateSelect, setDateSelect] = useState(null);
  console.log("🚀 ~ RecordAttendance ~ dateSelect:", dateSelect)
  // const formatDates = formatDate(dateSelect);
  const queryClient = useQueryClient();

  const initialValues = {
    Courses: "",
    lecture_date: "",
  };

  const handleCheckboxChange = (event, selectedRow) => {
    const checkboxId = selectedRow.row.original.id;
    setSelectedRows((prevSelectedItems) => {
      const isAlreadySelected = prevSelectedItems.some(
        (item) => item.id === checkboxId
      );

      if (isAlreadySelected) {
        return prevSelectedItems.filter((item) => item.id !== checkboxId);
      } else {
        return [...prevSelectedItems, selectedRow.row.original];
      }
    });
  };

  const isRowSelected = (id) => {
    return selectedRows.some((row) => row.id === id);
  };

  const fetchCoursesData = async () => {
    const response = await customFetch(`TeacherCourseLecture`);
    return response;
  };

  const {
    data: courses,
    isLoading,
    isSuccess,
    isFetching: isFetchingCourses,
    isRefetching: isRefetchingCourses,
    refetch: refetchCourses,
  } = useQuery({
    queryKey: ["coueses_attendance"],
    queryFn: fetchCoursesData,
  });

  const coursesData = courses && courses?.data?.data.course;

  const courseOption = coursesData?.map((course) => ({
    id: course.course_id,
    value: course.course.course_name,
    label: course.course.course_name || `${t("course")}`,
  }));

  const fetchLectureDate = async () => {
    const response = await customFetch(`getLectureDate/${coursesSelect?.id}`);
    return response;
  };

  const { data: lectureDate } = useQuery({
    queryKey: ["lecture_date", coursesSelect?.id],
    queryFn: fetchLectureDate,
  });

  const lectureDateData = lectureDate && lectureDate?.data?.data;
  console.log("🚀 ~ RecordAttendance ~ lectureDateData:", lectureDateData);
  const filterLectureDate = lectureDateData?.filter(
    (item) => item.id == dateSelect?.id
  );

  const lectureDateOptions = lectureDateData?.map((date) => ({
    id: date.id,
    value: date.date,
    label: date.date || `${t("level")}`,
  }));

  const fetchRecordAttendance = async () => {
    const course_id = coursesSelect?.id;
    const lecture_id = dateSelect?.value;
    console.log("🚀 ~ fetchRecordAttendance ~ lecture_id:", lecture_id);
    const response = await customFetch(
      `studentsInCourse?course_id=${course_id || 0}&date=${
        lecture_id || 0
      }?page=${page || 0}`
    );
    return response;
  };

  const { data, refetch, isRefetching, isFetching } = useQuery({
    queryKey: ["record_attendance"],
    queryFn: fetchRecordAttendance,
  });

  const RecordAttendanceData = (data && data?.data?.data.students) || [];

  const RecordAttendancePagination = data?.data?.data || {};

  const examsTodayColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("#")}</span>,
        accessorKey: "index",
        cell: (info) => info.row.index + 1,
      },
      {
        header: () => <span>{t("Student Name")}</span>,
        accessorKey: "full_name",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("studentCode")}</span>,
        accessorKey: "Academic_code",
        cell: (info) => (
          <span>{t(`${info.row.original.academicData?.Academic_code}`)}</span>
        ),
      },
      {
        header: () => <span>{t("absence rate")}</span>,
        accessorKey: "attend_percentage",
        cell: (info) => {
          console.log("🚀 ~ RecordAttendance ~ info:", info.getValue())
          const attendPercentage = Number(
            info.getValue() 
          );
          const colorAbsence =
            Number(attendPercentage) <= 15
              ? "#46BD84"
              : Number(attendPercentage) > 15 && Number(attendPercentage) < 50
              ? "#FEAE4F"
              : Number(attendPercentage) >= 50
              ? "#E63329"
              : "";
          return (
            <CircularProgressbar
              className="w-12 font-bold m-auto"
              value={attendPercentage}
              text={`${attendPercentage}%`}
              strokeWidth={11}
              styles={buildStyles({
                textColor: colorAbsence,
                pathColor: colorAbsence,
                trailColor: "#ECF3FE",
                textSize: "27px",
              })}
            />
          );
        },
      },
      {
        header: () => <span>{t("presence")}</span>,
        accessorKey: "presence",
        cell: (info: any) => {
          const isDisabled = info.row.original.attendance[0]?.attend === 1;
          const isChecked = isRowSelected(info.row.original.id);
          return (
            <div className="flex items-center justify-center gap-4">
              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer"
                id={info.row.original.id}
                name="selectedItem"
                onChange={(event) => handleCheckboxChange(event, info)}
                disabled={isDisabled}
                checked={isChecked}
              />
            </div>
          );
        },
      },
    ],
    [selectedRows]
  );

  const { mutate, isPending } = useMutation({
    mutationKey: ["add_attendance"],
    mutationFn: postAttendance,
    onSuccess: (data) => {
      queryClient.invalidateQueries("attendance");
      toast.success(t("student attendance has been successfully registered"));
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0];
      toast.error(errorMessage);
    },
  });

  useEffect(() => {
    refetch();
  }, [page, !!coursesSelect?.id]);

  useEffect(() => {
    refetchCourses();
  }, [page, !!coursesSelect?.id]);

  if (isFetching || isRefetching) return <Loading />;
  return (
    <div>
      <div className="bg-[#F9F9F9] rounded-3xl py-5 px-8 main_shadow mb-5">
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          {({ setFieldValue }) => {
            return (
              <Form className="grid grid-cols-1 gap-8 md:grid-cols-3 sm:grid-cols-2">
                <div>
                  <BaseSelect
                    id="course_id"
                    name="course_id"
                    placeholder={t("course")}
                    label={t("course")}
                    options={courseOption}
                    value={coursesSelect}
                    onChange={(e) => {
                      setFieldValue("course_id", e.id);
                      setFieldValue("course_name", e.value);
                      setCoursesSelect({
                        id: e.id,
                        label: e.value || `${t("course")}`,
                        value: e.value,
                      });
                    }}
                    isLoading={
                      isFetchingCourses || isRefetchingCourses || isLoading
                    }
                    isDisabled={!isSuccess}
                  />
                </div>
                {/* <div>
                  <BaseSelect
                    id="level"
                    name="level"
                    placeholder={t("level")}
                    label={t("level")}
                    options={lectureLevelOptions}
                    value={levelSelect}
                    onChange={(e) => {
                      setFieldValue("level", e.id);
                      setLevelSelect({
                        id: e.id,
                        label: e.value || `${t("course")}`,
                        value: e.value,
                      });
                    }}
                    isLoading={
                      isFetchingCourses || isRefetchingCourses || isLoading
                    }
                    isDisabled={!isSuccess}
                  />
                </div> */}
                <div>
                  <BaseSelect
                    id="level"
                    name="level"
                    placeholder={t("lecture date")}
                    label={t("lecture date")}
                    options={lectureDateOptions}
                    value={dateSelect}
                    onChange={(e) => {
                      console.log("🚀 ~ RecordAttendance ~ e:", e);
                      // const formattedDate = e?.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
                      // setFieldValue("lecture_date", formattedDate);
                      setDateSelect({
                        id: e.id,
                        label: e.value || `${t("course")}`,
                        value: e.value,
                      });
                    }}
                    isLoading={
                      isFetchingCourses || isRefetchingCourses || isLoading
                    }
                    isDisabled={!isSuccess}
                  />
                </div>
                {/* <div className="flex flex-col">
                  <label htmlFor="lecture_date" className="mb-2 font-bold">
                    {t("lecture date")}
                  </label>
                  <DatePicker
                    selected={dateSelect}
                    onChange={(data) => {
                      const formattedDate = data?.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
                      setFieldValue("lecture_date", formattedDate);
                      setDateSelect(formattedDate);
                    }}
                    isClearable
                    placeholderText={`${t("lecture date")}`}
                    dateFormat="dd/MM/yyyy"
                    className="w-full text-lg py-2 px-8 !border-2 rounded-lg bg-[#E6EAEE] main_shadow text-slate-800 focus-within:outline-none"
                  />
                </div> */}
              </Form>
            );
          }}
        </Formik>
      </div>

      <div className="p-5 bg-white rounded-3xl">
        <div>
          <Table
            data={RecordAttendanceData}
            columns={examsTodayColumns}
            showNavigation={true}
            currentPage={RecordAttendancePagination?.pagination?.current_page}
            totalPages={RecordAttendancePagination?.pagination?.total}
            setPage={setPage}
          />
        </div>
      </div>

      <div className="flex justify-end items-center my-8">
        <Button
          action={() => {
            mutate({
              course_id: coursesSelect?.id,
              lecture_id: filterLectureDate?.length && filterLectureDate[0]?.id,
              students: selectedRows?.map((student) => ({
                student_id: student?.id,
                attend: true,
              })),
            });
          }}
          loading={isPending}
        >
          {t("submit")}
        </Button>
      </div>
    </div>
  );
};

export default RecordAttendance;
