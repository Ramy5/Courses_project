import { Button } from "..";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { t } from "i18next";
import { useRTL } from "../../hooks/useRTL";
import { useNavigate } from "react-router-dom";

type DotsDropDown_TP = {
  instructorId?: number;
  instructorRoute?: string;
  firstName?: string;
  firstIcon?: any;
  secondName?: string;
  secondIcon?: any;
  isOpen: boolean;
  isLastRow?: boolean;
  onToggle?: () => void;
  onFirstClick?: () => void;
  onSecondClick?: () => void;
};

const DotsDropDown = ({
  firstName,
  firstIcon,
  secondName,
  secondIcon,
  isOpen,
  isLastRow,
  onToggle,
  onFirstClick,
  onSecondClick
}: DotsDropDown_TP) => {
  const isRTL = useRTL();

  return (
    <div className="relative">
      <Button
        className="p-0 bg-transparent text-mainGray"
        type="button"
        action={onToggle}
      >
        <HiOutlineDotsHorizontal
          size={35}
          className="fill-mainGray opacity-55"
        />
      </Button>

      <ul
        className={`${isOpen ? "block" : "hidden"} ${
          isLastRow ? "bottom-11" : "top-7"
        } ${
          isLastRow != undefined
            ? `${isRTL ? "left-4" : "right-4"}`
            : `${isRTL ? "left-0" : "right-0"}`
        } transition-all duration-150 absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        <li
          className="py-1 cursor-pointer"
          role="none"
          onClick={onFirstClick}
        >
          <div className="flex items-center gap-2 px-4 py-2 text-mainColor">
            {firstIcon}
            <p className="text-base font-medium">{t(`${firstName}`)}</p>
          </div>
        </li>

        <li
          className="py-1 cursor-pointer"
          role="none"
          onClick={onSecondClick}
        >
          <div
            className={`${
              secondIcon.props.className === "fill-mainRed"
                ? "text-mainRed"
                : "text-mainColor"
            } flex items-center gap-2 px-4 py-2`}
          >
            {secondIcon}
            <p className="text-base font-medium">{t(`${secondName}`)}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DotsDropDown;
