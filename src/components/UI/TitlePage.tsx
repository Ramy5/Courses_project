import { t } from "i18next";
import { FaUserAlt } from "react-icons/fa";
import { PiLessThan } from "react-icons/pi";
import { Link } from "react-router-dom";

type TitlePage_TP = {
  mainTitle: String;
  supTitle: String;
  mainLink: String;
};

const TitlePage = ({ mainTitle, supTitle, mainLink }: TitlePage_TP) => {
  return (
    <div>
      <h2 className="text-mainGray font-semibold text-3xl opacity-90">
        {t(`${mainTitle}`)}
      </h2>
      <div className="flex items-center gap-2 text-black my-5">
        <FaUserAlt size={22} className="fill-mainColor" />
        <Link to={`${mainLink}`} className="cursor-pointer">
          {t(`${mainTitle}`)}
        </Link>
        {supTitle && (
          <>
            <PiLessThan size={22} className="fill-mainColor" />
            <p>{t(`${supTitle}`)}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default TitlePage;
