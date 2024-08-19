import {
  LatestNews,
  Statistics,
  StudentBanar,
  StudentLecturesBoxes,
} from "../../components";
import { t } from "i18next";
import customFetch from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/UI/Loading";
import { generateRandomColor } from "../../utils/helpers";

const getNewsData = async () => {
  const { data } = await customFetch("getLatestCourseItems");
  return data.data.courses;
};

const getCourses = async () => {
  const { data } = await customFetch("getStudentCourses");
  return data.data.courses;
};

const StudentInformationPanel = () => {
  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["get-news"],
    queryFn: getNewsData,
  });

  const {
    data: coursesData,
    isLoading: coursesDataIsLoading,
    isFetching: coursesDataIsFetching,
    isRefetching: coursesDataIsRefetching,
  } = useQuery({
    queryKey: ["get-course"],
    queryFn: getCourses,
  });

  const studentLecturesData = coursesData?.map((course: any) => {
    return {
      programTitle: course.course_name,
      programColor: generateRandomColor(),
      lectureDate: course.day,
      numOfStudents: course.students_count,
      instructors: course?.teachers?.map((teacher) => teacher.full_name),
    };
  });

  const latestNewsData = [
    {
      titleHead: "latest lectures",
      data: data?.flatMap((course) =>
        course?.latest_lectures?.map(
          (lecture, i) => `lecture ${i + 1} added ${course?.course_name} course`
        )
      ),
    },
    {
      titleHead: "latest tests",
      data: data?.flatMap((course) =>
        course?.latest_exams?.map(
          (exam, i) => `test ${i + 1} added ${course?.course_name} course`
        )
      ),
    },
    {
      titleHead: "latest projects",
      data: data?.flatMap((course) =>
        course?.latest_projects?.map(
          (project, i) => `project ${i + 1} added ${course?.course_name} course`
        )
      ),
    },
    {
      titleHead: "latest homeworks",
      data: data?.flatMap((course) =>
        course?.latest_homeworks?.map(
          (homework, i) =>
            `homework ${i + 1} added ${course?.course_name} course`
        )
      ),
    },
  ];

  console.log(latestNewsData);

  const progressData = [
    { title: "tests", percentage: 77 },
    { title: "projects", percentage: 33 },
    { title: "homeworks", percentage: 50 },
    { title: "lectures", percentage: 5 },
  ];

  if (
    isLoading ||
    isFetching ||
    isRefetching ||
    coursesDataIsLoading ||
    coursesDataIsFetching ||
    coursesDataIsRefetching
  )
    return <Loading />;

  return (
    <div className="space-y-10">
      {/* STUDENT BANAR */}
      <StudentBanar />

      {/* STUDENT LECTURES BOXES */}
      <StudentLecturesBoxes studentLecturesData={studentLecturesData} />

      {/* NEWS */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        {latestNewsData.map((latestNew, index) => {
          return (
            <LatestNews
              key={index}
              titleHead={latestNew.titleHead}
              data={latestNew.data.slice(0, 3)}
            />
          );
        })}
      </div>

      {/* STATISTICS */}
      <div>
        <div className="p-3 text-white bg-mainColor rounded-tr-xl rounded-tl-xl">
          <h2>{t("statistics")}</h2>
        </div>

        <div className="grid items-center gap-10 px-16 py-10 bg-white rounded-br-xl rounded-bl-xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {progressData.map((item, index) => (
            <Statistics
              key={index}
              title={item.title}
              percentage={item.percentage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentInformationPanel;
