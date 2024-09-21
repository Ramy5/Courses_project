import { ColumnDef } from "@tanstack/react-table";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { Table } from "../../../components";
import { FaRegCheckCircle, FaRegEdit } from "react-icons/fa";
import customFetch from "../../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customStyles } from "../../../utils/selectStyles";
import Loading from "../../../components/UI/Loading";
import Pagination from "../../../components/UI/Pagination";
import { toast } from "react-toastify";
import BaseSelect from "../../../components/UI/BaseSelect";

const getLectureManagement = async (
  page: number,
  instructorSelectId?: string | number
) => {
  const { data } = await customFetch(
    `manage?page=${page}&teacher_id=${instructorSelectId}`
  );
  return data.data;
};

const postLectureDateAndLinks = async (
  lectureId: number | string,
  lectureDateOrLink: string | Date
) => {
  const response = await customFetch.post(
    `updateZoomYoutube/${lectureId}`,
    lectureDateOrLink
  );
  return response;
};

const getInstructorOption = async () => {
  const { data } = await customFetch("allTeachers");
  return data.data.teachers;
};

const LectureManagement = () => {
  const [instructorSelectId, setInstructorSelectId] = useState("");
  const [lecturesData, setLecturesData] = useState([]);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  // LECTURE DATE
  const [lectureDate, setLectureDate] = useState("");
  const [lecturesDateEditId, setLecturesDataEditId] = useState(null);
  // LECTURE ZOOM
  const [lectureZoom, setLectureZoom] = useState("");
  const [lecturesZoomEditId, setLecturesZoomEditId] = useState(null);
  // LECTURE YOUTUBE
  const [lectureYoutube, setLectureYoutube] = useState("");
  const [lecturesYoutubeEditId, setLecturesYoutubeEditId] = useState(null);

  const initialValues = {};

  const { data, isLoading, isFetching, isRefetching, refetch } = useQuery({
    queryKey: ["get-lecture-management"],
    queryFn: () => getLectureManagement(page, instructorSelectId),
  });

  console.log("🚀 ~ LectureManagement ~ data:", data);
  useEffect(() => {
    refetch();
  }, [instructorSelectId, refetch, page]);

  const {
    data: instructorsOption,
    isLoading: instructorsIsLoading,
    isFetching: instructorsIsFetching,
    isRefetching: instructorsIsRefetching,
  } = useQuery({
    queryKey: ["get-instructor-option"],
    queryFn: getInstructorOption,
    select: (data: any) => {
      const transformedData = data?.map((teacher) => {
        return {
          id: teacher?.id,
          label: teacher?.full_name,
          value: teacher?.id,
        };
      });
  
      return [{ id: "", value: "", label: "الكل" }, ...transformedData];
    },
  });
  console.log("🚀 ~ LectureManagement ~ instructorsOption:", instructorsOption);

  useEffect(() => {
    if (data) {
      setLecturesData(data?.lectures);
    }
  }, [data]);

  const { mutate: mutateDate } = useMutation({
    mutationKey: ["update-date-links-lecture"],
    mutationFn: (lectureDateOrLink) =>
      postLectureDateAndLinks(lecturesDateEditId, lectureDateOrLink),
    onSuccess: (data) => {
      queryClient.invalidateQueries("get-lecture-management");
      toast.success(t("lecture date has updated successfully"));
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error;
      toast.error(errorMessage);
    },
  });

  const handleLectureDateEdit = (id: number) => {
    const updateDate = lecturesData?.find((lecture) => lecture.id === id);
    setLectureDate(updateDate?.date);
    setLecturesDataEditId(id);
  };

  const handleLectureDateAdd = async () => {
    const updateDate = lecturesData.map((lecture) => {
      return lecture.id === lecturesDateEditId
        ? { ...lecture, date: lectureDate }
        : lecture;
    });

    const lectureDateOrLink = {
      date: lectureDate,
    };

    await mutateDate(lectureDateOrLink);

    setLecturesData(updateDate);
    setLecturesDataEditId(null);
  };

  const { mutate: mutateZoomLink } = useMutation({
    mutationKey: ["update-date-links-lecture"],
    mutationFn: (lectureDateOrLink) =>
      postLectureDateAndLinks(lecturesZoomEditId, lectureDateOrLink),
    onSuccess: (data) => {
      queryClient.invalidateQueries("get-lecture-management");
      toast.success(t("lecture zoom link has updated successfully"));
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error;
      toast.error(errorMessage);
    },
  });

  const handleLectureZoomEdit = (id: number) => {
    const updateZoom = lecturesData.find((lecture) => lecture.id === id);
    setLectureZoom(updateZoom?.zoomLink);
    setLecturesZoomEditId(id);
  };

  const handleLectureZoomAdd = async () => {
    const updateZoom = lecturesData.map((lecture) => {
      return lecture.id === lecturesZoomEditId
        ? { ...lecture, zoomLink: lectureZoom }
        : lecture;
    });

    const lectureDateOrLink = {
      zoom_link: lectureZoom,
    };

    await mutateZoomLink(lectureDateOrLink);

    setLecturesData(updateZoom);
    setLecturesZoomEditId(null);
  };

  const { mutate: mutateYoutubeLink } = useMutation({
    mutationKey: ["update-date-links-lecture"],
    mutationFn: (lectureDateOrLink) =>
      postLectureDateAndLinks(lecturesYoutubeEditId, lectureDateOrLink),
    onSuccess: (data) => {
      queryClient.invalidateQueries("get-lecture-management");
      toast.success(t("lecture youtube link has updated successfully"));
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error;
      toast.error(errorMessage);
    },
  });

  const handleLectureYoutubeEdit = (id: number) => {
    const updateYoutube = lecturesData.find((lecture) => lecture.id === id);
    setLectureYoutube(updateYoutube?.youtubeLink);
    setLecturesYoutubeEditId(id);
  };

  const handleLectureYoutubeAdd = async () => {
    const updateYoutube = lecturesData.map((lecture) => {
      return lecture.id === lecturesYoutubeEditId
        ? { ...lecture, youtubeLink: lectureYoutube }
        : lecture;
    });

    const lectureDateOrLink = {
      youtube_link: lectureYoutube,
    };

    await mutateYoutubeLink(lectureDateOrLink);

    setLecturesData(updateYoutube);
    setLecturesYoutubeEditId(null);
  };

  const lecturesColumns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        header: () => <span className="w-8">{t("lecture number")}</span>,
        accessorKey: "lectureNumber",
        cell: (info) => info.row.index + 1,
      },
      {
        header: () => <span>{t("date")}</span>,
        accessorKey: "date",
        cell: (info) => {
          if (info.row.original.status === "completed") {
            return info.getValue();
          } else {
            return (
              <div className="flex items-center justify-center gap-1 w-34">
                {lecturesDateEditId === info.row.original.id ? (
                  <>
                    <input
                      type="date"
                      className="px-2 border rounded-lg border-mainColor"
                      value={lectureDate}
                      onChange={(e) => setLectureDate(e.target.value)}
                    />
                    <FaRegCheckCircle
                      onClick={handleLectureDateAdd}
                      className="text-xl cursor-pointer text-[#619439] "
                    />
                  </>
                ) : (
                  <>
                    <span>{info.getValue()}</span>
                    <FaRegEdit
                      onClick={() =>
                        handleLectureDateEdit(info.row.original.id)
                      }
                      className="text-xl cursor-pointer text-mainColor"
                    />
                  </>
                )}
              </div>
            );
          }
        },
      },
      {
        header: () => <span>{t("subject")}</span>,
        accessorKey: "subject",
        cell: (info) => (
          <span className="inline-block text-wrap">
            {info.row.original?.course?.course_name}
          </span>
        ),
      },
      {
        header: () => <span>{t("program")}</span>,
        accessorKey: "program",
        cell: (info) => (
          <span className="inline-block text-wrap">
            {info.row.original?.program?.program_name}
          </span>
        ),
      },
      {
        header: () => <span>{t("level")}</span>,
        accessorKey: "level",
        cell: (info) => (
          <span className="inline-block w-2 text-wrap">{info.getValue()}</span>
        ),
      },
      {
        header: () => <span>{t("group")}</span>,
        accessorKey: "group",
        cell: (info) => (
          <span className="inline-block w-2 text-wrap">{info.getValue()}</span>
        ),
      },
      {
        header: () => <span>{t("zoom link")}</span>,
        accessorKey: "zoom_link",
        cell: (info) => {
          if (info.row.original.status === "completed") {
            return (
              <a href={info.getValue()} target="_blank" className="truncate">
                {info.getValue()}
              </a>
            );
          } else if (info.row.original.status === "inProgress") {
            return (
              <div className="flex items-center justify-center w-56 gap-1">
                {lecturesZoomEditId === info.row.original.id ? (
                  <>
                    <input
                      type="url"
                      className="px-2 border rounded-lg border-mainColor"
                      value={lectureZoom}
                      onChange={(e) => setLectureZoom(e.target.value)}
                    />
                    <FaRegCheckCircle
                      onClick={handleLectureZoomAdd}
                      className="text-xl cursor-pointer text-[#619439] "
                    />
                  </>
                ) : (
                  <>
                    <a
                      href={info.getValue()}
                      target="_blank"
                      className="truncate"
                    >
                      {info.getValue()}
                    </a>
                    <FaRegEdit
                      onClick={() =>
                        handleLectureZoomEdit(info.row.original.id)
                      }
                      className="w-16 text-xl cursor-pointer text-mainColor"
                    />
                  </>
                )}
              </div>
            );
          } else if (info.row.original.status === "setup") {
            return (
              <div
                className={`flex items-center ${
                  info.getValue() ? "justify-center" : "justify-end"
                } w-56 gap-1`}
              >
                {lecturesZoomEditId === info.row.original.id ? (
                  <>
                    <input
                      type="url"
                      className="px-2 border rounded-lg border-mainColor"
                      value={lectureZoom}
                      onChange={(e) => setLectureZoom(e.target.value)}
                    />
                    <FaRegCheckCircle
                      onClick={handleLectureZoomAdd}
                      className="text-xl cursor-pointer text-[#619439] "
                    />
                  </>
                ) : (
                  <>
                    <a
                      href={info.getValue()}
                      target="_blank"
                      className="truncate"
                    >
                      {info.getValue()}
                    </a>
                    <FaRegEdit
                      onClick={() =>
                        handleLectureZoomEdit(info.row.original.id)
                      }
                      className="w-16 text-xl cursor-pointer text-mainColor"
                    />
                  </>
                )}
              </div>
            );
          }
        },
      },
      {
        header: () => <span>{t("youtube link")}</span>,
        accessorKey: "youtube_link",
        cell: (info) => {
          if (info.row.original.status === "completed") {
            return (
              <div className="flex items-center justify-center w-56 gap-1">
                {lecturesYoutubeEditId === info.row.original.id ? (
                  <>
                    <input
                      type="url"
                      className="px-2 border rounded-lg border-mainColor"
                      value={lectureYoutube}
                      onChange={(e) => setLectureYoutube(e.target.value)}
                    />
                    <FaRegCheckCircle
                      onClick={handleLectureYoutubeAdd}
                      className="text-xl cursor-pointer text-[#619439] "
                    />
                  </>
                ) : (
                  <>
                    <a
                      href={info.getValue()}
                      target="_blank"
                      className="truncate"
                    >
                      {info.getValue()}
                    </a>
                    <FaRegEdit
                      onClick={() =>
                        handleLectureYoutubeEdit(info.row.original.id)
                      }
                      className="w-16 text-xl cursor-pointer text-mainColor"
                    />
                  </>
                )}
              </div>
            );
          } else {
            return (
              <a href={info.getValue()} target="_blank" className="truncate">
                {info.getValue()}
              </a>
            );
          }
        },
      },
      {
        header: () => <span>{t("lecture status")}</span>,
        accessorKey: "status",
        cell: (info) => {
          const status = info.getValue();
          let statusClass = "";
          if (status === "setup") {
            statusClass = "bg-[#FF4E4E]";
          } else if (status === "inProgress") {
            statusClass = "bg-[#FCC779] !text-black";
          } else if (status === "completed") {
            statusClass = "bg-[#619439]";
          }
          return (
            <span
              className={`inline-block w-full py-1 px-2 rounded-full text-white ${statusClass}`}
            >
              {t(status)}
            </span>
          );
        },
      },
    ],
    [
      lecturesDateEditId,
      handleLectureDateAdd,
      handleLectureDateEdit,
      lectureDate,
      handleLectureZoomAdd,
      handleLectureZoomEdit,
      lectureZoom,
      lecturesZoomEditId,
      handleLectureYoutubeAdd,
      handleLectureYoutubeEdit,
      lectureYoutube,
      lecturesYoutubeEditId,
    ]
  );

  if (isLoading || isFetching || isRefetching) return <Loading />;

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {}}>
      {({ setFieldValue }) => {
        return (
          <Form>
            <div className="bg-white rounded-2xl">
              <div className="p-6">
                <h2 className="mb-4 text-2xl font-bold">
                  {t("lecture management")}
                </h2>

                <div className="lg:w-[25vw] ">
                 
                    className="mt-1"
                    id="instructor"
                    name="instructor"
                    label={t("instructor")}
                    options={instructorsOption}
                    styles={customStyles}
                    placeholder={t("everyone")}
                    onChange={(e) => {
                      setInstructorSelectId(e.value);
                      setFieldValue("instructor", e.value);
                    }}
                  />
                </div>
              </div>
              {/* TABLE */}
              <Table data={lecturesData || []} columns={lecturesColumns} />

              {/* PAGINATION */}
              <div>
                <Pagination
                  totalPages={data?.totalPages}
                  showNavigation
                  setPage={setPage}
                  currentPage={data?.currentPage}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LectureManagement;
