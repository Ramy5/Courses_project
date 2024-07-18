import { ColumnDef } from "@tanstack/react-table";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { Table } from "../../../components";
import { FaRegCheckCircle, FaRegEdit } from "react-icons/fa";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { customStyles } from "../../../utils/selectStyles";
import Loading from "../../../components/UI/Loading";
import Pagination from "../../../components/UI/Pagination";

const getLectureManagement = async (instructorSelectId?: string | number) => {
  const data = customFetch(`manage?teacher_id=${instructorSelectId}`);
  return data.data;
};

const getInstructorOption = async () => {
  const { data } = await customFetch("allTeachers");
  return data.data.teachers;
};

const LectureManagement = () => {
  const [instructorSelectId, setInstructorSelectId] = useState("");
  const [lecturesData, setLecturesData] = useState([]);

  const initialValues = {};

  const lectures = [
    {
      index: 1,
      lectureNumber: 3,
      date: "5/1/2024",
      subject: "Physics",
      program: "Computer Science",
      level: "3",
      section: "Group 2",
      zoomLink: "",
      youtubeLink: "not available yet",
      lectureStatus: "under preparation",
    },
    {
      index: 2,
      lectureNumber: 3,
      date: "5/1/2024",
      subject: "Physics",
      program: "Computer Science",
      level: "3",
      section: "Group 1",
      zoomLink: "",
      youtubeLink: "not available yet",
      lectureStatus: "under preparation",
    },
    {
      index: 3,
      lectureNumber: 2,
      date: "5/1/2024",
      subject: "Physics",
      program: "Computer Science",
      level: "3",
      section: "Group 2",
      zoomLink: "https://zoom.us/j",
      youtubeLink: "not available yet",
      lectureStatus: "in progress",
    },
    {
      index: 4,
      lectureNumber: 2,
      date: "5/1/2024",
      subject: "Physics",
      program: "Computer Science",
      level: "3",
      section: "Group 1",
      zoomLink: "https://zoom.us/j",
      youtubeLink: "not available yet",
      lectureStatus: "in progress",
    },
    {
      index: 5,
      lectureNumber: 1,
      date: "5/1/2024",
      subject: "Physics",
      program: "Computer Science",
      level: "3",
      section: "Group 2",
      zoomLink: "https://zoom.us/j",
      youtubeLink: "https://youtube.us/j",
      lectureStatus: "completed",
    },
    {
      index: 6,
      lectureNumber: 1,
      date: "5/1/2024",
      subject: "Physics",
      program: "Computer Science",
      level: "3",
      section: "Group 2",
      zoomLink: "https://zoom.us/j",
      youtubeLink: "https://youtube.us/j",
      lectureStatus: "completed",
    },
  ];

  const { data, isLoading, isFetching, isRefetching, refetch } = useQuery({
    queryKey: ["get-lecture-management"],
    queryFn: () => getLectureManagement(instructorSelectId),
  });
  console.log("🚀 ~ LectureManagement ~ data:", data);

  useEffect(() => {
    refetch();
  }, [instructorSelectId, refetch]);

  const {
    data: instructorsOption,
    isLoading: instructorsIsLoading,
    isFetching: instructorsIsFetching,
    isRefetching: instructorsIsRefetching,
  } = useQuery({
    queryKey: ["get-instructor-option"],
    queryFn: getInstructorOption,
    select: (data: any) => {
      return data?.map((teacher) => {
        return {
          id: teacher?.id,
          label: teacher?.full_name,
          value: teacher?.id,
        };
      });
    },
  });

  useEffect(() => {
    if (data) {
      setLectureDate(data);
    }
  }, [data]);

  // LECTURE DATE
  const [lectureDate, setLectureDate] = useState("");
  const [lecturesDateEditId, setLecturesDataEditId] = useState(null);

  const handleLectureDateEdit = (id: number) => {
    const updateDate = lecturesData.find((lecture) => lecture.index === id);
    setLectureDate(updateDate?.date);
    setLecturesDataEditId(id);
  };

  const handleLectureDateAdd = () => {
    const updateDate = lecturesData.map((lecture) => {
      return lecture.index === lecturesDateEditId
        ? { ...lecture, date: lectureDate }
        : lecture;
    });

    setLecturesData(updateDate);
    setLecturesDataEditId(null);
  };

  // LECTURE ZOOM
  const [lectureZoom, setLectureZoom] = useState("");
  const [lecturesZoomEditId, setLecturesZoomEditId] = useState(null);

  const handleLectureZoomEdit = (id: number) => {
    const updateZoom = lecturesData.find((lecture) => lecture.index === id);
    setLectureZoom(updateZoom?.zoomLink);
    setLecturesZoomEditId(id);
  };

  const handleLectureZoomAdd = () => {
    const updateZoom = lecturesData.map((lecture) => {
      return lecture.index === lecturesZoomEditId
        ? { ...lecture, zoomLink: lectureZoom }
        : lecture;
    });

    setLecturesData(updateZoom);
    setLecturesZoomEditId(null);
  };

  // LECTURE ZOOM
  const [lectureYoutube, setLectureYoutube] = useState("");
  const [lecturesYoutubeEditId, setLecturesYoutubeEditId] = useState(null);

  const handleLectureYoutubeEdit = (id: number) => {
    const updateYoutube = lecturesData.find((lecture) => lecture.index === id);
    setLectureYoutube(updateYoutube?.youtubeLink);
    setLecturesYoutubeEditId(id);
  };

  const handleLectureYoutubeAdd = () => {
    const updateYoutube = lecturesData.map((lecture) => {
      return lecture.index === lecturesYoutubeEditId
        ? { ...lecture, youtubeLink: lectureYoutube }
        : lecture;
    });

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
              <div className="flex items-center justify-center gap-1 w-44">
                {lecturesDateEditId === info.row.original.index ? (
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
                        handleLectureDateEdit(info.row.original.index)
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
        cell: (info) => info.row.original?.course?.course_name,
      },
      {
        header: () => <span>{t("program")}</span>,
        accessorKey: "program",
        cell: (info) => info.row.original?.program?.program_name,
      },
      {
        header: () => <span>{t("level")}</span>,
        accessorKey: "level",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("group")}</span>,
        accessorKey: "group",
        cell: (info) => info.getValue(),
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
          } else if (info.row.original.status === "in progress") {
            return (
              <div className="flex items-center justify-center gap-1 w-44">
                {lecturesZoomEditId === info.row.original.index ? (
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
                        handleLectureZoomEdit(info.row.original.index)
                      }
                      className="w-16 text-xl cursor-pointer text-mainColor"
                    />
                  </>
                )}
              </div>
            );
          } else if (info.row.original.status === "setup") {
            return (
              <div className="flex items-center justify-center gap-1 w-44">
                {lecturesZoomEditId === info.row.original.index ? (
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
                        handleLectureZoomEdit(info.row.original.index)
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
              <div className="flex items-center justify-center gap-1 w-44">
                {lecturesYoutubeEditId === info.row.original.index ? (
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
                        handleLectureYoutubeEdit(info.row.original.index)
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
          } else if (status === "in progress") {
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
      {({ setFieldValue, values }) => {
        return (
          <Form>
            <div className="bg-white rounded-2xl">
              <div className="p-6">
                <h2 className="mb-4 text-2xl font-bold">
                  {t("lecture management")}
                </h2>

                <div>
                  <label htmlFor="instructor" className="font-bold">
                    {t("instructor")}
                  </label>
                  <Select
                    className="lg:w-[25vw] mt-2"
                    id="instructor"
                    name="instructor"
                    options={instructorsOption}
                    styles={customStyles}
                    placeholder={t("filter by instructor...")}
                    onChange={(e) => {
                      setInstructorSelectId(e.value);
                      setFieldValue("instructor", e.value);
                    }}
                  />
                </div>
              </div>
              {/* TABLE */}
              <Table data={lecturesData} columns={lecturesColumns} />

              {/* PAGINATION */}
              <div>
                <Pagination totalPages={30} showNavigation currentPage={"1"} />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LectureManagement;
