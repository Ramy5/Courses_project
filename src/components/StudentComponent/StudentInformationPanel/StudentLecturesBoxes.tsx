import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LectureBox from "./LectureBox";
import { t } from "i18next";

const StudentLecturesBoxes = () => {
  const studentLecturesData = [
    {
      programTitle: t("Web"),
      programColor: "#3498db",
      lectureDate: t("Sunday"),
      numOfStudents: 150,
      instructors: ["John Doe", "John Doe"],
    },
    {
      programTitle: t("Data Science"),
      programColor: "#2ecc71",
      lectureDate: t("Monday"),
      numOfStudents: 200,
      instructors: ["Jane Smith", "Jane Smith"],
    },
    {
      programTitle: t("UX/UI"),
      programColor: "#e74c3c",
      lectureDate: t("Tuesday"),
      numOfStudents: 180,
      instructors: ["Emily Davis", "Emily Davis"],
    },
    {
      programTitle: t("Cybersecurity"),
      programColor: "#f39c12",
      lectureDate: t("Wednesday"),
      numOfStudents: 120,
      instructors: ["Michael Brown", "Michael Brown"],
    },
    {
      programTitle: t("Cloud Computing"),
      programColor: "#8e44ad",
      lectureDate: t("Thursday"),
      numOfStudents: 160,
      instructors: ["Sarah Wilson", "Sarah Wilson"],
    },
  ];

  return (
    <div className="relative">
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop
        centeredSlides={true}
        spaceBetween={15}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          700: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1300: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        dir="rtl"
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {studentLecturesData.map((lecture, index) => (
          <SwiperSlide>
            <LectureBox
              programTitle={lecture.programTitle}
              programColor={lecture.programColor}
              lectureDate={lecture.lectureDate}
              numOfStudents={lecture.numOfStudents}
              instructors={lecture.instructors}
            />
          </SwiperSlide>
        ))}
        <div className="swiper-button-next swiper__program--next"></div>
        <div className="swiper-button-prev swiper__program--prev"></div>
      </Swiper>
    </div>
  );
};

export default StudentLecturesBoxes;
