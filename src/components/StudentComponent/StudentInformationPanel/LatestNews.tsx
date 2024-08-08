import { t } from "i18next";
import React from "react";

interface LatestNews_TP {
  titleHead: string;
  data: string[];
}

const LatestNews: React.FC<LatestNews_TP> = ({ titleHead, data }) => {
  return (
    <div className=" rounded-xl">
      <div className="p-3 text-white bg-mainColor rounded-tr-xl rounded-tl-xl">
        <h2>{t(titleHead)}</h2>
      </div>
      <div className="bg-white rounded-br-xl rounded-bl-xl">
        {data?.map((item, index) => (
          <div className="p-3 border-b-2 border-b-slate-200" key={index}>
            {t(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
