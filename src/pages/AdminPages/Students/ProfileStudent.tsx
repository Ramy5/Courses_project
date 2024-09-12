import MainCheckBox from "../../UI/MainCheckBox";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import studentProfileImg from "../../../assets/students/studentProfileImg.svg";
import { TbLock, TbLockOpen2 } from "react-icons/tb";
import customFetch from "../../../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { t } from "i18next";
import defaultProfileCover from "../../../assets/instructors/profile-cover.svg";
import { DotsDropDown } from "../../../components";

const blockStudent = async (
  instructorId: string,
  blockStatus: { blocked_status: number }
) => {
  const data = customFetch.post(`student/${instructorId}/status`, blockStatus);
  return data;
};

interface PersonlyProfile {
  personalData: any;
  blocking?: boolean;
  deleteStudent?: () => void;
}

const ProfileStudent = ({
  personalData,
  deleteStudent,
}: PersonlyProfile) => {
  console.log("🚀 ~ personalData:", personalData);
  const [openRow, setOpenRow] = useState<number | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { role: userData } = useAppSelector((state) => state.user);

  const handleToggleDropDown = (id: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  };

  const { mutate: blockMutate } = useMutation({
    mutationKey: ["block-student"],
    mutationFn: (blockStatus) => blockStudent(personalData?.id, blockStatus),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries("show-student");
      if (data?.data?.data?.teacher?.blocked_status === 0) {
        toast.success(t("student has unblocked successfully"));
      } else {
        toast.success(t("student has blocked successfully"));
      }
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleBlockStudent = async (blockStudent: number) => {
    const status = {
      blocked_status: blockStudent,
    };

    await blockMutate(status);
  };

  return (
    <div className="relative">
      <img
        src={personalData?.profileCover || defaultProfileCover}
        alt="profile"
        className="bg-center bg-cover bg-no-repeat h-[200px] rounded-2xl object-cover"
      />
      <div className="absolute flex items-end justify-between w-full md:px-12 px-5 md:top-32 top-[155px]">
        <div className="flex items-end gap-3">
          <img
            src={personalData.personal_image || studentProfileImg}
            alt="personal Image"
            className="border-[3px] border-[#393D94] rounded-full md:w-[134px] w-24 md:h-[134px] h-24"
          />
          <div className="text-black">
            <h2 className="text-lg font-semibold md:text-xl -mt-12">
              {personalData.full_name}
            </h2>
          </div>
        </div>

        <div>
          <DotsDropDown
            firstName="edit"
            firstIcon={<FaRegEdit size={22} className="fill-mainColor" />}
            secondName="delete"
            secondIcon={<RiDeleteBin5Line size={22} className="fill-mainRed" />}
            isOpen={openRow == personalData.id}
            onToggle={() => handleToggleDropDown(personalData.id)}
            onFirstClick={() => {
              navigate(`/students/${personalData.id}`);
            }}
            onSecondClick={() => {
              deleteStudent();
              navigate(-1);
            }}
            blockedName={`${userData === "admin" ? "block student" : ""}`}
            blockedIcon={
              personalData?.blocked_status === 0 ? (
                <TbLockOpen2 size={22} className="text-mainColor" />
              ) : (
                <TbLock size={22} className="text-mainColor" />
              )
            }
            onBlockedClick={() => {
              const blockedStatus =
                personalData?.blocked_status === 0
                  ? handleBlockStudent(1)
                  : handleBlockStudent(0);

              return blockedStatus;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileStudent;
