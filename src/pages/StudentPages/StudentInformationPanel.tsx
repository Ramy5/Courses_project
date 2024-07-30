import {
  LatestNews,
  Statistics,
  StudentBanar,
  StudentLecturesBoxes,
} from "../../components";
import { t } from "i18next";
import { useAppSelector } from "../../hooks/reduxHooks";

const StudentInformationPanel = () => {
  const latestNewsData = [
    {
      titleHead: "latest lectures",
      data: [
        "first project added physics course",
        "first project added physics course",
        "first project added physics course",
      ],
    },
    {
      titleHead: "latest tests",
      data: [
        "first homework added physics course",
        "first homework added physics course",
        "first homework added physics course",
      ],
    },
    {
      titleHead: "latest projects",
      data: [
        "first project added physics course",
        "first project added physics course",
        "first project added physics course",
      ],
    },
    {
      titleHead: "latest homeworks",
      data: [
        "first homework added physics course",
        "first homework added physics course",
        "first homework added physics course",
      ],
    },
  ];

  const progressData = [
    { title: "tests", percentage: 77 },
    { title: "projects", percentage: 33 },
    { title: "homeworks", percentage: 50 },
    { title: "lectures", percentage: 5 },
  ];

  return (
    <div className="space-y-10">
      {/* STUDENT BANAR */}
      <StudentBanar />

      {/* STUDENT LECTURES BOXES */}
      <StudentLecturesBoxes />

      {/* NEWS */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        {latestNewsData.map((latestNew, index) => {
          return (
            <LatestNews
              key={index}
              titleHead={latestNew.titleHead}
              data={latestNew.data}
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
