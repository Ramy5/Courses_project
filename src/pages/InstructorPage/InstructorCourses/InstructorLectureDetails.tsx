import React, { useRef, useState } from "react";
import { Button, TitlePage } from "../../../components";
import { LiaBookReaderSolid } from "react-icons/lia";
import { FiCalendar } from "react-icons/fi";
import { PiClockCountdownBold } from "react-icons/pi";
import Education from "../../../assets/lecture/istockphoto-1472553376-640_adpp_is.mp4";
import { t } from "i18next";
import { FaPersonChalkboard } from "react-icons/fa6";

const InstructorLectureDetails = () => {
  const [tabs, setTabs] = useState(1);

  const lecturesDate = {
    instructor_name: "الفيزياء",
    lecture_day: "الاحد 17 مارس 2024",
    lecture_date: "08:30",
    lecture_video: Education,
    lecure_number: " الاولي",
    lecure_part: "مدخل الباب الاول",
    lecture_instructor: "د.اسامة السيد",
    description: {
      title: "كيفية تحويل  ثاني اكسيد الكربون الي اكسجين",
      desc: "تتطلب مناقشة العلاقة بين اللغة و الخطاب النظر في مجموعةعلاقات، كعلاقة اللغة بالسلطة و الإيديولوج و الثقافة، و طرح جملة ",
    },
    instructions: {
      title: "كيفية تحويل  ثاني اكسيد الكربون الي اكسجين",
      desc: "تتطلب مناقشة العلاقة بين اللغة و الخطاب النظر في مجموعةعلاقات، كعلاقة اللغة بالسلطة و الإيديولوج و الثقافة، و طرح جملة ",
    },
    files: {
      title: "كيفية تحويل  ثاني اكسيد الكربون الي اكسجين",
      desc: "تتطلب مناقشة العلاقة بين اللغة و الخطاب النظر في مجموعةعلاقات، كعلاقة اللغة بالسلطة و الإيديولوج و الثقافة، و طرح جملة ",
    },
    links: {
      title: "كيفية تحويل  ثاني اكسيد الكربون الي اكسجين",
      desc: "تتطلب مناقشة العلاقة بين اللغة و الخطاب النظر في مجموعةعلاقات، كعلاقة اللغة بالسلطة و الإيديولوج و الثقافة، و طرح جملة ",
    },
    remaining_lectures: [
      {
        id: 1,
        lec_image: <FaPersonChalkboard size={50} className="m-auto" />,
        lecure_number: " الاولي",
        lecure_part: "مدخل الباب الاول",
        lecture_date: "08:30",
      },
      {
        id: 2,
        lec_image: <FaPersonChalkboard size={50} className="m-auto" />,
        lecure_number: " الاولي",
        lecure_part: "مدخل الباب الاول",
        lecture_date: "08:30",
      },
      {
        id: 1,
        lec_image: <FaPersonChalkboard size={50} className="m-auto" />,
        lecure_number: " الاولي",
        lecure_part: "مدخل الباب الاول",
        lecture_date: "08:30",
      },
      {
        id: 1,
        lec_image: <FaPersonChalkboard size={50} className="m-auto" />,
        lecure_number: " الاولي",
        lecure_part: "مدخل الباب الاول",
        lecture_date: "08:30",
      },
      {
        id: 1,
        lec_image: <FaPersonChalkboard size={50} className="m-auto" />,
        lecure_number: " الاولي",
        lecure_part: "مدخل الباب الاول",
        lecture_date: "08:30",
      },
      {
        id: 1,
        lec_image: <FaPersonChalkboard size={50} className="m-auto" />,
        lecure_number: " الاولي",
        lecure_part: "مدخل الباب الاول",
        lecture_date: "08:30",
      },
    ],
  };

  const videoRef = useRef(null);

  const buttons = [
    { id: 1, label: "description" },
    { id: 2, label: "instructions" },
    { id: 3, label: "files" },
    { id: 4, label: "links" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="w-full lg:w-[70%] md:w-[65%]">
        <div>
          <TitlePage
            title={`${lecturesDate.instructor_name} - ${t("Lecture")} ${
              lecturesDate.lecure_number
            }`}
            mainTitle="Courses"
            mainLink="/instructor/Courses"
            supTitle={`${t("lectures")} ${lecturesDate.instructor_name}`}
            supLink="/instructor/lectures/1"
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
            <div className="flex gap-4 sm:gap-12 ms-0 sm:ms-8 mb-4">
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
                  <h2 className="text-black font-semibold mb-3">
                    {lecturesDate.description.title}
                  </h2>
                  <p className="text-[#696974] text-base font-medium">
                    {lecturesDate.description.desc}
                  </p>
                </div>
              )}
              {tabs === 2 && <div>2</div>}
              {tabs === 3 && <div>3</div>}
              {tabs === 4 && <div>4</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[30%] md:w-[35%] bg-white main_shadow pt-4 pb-8 rounded-xl h-fit">
        <h2 className="bg-mainColor text-white font-semibold text-xl text-center rounded-xl py-5 mx-5">
          {t("lectures")} <span>{lecturesDate.course_name}</span>
        </h2>
        <p className="font-semibold text-lg my-3 mx-4">{t("Lectures")}</p>
        <div className="flex flex-col gap-y-3">
          {lecturesDate.remaining_lectures.map((item) => (
            <div className="flex items-center shadow-md rounded-2xl bg-[#a1c2f126] cursor-pointer">
              <div className=" h-full w-[30%] ">{item.lec_image}</div>
              <div className="bg-[#a1c2f133] w-[70%] py-1 px-2">
                <h2 className="text-[#073051] text-lg font-medium">
                  {t("Lecture")} <span>{item.lecure_number}</span>
                </h2>
                <p className="text-sm mb-1">{item.lecure_part}</p>
                <span className="text-sm">({item.lecture_date})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorLectureDetails;