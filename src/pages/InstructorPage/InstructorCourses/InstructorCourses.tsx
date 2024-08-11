import { Button, TitlePage } from "../../../components";
import { LiaBookReaderSolid } from "react-icons/lia";
import { t } from "i18next";
import { useState } from "react";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";
import InstructorCoursesCard from "../../../components/InstructorComponent/InstructorCourses/InstructorCoursesCard";

const InstructorCourses = () => {
  // const [tabs, setTabs] = useState<number>(1);

  const fetchInstructorSchedule = async () => {
    const response = await customFetch(`getCourses`);
    return response;
  };

  const { data, isFetching, isRefetching } = useQuery({
    queryKey: ["teacher_courses"],
    queryFn: fetchInstructorSchedule,
  });

  const instructorCoursesData = data?.data?.data.courses || [];
  console.log("🚀 ~ InstructorCourses ~ instructorCoursesData:", instructorCoursesData)

  // const buttons = [
  //   { id: 1, label: "first semester" },
  //   { id: 2, label: "second semester" },
  // ];

  if (isFetching || isRefetching) return <Loading />;

  return (
    <div>
      <div>
        <TitlePage
          mainTitle="Courses"
          supTitle=""
          icon={<LiaBookReaderSolid size={25} className="fill-mainColor" />}
        />
      </div>

      {/* <div className="flex flex-col sm:flex-row gap-2 md:gap-8 bg-[#F9F9F9] rounded-3xl py-5 px-8 main_shadow mb-8">
        {buttons.map((button) => (
          <Button
            key={button.id}
            className={`px-2 md:px-4 font-medium md:semibold w-full sm:w-1/3 md:w-[26%] m-auto sm:m-0 ${
              tabs === button.id
                ? "bg-mainColor text-white"
                : "bg-transparent text-black"
            }`}
            action={() => setTabs(button.id)}
          >
            {t(button.label)}
          </Button>
        ))}
      </div> */}

      <InstructorCoursesCard instructorCoursesData={instructorCoursesData} />
    </div>
  );
};

export default InstructorCourses;
