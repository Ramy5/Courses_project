import { useEffect, useRef, useState } from "react";
import { Button, TitlePage } from "../../../components";
import { LiaBookReaderSolid } from "react-icons/lia";
import { FiCalendar } from "react-icons/fi";
import { PiClockCountdownBold } from "react-icons/pi";
import Education from "../../../assets/lecture/istockphoto-1472553376-640_adpp_is.mp4";
import { t } from "i18next";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/UI/Loading";
import { BiSolidFile } from "react-icons/bi";
import { IoMdLink } from "react-icons/io";
import ConvertNumberToWord from "../../../components/UI/ConvertNumberToWord";
import { subtractTwoTime } from "../../../utils/helpers";
import { FaPersonChalkboard } from "react-icons/fa6";

const InstructorLectureDetails = () => {
  const [tabs, setTabs] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const numbers = ConvertNumberToWord();
  const location = useLocation()
  const lectureNumber = location?.state
  const [differenceInMinutes, setDifferenceInMinutes] = useState(0);

  const fetchLectureData = async () => {
    const response = await customFetch(`showLectureDataIns/${id}`);
    return response;
  };

  const { data, isFetching, isRefetching, refetch } = useQuery({
    queryKey: ["show_lecture"],
    queryFn: fetchLectureData,
    enabled: !!id,
  });

  const instructorLectureShow = data?.data?.data.lecture_data || [];

  const fetchLectureAllData = async () => {
    const response = await customFetch(`LecturesDataIns?lecture_data_id=${id}`);
    return response;
  }; 

  const {
    data: allData,
    isFetching: isFetchingAllData,
    isRefetching: isRefetchingAllData,
    refetch: refetchAllData,
  } = useQuery({
    queryKey: ["show_lecture_data"],
    queryFn: fetchLectureAllData,
    enabled: !!id,
  });
  const instructorLectureDataShow = allData?.data?.data || [];

  useEffect(() => {
    const diffMinutes = subtractTwoTime(
      instructorLectureShow?.lecture?.date,
      instructorLectureShow?.lecture?.start_time,
      instructorLectureShow?.lecture?.end_time
    );
    setDifferenceInMinutes(diffMinutes);
  }, [allData]);

  const videoRef = useRef(null);

  const buttons = [
    { id: 1, label: "description" },
    { id: 2, label: "instructions" },
    { id: 3, label: "files" },
    { id: 4, label: "links" },
  ];

  useEffect(() => {
    refetch();
    refetchAllData()
  }, [id]);

  if (isFetching || isRefetching || isFetchingAllData || isRefetchingAllData)
    return <Loading />;

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="w-full lg:w-[70%] md:w-[65%]">
        <div>
          <TitlePage
            title={`${instructorLectureShow?.course_name} - ${t("Lecture")} ${
              lectureNumber
            }`}
            mainTitle="Courses"
            mainLink="/instructor/Courses"
            supTitle={`${t("lectures")} ${instructorLectureShow?.course_name}`}
            supLink={`/instructor/Courses/lectures/${instructorLectureShow?.id}`}
            ThirdTitle={`${t("Lecture")} ${lectureNumber}`}
            icon={<LiaBookReaderSolid size={25} className="fill-mainColor" />}
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <FiCalendar size={25} className="text-mainColor" />
            <p>{instructorLectureShow?.lecture?.date}</p>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <PiClockCountdownBold size={26} className="text-mainColor" />
            <p>{differenceInMinutes}</p>
          </div>
        </div>

        <div>
          <video ref={videoRef} controls className="w-full mt-4">
            <source
              src={instructorLectureShow?.youtube_link || Education}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="mt-2">
            <h2 className="text-[#073051] font-medium text-xl">
              <span>{`${t("Lecture")} ${numbers[instructorLectureShow?.id - 1]} : `}</span>
              {instructorLectureShow?.title}
            </h2>
            <p className="text-[#696974] text-base font-medium mt-3">
              {t("lecturer")} : {instructorLectureShow?.teacher_name}
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
                  {/* <h2 className="text-black font-semibold mb-3">
                    {instructorLectureShow?.title}
                  </h2> */}
                  <p className="text-[#696974] text-base font-medium">
                    {instructorLectureShow?.desc}
                  </p>
                </div>
              )}
              {tabs === 2 && (
                <div>
                  <p className="text-[#696974] text-base font-medium">
                    {instructorLectureShow?.instructions}
                  </p>
                </div>
              )}
              {tabs === 3 && (
                <div className="grid grid-cols-3">
                  {instructorLectureShow?.attachments.map(
                    (attachment, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <BiSolidFile size={28} className="fill-mainColor" />
                        <a
                          href={attachment.attachment}
                          target="_black"
                          className="text-[#22222280] font-semibold text-lg"
                        >
                          jhj
                        </a>
                      </div>
                    )
                  )}
                </div>
              )}
              {tabs === 4 && (
                <div className="">
                  {instructorLectureShow?.links.map((link, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <IoMdLink size={28} className="fill-mainColor" />
                      <a
                        href={link.link}
                        target="_black"
                        className="text-[#0F5891] font-medium text-lg"
                      >
                        {link.link}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[30%] md:w-[35%] bg-white main_shadow pt-4 pb-8 rounded-xl h-fit">
        <h2 className="bg-mainColor text-white font-semibold text-xl text-center rounded-xl py-5 mx-5">
          {t("lectures")} <span>{instructorLectureShow?.course_name}</span>
        </h2>
        <p className="font-semibold text-lg my-3 mx-4">{t("Lectures")}</p>
        <div className="flex flex-col gap-y-3">
          {instructorLectureDataShow?.map((item, index) => (
            <div
              className="flex items-center shadow-md rounded-2xl bg-[#a1c2f126] cursor-pointer"
              onClick={() => {
                navigate(`/instructor/Courses/lecture/details/${item?.id}`, {state: numbers[index]});
              }}
            >
              <div className=" h-full w-[30%] ">
                <FaPersonChalkboard size={50} className="m-auto" />
              </div>
              <div className="bg-[#a1c2f133] w-[70%] py-1 px-2">
                <h2 className="text-[#073051] text-lg font-medium">
                  {`${t("Lecture")} ${numbers[index]}`}
                </h2>
                <p className="text-sm mb-1">{item.title}</p>
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

export default InstructorLectureDetails;
