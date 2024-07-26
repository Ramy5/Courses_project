import { useEffect, useMemo, useState } from "react";
import { t } from "i18next";
import { ColumnDef } from "@tanstack/react-table";
import { BaseInput, Button, DateInputField, Table } from "../../components";
import Select from "react-select";
import { Form, Formik } from "formik";
import selectStyle from "../../utils/selectStyle";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import customFetch from "../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import Loading from "../../components/UI/Loading";
import { formatDate } from "../../utils/helpers";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

const postAttendance = async (newAttendance: any) => {
  const data = customFetch.post("/courseAttendance", newAttendance);
  return data;
};

const RecordAttendance = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  console.log("🚀 ~ RecordAttendance ~ selectedRows:", selectedRows);
  const [coursesSelect, setCoursesSelect] = useState({});
  console.log("🚀 ~ RecordAttendance ~ coursesSelect:", coursesSelect);
  const [dateSelect, setDateSelect] = useState(null);
  console.log("🚀 ~ RecordAttendance ~ dateSelect:", dateSelect);
  const formatDates = formatDate(dateSelect);
  const queryClient = useQueryClient();

  const initialValues = {
    Courses: "",
    lecture_date: "",
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
        prevSelectedItems.filter((item: any) => item.id === Number(checkboxId))
      );
    }
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
  } = useQuery({
    queryKey: ["coueses_attendance"],
    queryFn: fetchCoursesData,
  });

  const coursesData = courses && courses?.data?.data.course;
  console.log("🚀 ~ RecordAttendance ~ coursesData:", coursesData);

  const courseOption = coursesData?.map((course) => ({
    id: course.course_id,
    value: course.course.course_name,
    label: course.course.course_name,
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
    (date) => date.date === formatDates
  );
  console.log("🚀 ~ RecordAttendance ~ filterLectureDate:", filterLectureDate);

  // ?course_id=${coursesSelect}&date=${dateSelect}

  const fetchRecordAttendance = async () => {
    const course_id = coursesSelect?.id;
    const date = filterLectureDate[0]?.id;
    const response = await customFetch(
      `studentsInCourse?course_id=${course_id || 0}&date=${date || 0}?page=${
        page || 0
      }`
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
          const colorAbsence =
            Number(info.getValue()) <= 15
              ? "#46BD84"
              : Number(info.getValue()) > 15 && Number(info.getValue()) < 50
              ? "#FEAE4F"
              : Number(info.getValue()) >= 50
              ? "#E63329"
              : "";
          return (
            <CircularProgressbar
              className="w-12 font-bold m-auto"
              value={Number(info.getValue())}
              text={`${Number(info.getValue())}%`}
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
    ],
    []
  );

  const { mutate, isPending } = useMutation({
    mutationKey: ["add_attendance"],
    mutationFn: postAttendance,
    onSuccess: (data) => {
      queryClient.invalidateQueries("attendance");
      toast.success(
        t("instructor login information has been added successfully")
      );
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0];
      toast.error(errorMessage);
    },
  });

  useEffect(() => {
    refetch();
  }, [page, !!coursesSelect?.id && !!filterLectureDate?.length]);

  if (isFetching || isRefetching) return <Loading />;
  return (
    <div>
      <div className="bg-[#F9F9F9] rounded-3xl py-5 px-8 main_shadow mb-5">
        <Formik initialValues={initialValues} onSubmit={(values) => {
          
          console.log("🚀 ~ RecordAttendance ~ values:", values)
        }}>
          {({ setFieldValue }) => {
            return (
              <Form className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="course" className="font-bold block mb-2">
                    {t("course")}
                  </label>
                  <Select
                    styles={selectStyle}
                    id="course_id"
                    name="course_id"
                    placeholder={t("course")}
                    options={courseOption}
                    value={coursesSelect}
                    onChange={(e) => {
                      setFieldValue("course_id", e.id);
                      setFieldValue("course_name", e.value);
                      setCoursesSelect({
                        id: e.id,
                        label: e.value,
                        value: e.value,
                      });
                    }}
                    isLoading={
                      isFetchingCourses || isRefetchingCourses || isLoading
                    }
                    isDisabled={!isSuccess}
                    components={{ LoadingIndicator }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="lecture_date" className="font-bold mb-2">
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
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>

      <div className="bg-white p-5 rounded-3xl">
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
        <Button>{t("submit")}</Button>
      </div>
    </div>
  );
};

export default RecordAttendance;
