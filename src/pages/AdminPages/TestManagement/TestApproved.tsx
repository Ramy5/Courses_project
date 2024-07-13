import { FiFileText } from "react-icons/fi";
import { Button, MainCheckBox, Table, TitlePage } from "../../../components";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

const TestApproved = () => {
  const [approvalStudent, setApprovalStudent] = useState([]);
  const [allIsChecked, setAllIsChecked] = useState(null);

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
  const [test, setTest] = useState(studentsApprovalData);

  const handleSelectAll = (isChecked) => {
    setAllIsChecked(isChecked);
    if (isChecked) {
      setApprovalStudent([...test]);
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
              (student) => student.index === info.row.original.index
            )}
            onChange={(e) => {
              if (e.target.checked) {
                setApprovalStudent((prev) => {
                  return [
                    ...prev,
                    { ...info.row.original, id: info.row.index },
                  ];
                });
              } else {
                setApprovalStudent((prev) => {
                  return prev.filter((el) => el.id !== info.row.index);
                });
              }
            }}
          />
        ),
      },
      {
        header: () => <span>{t("student ID")}</span>,
        accessorKey: "studentID",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("student name")}</span>,
        accessorKey: "studentName",
        cell: (info) => info.getValue(),
      },
    ],
    [allIsChecked, approvalStudent, handleSelectAll]
  );

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
        <Table data={test} columns={studentsApprovalColumns} />
      </div>

      <Button className="self-end mt-12">{t("test approval")}</Button>
    </div>
  );
};

export default TestApproved;
