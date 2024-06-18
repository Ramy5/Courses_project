import { t } from "i18next";

interface DataCount_TP {
  dataTitle: string;
  dataColor: string;
  dataCount: number;
  dataIcon: React.ReactNode;
}

const DataCount = (props: DataCount_TP) => {
  const { dataTitle, dataColor, dataCount, dataIcon } = props;

  return (
    <div
      className="p-1 bg-white rounded-lg shadow-xl lg:p-3 border-s-8"
      style={{ borderColor: dataColor }}
    >
      <div className="flex gap-1 lg:gap-2">
        <span>{dataIcon}</span>

        <p className="flex flex-col items-center gap-2 font-bold lg:gap-4">
          <span className="text-sm truncate lg:text-lg">
            {t(`${dataTitle}`)}
          </span>
          <span className="text-lg lg:text-2xl">{dataCount}</span>
        </p>
      </div>
    </div>
  );
};

export default DataCount;
