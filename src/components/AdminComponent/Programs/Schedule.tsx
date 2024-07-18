// import { Button } from "../..";
// import { t } from "i18next";

// const StudyScheduleSecondStep = ({ setSteps }: any) => {
//   const days = [
//     "saturday",
//     "sunday",
//     "monday",
//     "tuesday",
//     "wednesday",
//     "thursday",
//     "friday",
//   ];
//   const times = [
//     "16:00",
//     "15:00",
//     "14:00",
//     "13:00",
//     "12:00",
//     "11:00",
//     "10:00",
//     "9:00",
//   ];

//   return (
//     <div className="mt-12">
//       <h2>StudyScheduleSecondStep</h2>

//       <div>
//         <div className="flex items-center justify-between mb-5 ms-24">
//           {times.map((time) => (
//             <div key={time}>{time}</div>
//           ))}
//         </div>
//         <div className="flex flex-col gap-12">
//           {days.map((day) => (
//             <div key={day} className="flex items-center gap-8">
//               <p className="w-20">{day}</p>
//               <div className="h-[1px] bg-mainColor w-full"></div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mt-4 flex items-center justify-end gap-5">
//         <Button bordered action={() => setSteps(1)}>
//           {t("Previous")}
//         </Button>
//         <Button action={() => setSteps(3)}>{t("Next")}</Button>
//         <Button className="bg-mainRed">{t("cancel")}</Button>
//       </div>
//     </div>
//   );
// };

// export default StudyScheduleSecondStep;

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { useEffect, useRef } from "react";
import { IoTimeOutline } from "react-icons/io5";
import { useRTL } from "../../../hooks/useRTL";

const Schedule = ({ scheduleData }) => {
  const isRTL = useRTL();
  const arrangeScheduleData = scheduleData?.sort((a, b) => a.day_id - b.day_id);
  const calendarRef = useRef(null);

  const events = arrangeScheduleData?.map((lecture, index) => ({
    id: String(index + 1),
    customContent: (
      <div className="text-center">
        <p className="text-base font-medium">{lecture.course_name}</p>
        <p className="py-2 text-base font-medium">{lecture.teacher_name}</p>
        <div className="flex items-center justify-center gap-1">
          <IoTimeOutline />
          <p>{`${lecture.start_time} - ${lecture.end_time}`}</p>
        </div>
      </div>
    ),
    resourceId: getResourceIdByDayId(lecture.day_id), // Function to map day_id to resourceId
    start: `2024-06-25T${lecture.start_time}:00`,
    end: `2024-06-25T${lecture.end_time}:00`,
    backgroundColor: getRandomColor(), // Function to assign random colors or based on some logic
  }));
  console.log("🚀 ~ events ~ events:", events);

  function getResourceIdByDayId(day_id) {
    const dayMapping = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
    };
    return dayMapping[day_id] || "unknown";
  }

  function getRandomColor() {
    const colors = ["#369252", "#393D94", "#025464", "#9C48AB"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = calendarRef.current.getApi();

      calendar.setOption("timeZone", "UTC");
      calendar.setOption("initialView", "dayGridMonth");
      calendar.setOption("aspectRatio", 2.4);
      calendar.setOption("resourceAreaWidth", "10%");

      calendar.setOption("headerToolbar", {
        left: "prev,next",
        center: "title",
        right: "resourceTimelineDay",
      });
      calendar.setOption("editable", false);
      calendar.setOption("resourceAreaHeaderContent", "");

      const resources = [
        { id: 1, title: isRTL ? "السبت" : "saturday" },
        { id: 2, title: isRTL ? "الأحد" : "sunday" },
        { id: 3, title: isRTL ? "الاثنين" : "monday" },
        { id: 4, title: isRTL ? "الثلاثاء" : "tuesday" },
        { id: 5, title: isRTL ? "الاربعاء" : "wednesday" },
        { id: 6, title: isRTL ? "الخميس" : "thursday" },
        { id: 7, title: isRTL ? "الجمعه" : "friday" },
      ];

      calendar.setOption("resources", resources);

      calendar.setOption("events", events);

      const calendarEl = document.querySelector(".fc-media-screen");
      if (calendarEl) {
        calendarEl.style.direction = isRTL ? "rtl" : "ltr";
      }

      return () => {
        calendar.destroy();
      };
    }
  }, [events, isRTL]);

  const renderEventContent = (eventInfo) => {
    const event = events.find((e) => e.id === eventInfo.event.id);
    return <div>{event ? event.customContent : eventInfo.event.title}</div>;
  };

  const scheduleElement = document.getElementsByClassName(
    "fc fc-media-screen fc-theme-standard"
  );
  console.log("🚀 ~ Schedule ~ scheduleElement:", scheduleElement);

  return (
    <div>
      <div className="my-10 pe-6">
        <FullCalendar
          ref={calendarRef}
          plugins={[
            resourceTimelinePlugin,
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          initialView="resourceTimelineDay"
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            omitZeroMinute: false,
            hour12: false,
          }}
          slotMinTime={"09:00AM"}
          slotMaxTime={"19:00PM"}
          initialDate="2024-06-25"
          eventContent={renderEventContent}
        />
      </div>
    </div>
  );
};
export default Schedule;

// const resources = [
//   { id: "friday", title: "saturday" },
//   { id: "monday", title: "sunday" },
//   { id: "saturday", title: "monday" },
//   { id: "sunday", title: "tuesday" },
//   { id: "thursday", title: "wednesday" },
//   { id: "tuesday", title: "thursday" },
//   { id: "wednesday", title: "friday" },
// ];

// const events = [
//   {
//     id: "1",
//     customContent: (
//       <div className="text-center">
//         <p className="text-base font-medium">فيزياء</p>
//         <p className="py-2 text-base font-medium">محمد يس</p>
//         <div className="flex items-center justify-center gap-1">
//           <IoTimeOutline />
//           <p>09:00 - 10:00</p>
//         </div>
//       </div>
//     ),
//     resourceId: "friday",
//     start: "2024-06-25T09:00:00",
//     end: "2024-06-25T10:00:00",
//     backgroundColor: "#369252",
//   },
//   {
//     id: "2",
//     customContent: (
//       <div className="text-center">
//         <p className="text-base font-medium">كمياء</p>
//         <p className="py-2 text-base font-medium">محمد يس</p>
//         <div className="flex items-center justify-center gap-1">
//           <IoTimeOutline />
//           <p>12:00 - 13:00</p>
//         </div>
//       </div>
//     ),
//     resourceId: "friday",
//     start: "2024-06-25T12:00:00",
//     end: "2024-06-25T13:00:00",
//     backgroundColor: "#393D94",
//   },
//   {
//     id: "3",
//     customContent: (
//       <div className="text-center">
//         <p className="text-base font-medium">حاسب الي</p>
//         <p className="py-2 text-base font-medium">محمد يس</p>
//         <div className="flex items-center justify-center gap-1">
//           <IoTimeOutline />
//           <p>09:30 - 11:20</p>
//         </div>
//       </div>
//     ),
//     resourceId: "monday",
//     start: "2024-06-25T10:00:00",
//     end: "2024-06-25T11:00:00",
//     backgroundColor: "#393D94",
//   },
//   {
//     id: "9",
//     customContent: (
//       <div className="text-center">
//         <p className="text-base font-medium">فيزياء</p>
//         <p className="py-2 text-base font-medium">محمد يس</p>
//         <div className="flex items-center justify-center gap-1">
//           <IoTimeOutline />
//           <p>09:30 - 11:20</p>
//         </div>
//       </div>
//     ),
//     resourceId: "monday",
//     start: "2024-06-25T15:00:00",
//     end: "2024-06-25T16:00:00",
//     backgroundColor: "#025464",
//   },
//   {
//     id: "4",
//     customContent: (
//       <div className="text-center">
//         <p className="text-base font-medium">كمياء</p>
//         <p className="py-2 text-base font-medium">محمد يس</p>
//         <div className="flex items-center justify-center gap-1">
//           <IoTimeOutline />
//           <p>09:30 - 11:20</p>
//         </div>
//       </div>
//     ),
//     resourceId: "saturday",
//     start: "2024-06-25T12:00:00",
//     end: "2024-06-25T13:00:00",
//     backgroundColor: "#9C48AB",
//   },
//   {
//     id: "10",
//     customContent: (
//       <div className="text-center">
//         <p className="text-base font-medium">فيزياء</p>
//         <p className="py-2 text-base font-medium">محمد يس</p>
//         <div className="flex items-center justify-center gap-1">
//           <IoTimeOutline />
//           <p>09:30 - 11:20</p>
//         </div>
//       </div>
//     ),
//     resourceId: "saturday",
//     start: "2024-06-25T17:00:00",
//     end: "2024-06-25T18:00:00",
//     backgroundColor: "#025464",
//   },
//   {
//     id: "5",
//     customContent: (
//       <div className="text-center">
//         <p className="text-base font-medium">فيزياء</p>
//         <p className="py-2 text-base font-medium">محمد يس</p>
//         <div className="flex items-center justify-center gap-1">
//           <IoTimeOutline />
//           <p>09:30 - 11:20</p>
//         </div>
//       </div>
//     ),
//     resourceId: "sunday",
//     start: "2024-06-25T13:00:00",
//     end: "2024-06-25T14:00:00",
//     backgroundColor: "#025464",
//   },
//   {
//     id: "6",
//     customContent: (
//       <div className="text-center">
//         <p className="text-base font-medium">فيزياء</p>
//         <p className="py-2 text-base font-medium">محمد يس</p>
//         <div className="flex items-center justify-center gap-1">
//           <IoTimeOutline />
//           <p>09:30 - 11:20</p>
//         </div>
//       </div>
//     ),
//     resourceId: "thursday",
//     start: "2024-06-25T09:00:00",
//     end: "2024-06-25T10:00:00",
//     backgroundColor: "#025464",
//   },
//   {
//     id: "7",
//     customContent: (
//       <div className="text-center">
//         <p className="text-base font-medium">فيزياء</p>
//         <p className="py-2 text-base font-medium">محمد يس</p>
//         <div className="flex items-center justify-center gap-1">
//           <IoTimeOutline />
//           <p>09:30 - 11:20</p>
//         </div>
//       </div>
//     ),
//     resourceId: "tuesday",
//     start: "2024-06-25T14:00:00",
//     end: "2024-06-25T15:00:00",
//     backgroundColor: "#393D94",
//   },
//   // {
//   //   id: "8",
//   //   customContent: (
//   //     <div className="text-center">
//   //       <p>فيزياء</p>
//   //       <p className="py-2 text-base font-medium">محمد يس</p>
//   //       <div className="flex items-center justify-center gap-1">
//   //         <IoTimeOutline />
//   //         <p>09:30 - 11:20</p>
//   //       </div>
//   //     </div>
//   //   ),
//   //   resourceId: "wednesday",
//   //   start: "2024-06-25T15:00:00",
//   //   end: "2024-06-25T16:00:00",
//   //   backgroundColor: "#393D94",
//   // },
// ];
