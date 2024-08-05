import { FiFileText } from "react-icons/fi";
import { Button, MainCheckBox, Table, TitlePage } from "../../../components";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import customFetch from "../../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/UI/Loading";

const getStudentExam = async (id: number | string) => {
  const { data } = await customFetch(`examStudent/${id}`);
  return data.data;
};

const addExamApproved = async (newExam: any) => {
  const data = await customFetch.post(`examApprove`, newExam);
  return data;
};

const TestApproved = () => {
  const [approvalStudent, setApprovalStudent] = useState([]);
  const [allIsChecked, setAllIsChecked] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id: examId } = useParams();
  const location = useLocation();

  const studentsApprovalData = [
    {
      index: 1,
      studentName: "Mohammed Ahmed Mahmoud Salem",
      studentID: "24556546",
      approvalStatus: false,
    },
    {
      index: 2,
      studentName: "Mohammed Ahmed Mahmoud Salem",
      studentID: "24556546",
      approvalStatus: false,
    },
    {
      index: 3,
      studentName: "Mohammed Ahmed Mahmoud Salem",
      studentID: "24556546",
      approvalStatus: false,
    },
    {
      index: 4,
      studentName: "Mohammed Ahmed Mahmoud Salem",
      studentID: "24556546",
      approvalStatus: false,
    },
    {
      index: 5,
      studentName: "Mohammed Ahmed Mahmoud Salem",
      studentID: "24556546",
      approvalStatus: false,
    },
    {
      index: 6,
      studentName: "Mohammed Ahmed Mahmoud Salem",
      studentID: "24556546",
      approvalStatus: false,
    },
    {
      index: 7,
      studentName: "Mohammed Ahmed Mahmoud Salem",
      studentID: "24556546",
      approvalStatus: false,
    },
  ];
  const [examsData, setExamsData] = useState(studentsApprovalData);

  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["get-exam-students"],
    queryFn: () => getStudentExam(examId),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-exam-approved"],
    mutationFn: addExamApproved,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["get-all-exams"]);
      toast.success(t("exams is approved successfully"));
      navigate("/testManagement");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error[0]?.email[0] ||
        error?.response?.data?.error[0]?.password[0];
      toast.error(errorMessage);
    },
  });

  useEffect(() => {
    if (data) {
      setExamsData(data?.program?.students);
    }
  }, [data]);

  const handleSelectAll = (isChecked) => {
    setAllIsChecked(isChecked);
    if (isChecked) {
      setApprovalStudent([...examsData]);
    } else {
      setApprovalStudent([]);
    }
  };

  const studentsApprovalColumns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        header: () => (
          <div>
            <MainCheckBox
              label={t("select all")}
              name="select_all"
              checked={allIsChecked}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          </div>
        ),
        accessorKey: "approvalStatus",
        cell: (info) => (
          <MainCheckBox
            className="ms-4"
            name="approve"
            label=""
            checked={approvalStudent.some(
              (student) => student.id === info.row.original.id
            )}
            onChange={(e) => {
              if (e.target.checked) {
                setApprovalStudent((prev) => {
                  return [
                    ...prev,
                    { ...info.row.original, id: info.row.original.id },
                  ];
                });
              } else {
                setApprovalStudent((prev) => {
                  return prev.filter((el) => el.id !== info.row.original.id);
                });
              }
            }}
          />
        ),
      },
      {
        header: () => <span>{t("student code")}</span>,
        accessorKey: "academicData",
        cell: (info) => info.getValue()?.Academic_code,
      },
      {
        header: () => <span>{t("student name")}</span>,
        accessorKey: "full_name",
        cell: (info) => info.getValue(),
      },
    ],
    [allIsChecked, approvalStudent, handleSelectAll]
  );

  const handleAddExamApprove = async () => {
    const studentIDS = approvalStudent?.map((approve) => approve?.id);
    console.log(location);

    const newExam = {
      exam_id: location?.state,
      student_ids: studentIDS,
      is_approved: 1,
    };

    await mutate(newExam);
  };

  if (isLoading || isFetching || isRefetching) return <Loading />;

  return (
    <div className="flex flex-col">
      <TitlePage
        mainTitle={t("test management")}
        supTitle={t("test approval")}
        mainLink="/testManagement"
        icon={<FiFileText className="text-xl text-mainColor" />}
      />
      <div className="bg-white rounded-2xl">
        <div className="p-6 ">
          <h2 className="mb-1 text-2xl font-bold">{t("test approval")}</h2>
          <h2 className="text-gray-800">
            {t("determine which students are allowed to choose")}
          </h2>
        </div>
        <Table data={examsData || []} columns={studentsApprovalColumns} />
      </div>

      <Button
        action={handleAddExamApprove}
        loading={isPending}
        className="self-end mt-12"
      >
        {t("test approval")}
      </Button>
    </div>
  );
};

export default TestApproved;
