import DotsDropDown from "../../UI/DotsDropDown";
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
import DefaultProfileCover from "../../../assets/instructors/profile-cover.svg";

const blockInstructor = async (
  instructorId: string,
  blockStatus: { blocked_status: number }
) => {
  const data = customFetch.post(`teacher/${instructorId}/status`, blockStatus);
  return data;
};

interface PersonlyProfile {
  personalData: any;
  blocking?: boolean;
  navigation?: string;
  deleteInstructor?: () => void;
}

const ProfileIntroduction = ({
  personalData,
  navigation,
  deleteInstructor,
}: PersonlyProfile) => {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { role: userData } = useAppSelector((state) => state.user);

  const handleToggleDropDown = (id: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  };

  const jobTitle =
    personalData?.qualifications && personalData?.qualifications[0]?.job_title;

  const { mutate: blockMutate } = useMutation({
    mutationKey: ["block-instructor"],
    mutationFn: (blockStatus) => blockInstructor(personalData?.id, blockStatus),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries("show-instructor");
      if (data?.data?.data?.teacher?.blocked_status === 0) {
        toast.success(t("instructor has unblocked successfully"));
      } else {
        toast.success(t("instructor has blocked successfully"));
      }
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleBlockInstructor = async (blockStudent: number) => {
    const status = {
      blocked_status: blockStudent,
    };

    await blockMutate(status);
  };

  return (
    <div className="relative">
      <img
        src={DefaultProfileCover}
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
            <h2
              className={`text-lg font-semibold md:text-xl ${
                !jobTitle && "-mt-12"
              }`}
            >
              {personalData.full_name}
            </h2>
            <p className="text-sm font-medium md:text-base">{jobTitle}</p>
          </div>
        </div>

        <div>
          <DotsDropDown
            firstName="edit"
            firstIcon={<FaRegEdit size={22} className="fill-mainColor" />}
            secondName="delete"
            secondIcon={<RiDeleteBin5Line size={22} className="fill-mainRed" />}
            anotherName="school schedule"
            anotherIcon={<FiCalendar size={24} />}
            isOpen={openRow == personalData.id}
            onToggle={() => handleToggleDropDown(personalData.id)}
            onFirstClick={() => {
              navigate(`${navigation}${personalData.id}`);
            }}
            onSecondClick={() => {
              deleteInstructor();
              navigate(-1);
            }}
            onAnotherClick={() => {
              navigate(`/instructors/schedule/${personalData.id}`);
            }}
            blockedName={`${
              userData === "admin"
                ? personalData?.blocked_status === 0
                  ? "blocking instructor"
                  : "Unblock"
                : ""
            }`}
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
                  ? handleBlockInstructor(1)
                  : handleBlockInstructor(0);

              return blockedStatus;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileIntroduction;
