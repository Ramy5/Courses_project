import { t } from "i18next";
import banarBook from "../../../assets/students/banarBook.svg";

interface Banar_TP {
  banarTitle: string;
  isProject?: boolean;
  banarMaterial?: string;
}

const Banar = (props: Banar_TP) => {
  const { banarTitle, isProject, banarMaterial } = props;

  return (
    <div
      className="flex items-center justify-between py-4 rounded-2xl"
      style={{
        background:
          "linear-gradient(180deg, #84BCE7 0%, #A7CDEA 50%, #D9EFF7 100%)",
      }}
    >
      <div className="px-8">
        <h2 className="mb-3 text-xl font-bold lg:text-4xl text-mainColor">
          {isProject ? t("project") : t("homework")} : {t(banarTitle)}
        </h2>
        <p className="text-lg text-gray-600 lg:text-2xl">
          {t(banarMaterial) || t(banarTitle)}
        </p>
      </div>

      {!isProject && (
        <div className="hidden lg:block">
          <img src={banarBook} alt="book" />
        </div>
      )}
    </div>
  );
};

export default Banar;
