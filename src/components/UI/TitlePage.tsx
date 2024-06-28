import { t } from "i18next";
import { ReactNode } from "react";
import { PiLessThan } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";

type TitlePage_TP = {
  mainTitle?: string;
  supTitle?: string;
  mainLink?: string;
  ThirdTitle?: string;
  supLink?: string;
  ThirdLink?: string;
  icon?: ReactNode;
};

const TitlePage = ({
  mainTitle,
  supTitle,
  mainLink,
  ThirdTitle,
  icon,
  supLink,
  ThirdLink,
}: TitlePage_TP) => {
  console.log("🚀 ~ ThirdLink:", ThirdLink)
  // const location = useLocation();
  const currentPath = location.pathname;
  console.log("🚀 ~ currentPath:", currentPath);
  return (
    <div>
      <h2 className="text-3xl font-semibold text-mainGray opacity-90">
        {t(`${mainTitle}`)}
      </h2>
      <div className="flex items-center gap-2 my-5 text-black">
        <span>{icon}</span>
        {currentPath === mainLink ? (
          <span className="cursor-default">{t(`${mainTitle}`)}</span>
        ) : (
          <Link to={mainLink} className="cursor-pointer">
            {t(`${mainTitle}`)}
          </Link>
        )}

        {supTitle && (
          <>
            <PiLessThan size={16} className="fill-mainColor" />

            {currentPath === mainLink ? (
              <p>{t(`${supTitle}`)}</p>
            ) : (
              <Link to={supLink} className="cursor-pointer">
                <p>{t(`${supTitle}`)}</p>
              </Link>
            )}
          </>
        )}
        {ThirdTitle && (
          <>
            <PiLessThan size={16} className="fill-mainColor" />
            {currentPath === mainLink ? (
              <p>{t(`${ThirdTitle}`)}</p>
            ) : (
              <Link to={ThirdLink} className="cursor-pointer">
                <p>{t(`${ThirdTitle}`)}</p>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TitlePage;
