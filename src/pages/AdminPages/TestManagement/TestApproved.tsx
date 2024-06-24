import { FiFileText } from "react-icons/fi";
import { Button, MainCheckBox, Table, TitlePage } from "../../../components";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

const TestApproved = () => {
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
  console.log("🚀 ~ TestApproved ~ test:", test);

  const studentsApprovalColumns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        header: () => (
          <div>
            <MainCheckBox
              label={t("select all")}
              name="select_all"
              onChange={() => {
                const approve = test.map((el) => {
                  return { ...el, approvalStatus: !el.approvalStatus };
                });

                setTest(approve);
              }}
            />
          </div>
        ),
        accessorKey: "approvalStatus",
        cell: (info) => (
          <MainCheckBox
            className="ms-4"
            checked={info.getValue()}
            label=""
            checked={info.row.original.approvalStatus}
            onChange={(e) => {
              handleApprovalChange(info.row.index, e.target.checked);
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
    [handleApprovalChange, test]
  );

  function handleApprovalChange(index: number, isChecked: boolean) {
    studentsApprovalData[index].approvalStatus = isChecked;
  }

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
