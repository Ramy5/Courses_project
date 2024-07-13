import { ColumnDef } from "@tanstack/react-table";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useMemo, useState } from "react";
import Select from "react-select";
import { Table } from "../../../components";
import { FaRegCheckCircle, FaRegEdit } from "react-icons/fa";

const LectureManagement = () => {
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

  const [lecturesData, setLecturesData] = useState(lectures);

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
        header: () => <span>{t("lecture number")}</span>,
        accessorKey: "lectureNumber",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("date")}</span>,
        accessorKey: "date",
        cell: (info) => {
          if (info.row.original.lectureStatus === "completed") {
            return info.getValue();
          } else {
            return (
              <div className="flex items-center justify-center gap-2 w-44">
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
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("program")}</span>,
        accessorKey: "program",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("level")}</span>,
        accessorKey: "level",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("section")}</span>,
        accessorKey: "section",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("zoom link")}</span>,
        accessorKey: "zoomLink",
        cell: (info) => {
          if (info.row.original.lectureStatus === "completed") {
            return (
              <a href={info.getValue()} target="_blank" className="truncate">
                {info.getValue()}
              </a>
            );
          } else if (info.row.original.lectureStatus === "in progress") {
            return (
              <div className="flex items-center justify-center gap-2 w-60">
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
          } else if (info.row.original.lectureStatus === "under preparation") {
            return (
              <div className="flex items-center justify-center gap-2 w-60">
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
        accessorKey: "youtubeLink",
        cell: (info) => {
          if (info.row.original.lectureStatus === "completed") {
            return (
              <div className="flex items-center justify-center gap-2 w-60">
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
        accessorKey: "lectureStatus",
        cell: (info) => {
          const status = info.getValue();
          let statusClass = "";
          if (status === "under preparation") {
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
                    onChange={(e) => {
                      setFieldValue("instructor", e.value);
                    }}
                  />
                </div>
              </div>
              {/* TABLE */}
              <Table data={lecturesData} columns={lecturesColumns} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LectureManagement;
