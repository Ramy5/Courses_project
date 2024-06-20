import { t } from "i18next";
import { ReactNode } from "react";
import { FaUserAlt } from "react-icons/fa";
import { PiLessThan } from "react-icons/pi";
import { Link } from "react-router-dom";

type TitlePage_TP = {
  mainTitle?: string;
  supTitle?: string;
  mainLink?: string;
  icon?: ReactNode;
};

const TitlePage = ({ mainTitle, supTitle, mainLink, icon }: TitlePage_TP) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-mainGray opacity-90">
        {t(`${mainTitle}`)}
      </h2>
      <div className="flex items-center gap-2 my-5 text-black">
        <span>{icon}</span>
        <Link to={`${mainLink}`} className="cursor-pointer">
          {t(`${mainTitle}`)}
        </Link>
        {supTitle && (
          <>
            <PiLessThan size={16} className="fill-mainColor" />
            <p>{t(`${supTitle}`)}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default TitlePage;
