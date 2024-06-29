import { t } from "i18next";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Statistics_TP {
  title: string;
  percentage: number;
}

const Statistics = ({ title, percentage }: Statistics_TP) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-xl font-bold">{t(title)}</h3>

      <div>
        <CircularProgressbar
          className="grid text-xl font-bold w-28"
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={9}
          styles={buildStyles({
            textColor: "#000",
            pathColor: "#3F51B5",
            trailColor: "#d6d6d6",
          })}
        />
      </div>
    </div>
  );
};

export default Statistics;
