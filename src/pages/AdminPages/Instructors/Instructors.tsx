import { t } from "i18next";
import Select from "react-select";
import {
  Button,
  DotsDropDown,
  SearchInput,
  TitlePage,
} from "../../../components";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/UI/Pagination";
import { FaUserAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import customFetch from "../../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../../components/UI/Loading";

const Instructors = () => {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>()
  console.log("🚀 ~ Instructors ~ page:", page)

  const navigate = useNavigate();

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const fetchInstructorData = async () => {
    const response = await customFetch(`/allTeachers?page=${page}`);
    return response;
  };

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["allTeacher_data"],
    queryFn: fetchInstructorData,
  });

  const deleteInstructor = async (instructorId) => {
    const response = await customFetch.delete(`/teacher/${instructorId}`);
    return response;
  };

  const { mutate } = useMutation({
    mutationKey: ["add-instructor-contact"],
    mutationFn: deleteInstructor,
    onSuccess: (data) => {
      queryClient.invalidateQueries("delete_instructor");
      toast.success(`${t("the instructor has been successfully deleted")}`);
      refetch();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0];
      toast.error(errorMessage);
    },
  });

  const instructorData = data?.data.data.teachers || {};
  const instructorPagination = data?.data.data || {};
  console.log("🚀 ~ Instructors ~ instructorPagination:", instructorPagination);
  console.log("🚀 ~ Instructors ~ instructorData:", instructorData);

  useEffect(() => {
    if (error) {
      toast.error(`${error.message}`);
    }
  }, [error]);

  useEffect(() => {
    refetch()
  }, [page]);

  const handleProfileClick = (instructorId: number) => {
    navigate(`/instructors/instructorProfile/${instructorId}`);
  };

  const handleToggleDropDown = (id: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  };

  if (isLoading || isRefetching) return <Loading />;

  return (
    <div>
      <div>
        <TitlePage
          mainTitle="instructors"
          supTitle=""
          icon={<FaUserAlt size={22} className="fill-mainColor" />}
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-white rounded-2xl">
        <Select options={options} placeholder="short by" />

        <SearchInput />

        <Button
          type="button"
          className="text-xl font-medium"
          action={() => navigate("/instructors/add")}
        >
          {t("add lecturer +")}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 my-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {instructorData?.map((instructor, index) => (
          <div
            key={index}
            className="p-4 text-center bg-white rounded-2xl main_shadow"
          >
            <div className="flex items-center justify-end w-full">
              <DotsDropDown
                firstName="edit"
                firstIcon={<GrView size={22} className="fill-mainColor" />}
                secondName="delete"
                secondIcon={
                  <RiDeleteBin5Line size={22} className="fill-mainRed" />
                }
                isOpen={openRow == instructor.id}
                onToggle={() => handleToggleDropDown(instructor.id)}
                onFirstClick={() => {
                  navigate(`/instructors/edit/${instructor.id}`);
                }}
                onSecondClick={() => {
                  // setInstructorId(instructor.id);
                  mutate(instructor.id);
                }}
              />
            </div>
            <div className="w-full my-2">
              <img
                src={instructor.personal_image}
                alt={instructor.name}
                className="rounded-full  m-auto w-[135px] h-[135px]"
              />
            </div>
            <div className="text-mainGray opacity-55">
              <p>{instructor.full_name}</p>
              <p>{instructor.job_title}</p>
            </div>
            <Button
              className="border border-[#404B52] text-black font-medium mt-3"
              bordered
              action={() => handleProfileClick(instructor.id)}
            >
              {t("profile personly")}
            </Button>
          </div>
        ))}
      </div>

      {instructorPagination?.totalPages > 1 && (
        <div>
          <Pagination
            showNavigation={true}
            currentPage={instructorPagination?.currentPage}
            totalPages={instructorPagination?.totalPages}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default Instructors;
