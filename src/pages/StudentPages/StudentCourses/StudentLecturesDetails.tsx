import React, { useEffect, useRef, useState } from "react";
import { Button, TitlePage } from "../../../components";
import { LiaBookReaderSolid } from "react-icons/lia";
import { FiCalendar } from "react-icons/fi";
import { PiClockCountdownBold } from "react-icons/pi";
import Education from "../../../assets/lecture/istockphoto-1472553376-640_adpp_is.mp4";
import { t } from "i18next";
import { FaPersonChalkboard } from "react-icons/fa6";
import customFetch from "../../../utils/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";
import { IoDocumentTextOutline } from "react-icons/io5";
import { subtractTwoTime } from "../../../utils/helpers";

const getStudentLectureDetails = async (id: number | string) => {
  const { data } = await customFetch(`/showLectureData/${id}`);
  return data.data.lecture_data;
};

const getStudentRemainingLectureDetails = async (id: number | string) => {
  const { data } = await customFetch(`LecturesData?lecture_data_id=${id}`);
  return data.data;
};

const StudentLecturesDetails = () => {
  const [tabs, setTabs] = useState(1);
  const [differenceInMinutes, setDifferenceInMinutes] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isFetching,
    isRefetching,
    refetch: lecturesRefetch,
  } = useQuery({
    queryKey: ["get-lectures"],
    queryFn: () => getStudentLectureDetails(id),
  });

  const { data: remainingLectures, refetch: remainingLectureRefetch } =
    useQuery({
      queryKey: ["get-remaining-lectures"],
      queryFn: () => getStudentRemainingLectureDetails(id),
    });

  useEffect(() => {
    const diffMinutes = subtractTwoTime(
      data?.lecture?.date,
      data?.lecture?.start_time,
      data?.lecture?.end_time
    );
    setDifferenceInMinutes(diffMinutes);
  }, [data]);

  const lecturesDate = {
    course_name: data?.course_name,
    lecture_day: data?.lecture?.date,
    lecture_date: differenceInMinutes,
    lecture_video: data?.youtube_link,
    lecure_number: " الاولي",
    lecure_part: data?.title,
    lecture_instructor: data?.teacher_name,
    description: data?.desc,
    instructions: data?.instructions,
    files: data?.attachments,
    links: data?.links,
    // remaining_lectures: [
    //   {
    //     id: 1,
    //     lec_image: <FaPersonChalkboard size={50} className="m-auto" />,
    //     lecure_number: " الاولي",
    //     lecure_part: "مدخل الباب الاول",
    //     lecture_date: "08:30",
    //   },
    //   {
    //     id: 2,
    //     lec_image: <FaPersonChalkboard size={50} className="m-auto" />,
    //     lecure_number: " الاولي",
    //     lecure_part: "مدخل الباب الاول",
    //     lecture_date: "08:30",
    //   },
    //   {
    //     id: 1,
    //     lec_image: <FaPersonChalkboard size={50} className="m-auto" />,
    //     lecure_number: " الاولي",
    //     lecure_part: "مدخل الباب الاول",
    //     lecture_date: "08:30",
    //   },
    //   {
    //     id: 1,
    //     lec_image: <FaPersonChalkboard size={50} className="m-auto" />,
    //     lecure_number: " الاولي",
    //     lecure_part: "مدخل الباب الاول",
    //     lecture_date: "08:30",
    //   },
    //   {
    //     id: 1,
    //     lec_image: <FaPersonChalkboard size={50} className="m-auto" />,
    //     lecure_number: " الاولي",
    //     lecure_part: "مدخل الباب الاول",
    //     lecture_date: "08:30",
    //   },
    //   {
    //     id: 1,
    //     lec_image: <FaPersonChalkboard size={50} className="m-auto" />,
    //     lecure_number: " الاولي",
    //     lecure_part: "مدخل الباب الاول",
    //     lecture_date: "08:30",
    //   },
    // ],
  };

  const videoRef = useRef(null);

  const buttons = [
    { id: 1, label: "description" },
    { id: 2, label: "instructions" },
    { id: 3, label: "files" },
    { id: 4, label: "links" },
  ];

  useEffect(() => {
    lecturesRefetch();
    remainingLectureRefetch();
  }, [id]);

  if (isLoading || isFetching || isRefetching) return <Loading />;

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="w-full lg:w-[70%] md:w-[65%]">
        <div>
          <TitlePage
            title={`${lecturesDate.course_name} - ${t("Lecture")} ${
              lecturesDate.lecure_number
            }`}
            mainTitle="Courses"
            mainLink="/student/Courses"
            supTitle={`${t("lectures")} ${lecturesDate.course_name}`}
            supLink="/student/Courses/lectures/1"
            ThirdTitle={`${t("Lecture")} ${lecturesDate.lecure_number}`}
            icon={<LiaBookReaderSolid size={25} className="fill-mainColor" />}
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <FiCalendar size={25} className="text-mainColor" />
            <p>{lecturesDate.lecture_day}</p>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <PiClockCountdownBold size={26} className="text-mainColor" />
            <p>{lecturesDate.lecture_date}</p>
          </div>
        </div>

        <div>
          <video ref={videoRef} controls className="w-full mt-4">
            <source src={lecturesDate.lecture_video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="mt-2">
            <h2 className="text-[#073051] font-medium text-xl">
              <span>
                {t("Lecture")} {lecturesDate.lecure_number} :{" "}
              </span>
              {lecturesDate.lecure_part}
            </h2>
            <p className="text-[#696974] text-base font-medium mt-3">
              {t("lecturer")} : {lecturesDate.lecture_instructor}
            </p>
          </div>
          <div className="mt-3">
            <div className="flex gap-4 mb-4 sm:gap-12 ms-0 sm:ms-8">
              {buttons.map((button) => (
                <Button
                  key={button.id}
                  className={`bg-transparent text-sm sm:text-base font-semibold p-0 rounded-none ${
                    tabs === button.id
                      ? "text-[#393D94] border-b-2 border-[#393D94]"
                      : "text-[#696974]"
                  }`}
                  action={() => setTabs(button.id)}
                >
                  {t(button.label)}
                </Button>
              ))}
            </div>
            <div className="bg-[#E7EFFB]  rounded-xl p-5">
              {tabs === 1 && (
                <div>
                  <p className="text-[#696974] text-base font-medium">
                    {lecturesDate.description}
                  </p>
                </div>
              )}
              {tabs === 2 && (
                <div>
                  <p className="text-[#696974] text-base font-medium">
                    {lecturesDate.instructions}
                  </p>
                </div>
              )}
              {tabs === 3 && (
                <div className="flex flex-col gap-2">
                  {lecturesDate?.files?.map(
                    (file: { id: number; attachment: string }) => {
                      return (
                        <p
                          key={file.id}
                          className="flex items-center gap-1 px-4 py-2 bg-white border w-max"
                        >
                          <span>
                            <IoDocumentTextOutline className="text-2xl text-green-600" />
                          </span>
                          <Link to={file.attachment} target="_blank">
                            {file.attachment}
                          </Link>
                        </p>
                      );
                    }
                  )}
                </div>
              )}
              {tabs === 4 && (
                <div>
                  {lecturesDate.links.map((link: any) => {
                    return (
                      <Link key={link.id} to={link.link} target="_blank">
                        {link.link}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[30%] md:w-[35%] bg-white main_shadow pt-4 pb-8 rounded-xl h-fit">
        <h2 className="py-5 mx-5 text-xl font-semibold text-center text-white bg-mainColor rounded-xl">
          {t("lectures")} <span>{lecturesDate.course_name}</span>
        </h2>
        <p className="mx-4 my-3 text-lg font-semibold">{t("Lectures")}</p>
        <div className="flex flex-col gap-y-3">
          {remainingLectures?.map((item: any) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(`/student/Courses/lecture/details/${item?.id}`)
              }
              className="flex items-center shadow-md rounded-2xl bg-[#a1c2f126] cursor-pointer"
            >
              <div className=" h-full w-[30%] ">
                <FaPersonChalkboard size={50} className="m-auto" />
              </div>
              <div className="bg-[#a1c2f133] w-[70%] py-1 px-2">
                <h2 className="text-[#073051] text-lg font-medium">
                  {t("Lecture")} <span>{item.lecure_number}</span>
                </h2>
                <p className="mb-1 text-sm">{item.title}</p>
                <span className="text-sm">
                  (
                  {subtractTwoTime(
                    item?.lecture?.date,
                    item?.lecture?.start_time,
                    item?.lecture?.end_time
                  )}
                  )
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentLecturesDetails;
