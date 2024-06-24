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
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { useEffect, useRef } from "react";

const StudyScheduleSecondStep = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = calendarRef.current.getApi();
      console.log("🚀 ~ useEffect ~ calendar:", calendar);

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
        { id: "saturday", title: "saturday" },
        { id: "sunday", title: "sunday" },
        { id: "monday", title: "monday" },
        { id: "tuesday", title: "tuesday" },
        { id: "wednesday", title: "wednesday" },
        { id: "thursday", title: "thursday" },
        { id: "friday", title: "friday" },
      ];

      calendar.setOption("resources", resources);

      const events = [
        {
          id: "1",
          title: "saturday",
          resourceId: "saturday",
          start: "2024-06-25T09:00:00",
          end: "2024-06-25T10:00:00",
          backgroundColor: "#369252",
        },
        {
          id: "2",
          title: "saturday",
          resourceId: "sunday",
          start: "2024-06-25T10:00:00",
          end: "2024-06-25T11:00:00",
          backgroundColor: "#393D94",
        },
        {
          id: "3",
          title: "monday",
          resourceId: "monday",
          start: "2024-06-25T11:00:00",
          end: "2024-06-25T12:00:00",
          backgroundColor: "#9C48AB",
        },
        {
          id: "4",
          title: "tuesday",
          resourceId: "tuesday",
          start: "2024-06-25T12:00:00",
          end: "2024-06-25T13:00:00",
          backgroundColor: "#025464",
        },
        {
          id: "5",
          title: "wednesday",
          resourceId: "wednesday",
          start: "2024-06-25T13:00:00",
          end: "2024-06-25T14:00:00",
          backgroundColor: "#025464",
        },
        {
          id: "6",
          title: "thursday",
          resourceId: "thursday",
          start: "2024-06-25T14:00:00",
          end: "2024-06-25T15:00:00",
          backgroundColor: "#393D94",
        },
        // {
        //   id: "7",
        //   title: "friday",
        //   resourceId: "friday",
        //   start: "2024-06-25T15:00:00",
        //   end: "2024-06-25T16:00:00",
        //   backgroundColor: "#393D94",

        // },
      ];

      calendar.setOption("events", events);

      return () => {
        calendar.destroy();
      };
    }
  }, []);

  return (
    <div>
      <div className="mt-16">
        <FullCalendar
          ref={calendarRef}
          plugins={[resourceTimelinePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="resourceTimelineDay"
          firstDay={1}
          slotLabelFormat={{
            // hour: "numeric",
            // hour12: true,

            hour: "numeric",
            minute: "2-digit",
            omitZeroMinute: false,
            hour12: false,
          }}
          slotMinTime={"09:00AM"}
          slotMaxTime={"19:00PM"}
          initialDate="2024-06-25"
        />
      </div>
    </div>
  );
};
export default StudyScheduleSecondStep;
