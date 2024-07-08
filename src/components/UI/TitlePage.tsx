import { t } from "i18next";
import { ReactNode } from "react";
import { PiLessThan } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";

type TitlePage_TP = {
  title?: string;
  mainTitle?: string;
  supTitle?: string;
  mainLink?: string;
  ThirdTitle?: string;
  supLink?: string;
  ThirdLink?: string;
  icon?: ReactNode;
};

const TitlePage = ({
  title,
  mainTitle,
  supTitle,
  mainLink,
  ThirdTitle,
  icon,
  supLink,
  ThirdLink,
}: TitlePage_TP) => {  // const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-mainGray opacity-90">
        {title ? t(`${title}`) : t(`${mainTitle}`)}
      </h2>
      <div className="flex items-center gap-1 my-5 text-black">
        <span>{icon}</span>
        {currentPath === mainLink ? (
          <p className="cursor-default text-[15px]">{t(`${mainTitle}`)}</p>
        ) : (
          <Link to={mainLink} className="cursor-pointer text-[15px]">
            {t(`${mainTitle}`)}
          </Link>
        )}

        {supTitle && (
          <>
            <PiLessThan size={16} className="fill-mainColor" />

            {currentPath === mainLink ? (
              <p className="text-[15px]">{t(`${supTitle}`)}</p>
            ) : (
              <Link to={supLink} className="cursor-pointer">
                <p className="text-[15px]">{t(`${supTitle}`)}</p>
              </Link>
            )}
          </>
        )}
        {ThirdTitle && (
          <>
            <PiLessThan size={16} className="fill-mainColor" />
            {currentPath === mainLink ? (
              <p className="text-[15px]">{t(`${ThirdTitle}`)}</p>
            ) : (
              <Link to={ThirdLink} className="cursor-pointer">
                <p className="text-[15px]">{t(`${ThirdTitle}`)}</p>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TitlePage;
