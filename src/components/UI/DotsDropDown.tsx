import { useState } from "react";
import { Button } from "..";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { t } from "i18next";
import { useRTL } from "../../hooks/useRTL";
import { useNavigate } from "react-router-dom";
import { GrView } from "react-icons/gr";

type DotsDropDown_TP = {
  instructorId?: number;
  instructorRoute?: string;
  firstName: string;
  firstIcon: any;
  secondName?: string;
  secondIcon?: any;
};

const DotsDropDown = ({
  instructorId,
  instructorRoute,
  firstName,
  firstIcon,
  secondName,
  secondIcon,
}: DotsDropDown_TP) => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const isRTL = useRTL();
  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(`${instructorRoute}/${instructorId}`);
  };

  const handleClickDelete = () => {};

  return (
    <div className="relative">
      <Button
        className="p-0 bg-transparent text-mainGray"
        type="button"
        action={() => {
          setDropDown(!dropDown);
        }}
      >
        <HiOutlineDotsHorizontal
          size={35}
          className="fill-mainGray opacity-55"
        />
      </Button>

      <ul
        className={`${dropDown ? "block" : "hidden"} ${
          isRTL ? "left-0" : "right-0"
        } transition-all duration-150 absolute top-7 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        <li
          className="py-1 cursor-pointer"
          role="none"
          onClick={handleClickEdit}
        >
          <div className="flex items-center gap-2 px-4 py-2 text-mainColor">
            {firstIcon}
            <p className="text-base font-medium">{t(`${firstName}`)}</p>
          </div>
        </li>

        <li
          className="py-1 cursor-pointer"
          role="none"
          onClick={handleClickDelete}
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
