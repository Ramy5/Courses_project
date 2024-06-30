import { t } from "i18next";
import banarBook from "../../../assets/students/banarBook.svg";

interface Banar_TP {
  banarTitle: string;
  isProject?: boolean;
}

const Banar = (props) => {
  const { banarTitle, isProject } = props;

  return (
    <div
      className="flex items-center justify-between rounded-3xl"
      style={{
        background:
          "linear-gradient(180deg, #84BCE7 0%, #A7CDEA 50%, #D9EFF7 100%)",
      }}
    >
      <div className="px-8">
        <h2 className="mb-3 text-4xl font-bold text-mainColor">
          {isProject ? t("project") : t("homework")} : {t(banarTitle)}
        </h2>
        <p className="text-2xl text-gray-600">{t(banarTitle)}</p>
      </div>

      {!isProject && (
        <div>
          <img src={banarBook} alt="book" />
        </div>
      )}
    </div>
  );
};

export default Banar;
