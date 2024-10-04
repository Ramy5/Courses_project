import {
  DataCount,
  PerformanceChart,
  PersonView,
  ProgramBox,
  SearchInput,
  Table,
} from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { useRTL } from "../../hooks/useRTL";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import {
  FaHashtag,
  FaClock,
  FaBook,
  FaListAlt,
  FaTasks,
  FaClipboardList,
} from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import customFetch from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/UI/Loading";
import { generateRandomColor } from "../../utils/helpers";
import useDebounce from "../../hooks/useDebounce";

const getPrograms = async () => {
  const { data } = await customFetch("showPrograms");
  return data.data;
};

const getTeacherSlides = async () => {
  const { data } = await customFetch("allInstructorsWithCounts");
  return data.data;
};

const getStudentsReceipt = async (
  page: number,
  search: string,
  sorting: string
) => {
  const { data } = await customFetch(
    `getStudentsReciepts?page=${page}&search=${search}&sort=${sorting}`
  );
  return data.data;
};

const getCounts = async () => {
  const { data } = await customFetch("getCounts");
  return data.data;
};

const InformationPanel = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState({
    value: "news",
    label: t("newest"),
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [highCounts, setHighCounts] = useState(null);
  const [search, setSearch] = useState("");
  const debounceSearchTerm = useDebounce(search, 1000);

  const {
    data: slidesData,
    isLoading: countIsLoading,
    isFetching: countIsFetching,
    isRefetching: countIsRefetching,
  } = useQuery({
    queryKey: ["get-slides"],
    queryFn: getTeacherSlides,
  });

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex);
  };

  const currentTeacher = slidesData?.[currentSlide];

  const { data: ReceiptsData, refetch: receiptRefetch } = useQuery({
    queryKey: ["get-receipt"],
    queryFn: () => getStudentsReceipt(page, search, sortOption?.value),
  });

  const { data: CountsData } = useQuery({
    queryKey: ["get-counts"],
    queryFn: getCounts,
  });

  useEffect(() => {
    if (CountsData) {
      const highPerformance = Math.max(...Object.values(CountsData));
      setHighCounts(highPerformance);
    }
  }, [CountsData]);

  const {
    data: programData,
    isLoading: programIsLoading,
    isFetching: programIsFetching,
    isRefetching: programIsRefetching,
  } = useQuery({
    queryKey: ["get-programs"],
    queryFn: getPrograms,
  });

  const programsData = programData?.map((program: any) => {
    return {
      id: program?.id,
      programTitle: program?.program_name,
      programColor: generateRandomColor(),
      numOfCourses: program?.course_count,
      numOfStudents: program?.student_count,
      numOfInstructor: program?.teacher_count,
    };
  });

  const dataCounts = [
    {
      dataTitle: "number of lectures",
      dataColor: "#005560",
      dataCount: currentTeacher?.total_lectures,
      dataIcon: <FaHashtag className="text-lg lg:text-2xl" color="#005560" />,
    },
    {
      dataTitle: "lecture hours",
      dataColor: "#7E57C2",
      dataCount: currentTeacher?.total_lectures, // TODO: BACKEND RETURN
      dataIcon: <FaClock className="text-lg lg:text-2xl" color="#7E57C2" />,
    },
    {
      dataTitle: "courses",
      dataColor: "#388E3C",
      dataCount: currentTeacher?.total_courses,
      dataIcon: <FaBook className="text-lg lg:text-2xl" color="#388E3C" />,
    },
    {
      dataTitle: "number of exams",
      dataColor: "#D32F2F",
      dataCount: currentTeacher?.total_exams,
      dataIcon: <FaListAlt className="text-lg lg:text-2xl" color="#D32F2F" />,
    },
    {
      dataTitle: "projects",
      dataColor: "#8D6E63",
      dataCount: currentTeacher?.total_projects,
      dataIcon: <FaTasks className="text-lg lg:text-2xl" color="#8D6E63" />,
    },
    {
      dataTitle: "assignments",
      dataColor: "#0277BD",
      dataCount: currentTeacher?.total_homeworks,
      dataIcon: (
        <FaClipboardList className="text-lg lg:text-2xl" color="#0277BD" />
      ),
    },
  ];

  const studentsDataFee = ReceiptsData?.students?.map(
    (fee: any, index: number) => {
      return {
        index: index + 1,
        studentName: fee?.full_name,
        program: fee?.academicData?.program?.program_name, // NOTE ASK BACKEND
        level: fee?.academicData?.level,
        email: fee?.email,
        paymentDate: fee?.receipts?.[0]?.receipt_date,
        paymentStatus: fee?.receipts?.[0]?.status,
      };
    }
  );

  // [
  //   {
  //     index: 1,
  //     studentName: "John Doe",
  //     program: "Computer Science",
  //     level: "Level One",
  //     email: "john@doe.com",
  //     paymentDate: "03/21/2024",
  //     paymentStatus: "Paid",
  //   },
  //   {
  //     index: 2,
  //     studentName: "Jane Smith",
  //     program: "Engineering",
  //     level: "Level Three",
  //     email: "jane@smith.com",
  //     paymentDate: "-",
  //     paymentStatus: "Unpaid",
  //   },
  //   {
  //     index: 3,
  //     studentName: "Emily Johnson",
  //     program: "Computer Science",
  //     level: "Level One",
  //     email: "emily@johnson.com",
  //     paymentDate: "03/21/2024",
  //     paymentStatus: "Paid",
  //   },
  //   {
  //     index: 4,
  //     studentName: "Michael Brown",
  //     program: "Engineering",
  //     level: "Level Three",
  //     email: "michael@brown.com",
  //     paymentDate: "-",
  //     paymentStatus: "Unpaid",
  //   },
  //   {
  //     index: 5,
  //     studentName: "Chris Davis",
  //     program: "Computer Science",
  //     level: "Level One",
  //     email: "chris@davis.com",
  //     paymentDate: "03/21/2024",
  //     paymentStatus: "Paid",
  //   },
  //   {
  //     index: 6,
  //     studentName: "Sarah Wilson",
  //     program: "Engineering",
  //     level: "Level Three",
  //     email: "sarah@wilson.com",
  //     paymentDate: "-",
  //     paymentStatus: "Unpaid",
  //   },
  // ];

  const studentsColumnsFee = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        header: () => <span>{t("#")}</span>,
        accessorKey: "index",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("Student Name")}</span>,
        accessorKey: "studentName",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("Program")}</span>,
        accessorKey: "program",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("Level")}</span>,
        accessorKey: "level",
        cell: (info) => <span>{t(`${info.getValue()}`)}</span>,
      },
      {
        header: () => <span>{t("Email Address")}</span>,
        accessorKey: "email",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("Payment Date")}</span>,
        accessorKey: "paymentDate",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("Payment Status")}</span>,
        accessorKey: "paymentStatus",
        cell: (info) => {
          if (info.row.original.paymentStatus === "لم يسدد") {
            return (
              <span className="inline-block w-full px-2 text-red-800 bg-red-200 border rounded-md w-30 border-red-950">
                {t(`${info.getValue()}`)}
              </span>
            );
          } else {
            return (
              <span className="inline-block w-full px-2 border rounded-md text-cyan-800 bg-cyan-200 w-30 border-cyan-950">
                {t(`${info.getValue()}`)}
              </span>
            );
          }
        },
      },
    ],
    []
  );

  const chartData = {
    labels: [
      t("lectures"),
      t("courses"),
      t("exams"),
      t("projects"),
      t("homeworks"),
    ],
    datasets: [
      {
        label: "Performance",
        data: [
          CountsData?.total_lectures,
          CountsData?.total_courses,
          CountsData?.total_exams,
          CountsData?.total_projects,
          CountsData?.total_homeworks,
        ],
        fill: true,
        backgroundColor: "#393D94",
        borderColor: "#393D94",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        tension: 0.4,
        pointHoverRadius: 5,
        pointRadius: 4,
        pointBorderWidth: 1,
      },
    ],
  };

  const sortOptions = [
    { value: "news", label: t("newest") },
    { value: "oldest", label: t("oldest") },
  ];

  useEffect(() => {
    receiptRefetch();
  }, [page, sortOption]);

  useEffect(() => {
    if (debounceSearchTerm.length >= 0) {
      setPage(1);
      receiptRefetch();
    }
  }, [debounceSearchTerm]);

  if (
    countIsLoading ||
    countIsFetching ||
    countIsRefetching ||
    programIsLoading ||
    programIsFetching ||
    programIsRefetching
  )
    return <Loading />;

  return (
    <div className="px-1 space-y-6 lg:px-6">
      {/* PROGRAMS SECTION */}
      <div className="relative">
        <Swiper
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop
          centeredSlides={true}
          spaceBetween={15}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            700: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            992: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1300: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
          dir="rtl"
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {programsData?.map((program) => (
            <SwiperSlide key={program?.id}>
              <ProgramBox
                key={program?.id}
                id={program?.id}
                programTitle={program.programTitle}
                programColor={program.programColor}
                numOfCourses={program.numOfCourses}
                numOfStudents={program.numOfStudents}
                numOfInstructor={program.numOfInstructor}
              />
            </SwiperSlide>
          ))}
          <div className="swiper-button-next swiper__program--next"></div>
          <div className="swiper-button-prev swiper__program--prev"></div>
        </Swiper>
      </div>

      {/* CHART PERFORMANCE AND CALENDER */}
      <div className="grid items-center grid-cols-2 gap-x-14 gap-y-6 lg:grid-cols-3">
        {/* CALENDER */}
        <div className="col-span-2 justify-self-center lg:col-span-1">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
          />
        </div>

        {/* PERFORMANCE CHART */}
        <div className="col-span-2">
          <PerformanceChart data={chartData} hightPerformance={highCounts} />
        </div>
      </div>

      <hr className="block w-full h-[3px] !my-12 bg-mainColor/50" />

      {/* DATA COUNT AND PERSONS DATA */}
      <div className="grid items-center grid-cols-2 gap-6 lg:grid-cols-3">
        {/* PERSONS */}
        <div className="col-span-2 px-6 py-10 bg-white lg:col-span-1 rounded-2xl">
          <Swiper
            navigation={true}
            loop
            centeredSlides={true}
            dir="rtl"
            slidesPerView={1}
            modules={[Navigation]}
            onSlideChangeTransitionEnd={handleSlideChange}
            className="mySwiper"
          >
            {slidesData?.map((item, index) => (
              <SwiperSlide key={index}>
                <PersonView img={item.personal_image} desc={item.name} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* DATA COUNT */}
        <div className="grid items-center grid-cols-2 col-span-2 gap-6 lg:grid-cols-3">
          {dataCounts?.map((data, index) => (
            <DataCount
              key={index}
              dataTitle={data.dataTitle}
              dataColor={data.dataColor}
              dataCount={data.dataCount}
              dataIcon={data.dataIcon}
            />
          ))}
        </div>
      </div>

      {/* STUDENTS FEE */}
      <div className="p-10 bg-white rounded-2xl">
        <div className="grid items-center justify-between gap-6 mb-8 lg:grid-cols-2">
          <h3 className="text-2xl font-bold">{t("students fee")}</h3>
          <div className="grid items-center gap-6 lg:grid-cols-2">
            <Select
              value={sortOption}
              onChange={setSortOption}
              options={sortOptions}
              placeholder={t("sort by : none")}
              className="w-52"
            />
            <SearchInput
              name="instructorSearch"
              value={search}
              className="w-64"
              autoFocus
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search about instructor")}
            />
          </div>
        </div>

        <Table
          data={studentsDataFee || []}
          columns={studentsColumnsFee}
          showNavigation={true}
          totalPages={ReceiptsData?.totalPages}
          currentPage={ReceiptsData?.currentPage}
        />
      </div>
    </div>
  );
};

export default InformationPanel;
