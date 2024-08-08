import { Swiper, SwiperSlide } from "swiper/react";
import {
  DataCount,
  PerformanceChart,
  PersonView,
  Statistics,
  StudentBanar,
  StudentLecturesBoxes,
} from "../../components";
import { Navigation } from "swiper/modules";
import {
  FaBook,
  FaClipboardList,
  FaClock,
  FaHashtag,
  FaListAlt,
  FaTasks,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { t } from "i18next";
import { useAppSelector } from "../../hooks/reduxHooks";
import customFetch from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/UI/Loading";
import { generateRandomColor } from "../../utils/helpers";

const getCourses = async () => {
  const { data } = await customFetch("TeacherCourses");
  return data.data;
};

const getCount = async () => {
  const { data } = await customFetch("TeacherCoursesCount");
  return data.data;
};

const InstructorInformationPanel = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAppSelector((slice) => slice.user);

  const {
    data: countData,
    isLoading: countIsLoading,
    isFetching: countIsFetching,
    isRefetching: countIsRefetching,
  } = useQuery({
    queryKey: ["get-counts"],
    queryFn: getCount,
  });

  const {
    data: courseData,
    isLoading: courseIsLoading,
    isFetching: courseIsFetching,
    isRefetching: courseIsRefetching,
  } = useQuery({
    queryKey: ["get-courses"],
    queryFn: getCourses,
  });

  const studentLecturesData = courseData?.map((course: any) => {
    return {
      programTitle: course.course_name,
      programColor: generateRandomColor(),
      lectureDate: course.day,
      numOfStudents: course.student_count,
      instructors: course?.teachers
        ?.slice(0, 2)
        ?.map((teacher) => teacher.teacher_name),
    };
  });

  const dataCounts = [
    {
      dataTitle: "number of lectures",
      dataColor: "#005560",
      dataCount: countData?.lecture_count,
      dataIcon: <FaHashtag className="text-lg lg:text-2xl" color="#005560" />,
    },
    {
      dataTitle: "lecture hours",
      dataColor: "#7E57C2",
      dataCount: countData?.lecture_count, // TODO:
      dataIcon: <FaClock className="text-lg lg:text-2xl" color="#7E57C2" />,
    },
    {
      dataTitle: "courses",
      dataColor: "#388E3C",
      dataCount: countData?.course_count,
      dataIcon: <FaBook className="text-lg lg:text-2xl" color="#388E3C" />,
    },
    {
      dataTitle: "number of exams",
      dataColor: "#D32F2F",
      dataCount: countData?.exam_count,
      dataIcon: <FaListAlt className="text-lg lg:text-2xl" color="#D32F2F" />,
    },
    {
      dataTitle: "projects",
      dataColor: "#8D6E63",
      dataCount: countData?.project_count,
      dataIcon: <FaTasks className="text-lg lg:text-2xl" color="#8D6E63" />,
    },
    {
      dataTitle: "assignments",
      dataColor: "#0277BD",
      dataCount: countData?.homework_count,
      dataIcon: (
        <FaClipboardList className="text-lg lg:text-2xl" color="#0277BD" />
      ),
    },
  ];

  const personData = [
    {
      img: "https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=",
      desc: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      img: "https://via.placeholder.com/150",
      desc: "Sed do eiusmod tempor incididunt ut labore.",
    },
    {
      img: "https://via.placeholder.com/150",
      desc: "Ut enim ad minim veniam, quis nostrud.",
    },
  ];

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Performance",
        data: [100, 120, 150, 130, 200, 300],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        tension: 0.4,
        pointHoverRadius: 5,
        pointRadius: 4,
        pointBorderWidth: 1,
      },
    ],
  };

  const progressData = [
    { title: "tests", percentage: 77 },
    { title: "projects", percentage: 33 },
    { title: "homeworks", percentage: 50 },
    { title: "lectures", percentage: 5 },
  ];

  if (
    countIsLoading ||
    countIsFetching ||
    countIsRefetching ||
    courseIsLoading ||
    courseIsFetching ||
    courseIsRefetching
  )
    return <Loading />;

  return (
    <div className="space-y-10">
      {/* INSTRUCTOR BANAR */}
      <StudentBanar userName={user?.name} />

      {/* STUDENT LECTURES BOXES */}
      <StudentLecturesBoxes studentLecturesData={studentLecturesData} />

      {/* DATA COUNT AND PERSONS DATA */}
      <div className="grid items-center grid-cols-2 gap-6 lg:grid-cols-3">
        {/* PERSONS */}
        <div className="col-span-2 px-6 py-10 bg-white lg:col-span-1 rounded-2xl">
          <Swiper
            navigation={true}
            loop
            centeredSlides={true}
            dir="rtl"
            slidesPerView={1}
            modules={[Navigation]}
            className="mySwiper"
          >
            {personData.map((item, index) => (
              <SwiperSlide key={index}>
                <PersonView img={item.img} desc={item.desc} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* DATA COUNT */}
        <div className="grid items-center grid-cols-2 col-span-2 gap-6 lg:grid-cols-3">
          {dataCounts.map((data, index) => (
            <DataCount
              key={index}
              dataTitle={data.dataTitle}
              dataColor={data.dataColor}
              dataCount={data.dataCount}
              dataIcon={data.dataIcon}
            />
          ))}
        </div>
      </div>

      {/* CHART PERFORMANCE AND CALENDER */}
      <div className="grid items-center grid-cols-2 gap-x-14 gap-y-6 lg:grid-cols-3">
        {/* CALENDER */}
        <div className="col-span-2 justify-self-center lg:justify-self-auto lg:col-span-1">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
          />
        </div>

        {/* PERFORMANCE CHART */}
        <div className="col-span-2">
          <PerformanceChart data={chartData} />
          <p className="mt-4 text-center">
            {t("total number of hours worked on the system")}
          </p>
        </div>
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

export default InstructorInformationPanel;
