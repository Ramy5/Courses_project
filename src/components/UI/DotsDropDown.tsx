import { Button } from "..";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { t } from "i18next";
import { useRTL } from "../../hooks/useRTL";

type DotsDropDown_TP = {
  firstName?: string;
  firstIcon?: any;
  secondName?: string;
  secondIcon?: any;
  anotherName?: string;
  anotherIcon?: any;
  isOpen: boolean;
  isLastRow?: boolean;
  onToggle?: () => void;
  onFirstClick?: () => void;
  onSecondClick?: () => void;
  onAnotherClick?: () => void;
};

const DotsDropDown = ({
  firstName,
  firstIcon,
  secondName,
  secondIcon,
  anotherName,
  anotherIcon,
  isOpen,
  isLastRow,
  onToggle,
  onFirstClick,
  onSecondClick,
  onAnotherClick,
}: DotsDropDown_TP) => {
  const isRTL = useRTL();

  return (
    <div
      className={`${
        isLastRow === true || isLastRow === false ? "m-auto" : "m-0"
      } relative w-fit`}
    >
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
          isLastRow ? "bottom-10" : "top-7"
        } ${
          isLastRow != undefined
            ? `${isRTL ? "left-0" : "right-0"}`
            : `${isRTL ? "left-0" : "right-0"}`
        } transition-all duration-150 absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        {anotherName && (
          <li
            className="py-1 cursor-pointer"
            role="none"
            onClick={onAnotherClick}
          >
            <div className="flex items-center gap-2 px-4 py-2 text-mainColor">
              {anotherIcon}
              <p className="text-base font-medium">{t(`${anotherName}`)}</p>
            </div>
          </li>
        )}

        <li className="py-1 cursor-pointer" role="none" onClick={onFirstClick}>
          <div className="flex items-center gap-2 px-4 py-2 text-mainColor">
            {firstIcon}
            <p className="text-base font-medium">{t(`${firstName}`)}</p>
          </div>
        </li>

        <li className="py-1 cursor-pointer" role="none" onClick={onSecondClick}>
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
