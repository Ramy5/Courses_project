import { Form, Formik } from "formik";
import BaseInput from "../../UI/BaseInput";
import { t } from "i18next";
import { Button, Table } from "../..";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useMemo, useState } from "react";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const InstructorQualificationData = () => {
  const [file, setFile] = useState(null);
  const [addNewCertificates, setAddNewCertificates] = useState(false);

  const studentsDataFee = [
    {
      index: 1,
      type_certificate: "بكالروريوس",
      certificate_name: "حاسبات ومعلومات",
      donor: "معد مصر",
      date_acquisition: "25/3/2001",
      specialization: "علوم الحاسب",
      appreciation: "جيد جدا",
    },
    {
      index: 2,
      type_certificate: "بكالروريوس",
      certificate_name: "حاسبات ومعلومات",
      donor: "معد مصر",
      date_acquisition: "25/3/2001",
      specialization: "علوم الحاسب",
      appreciation: "جيد جدا",
    },
  ];

  const [dataSource, setDataSource] = useState(studentsDataFee);

  const initialValues = {
    general_specialization: "",
    specialization: "",
    degree: "",
    year_acquisition: "",
    cv_file: "",
    newCertificate: {
      type_certificate: "",
      certificate_name: "",
      donor: "",
      date_acquisition: "",
      specialization: "",
      appreciation: "",
    },
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileDelete = () => {
    setFile(null);
  };

  const studentsColumnsFee = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("type of certificate")}</span>,
        accessorKey: "type_certificate",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("certificate name")}</span>,
        accessorKey: "certificate_name",
        cell: (info) => <span>{t(`${info.getValue()}`)}</span>,
      },
      {
        header: () => <span>{t("donor")}</span>,
        accessorKey: "donor",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("date of acquisition")}</span>,
        accessorKey: "date_acquisition",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("specialization")}</span>,
        accessorKey: "specialization",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("appreciation")}</span>,
        accessorKey: "appreciation",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "action",
        cell: () => null,
      },
    ],
    []
  );

  const table = useReactTable({
    data: dataSource,
    columns: studentsColumnsFee,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const addNewCertificate = (newCertificate: any) => {
    setDataSource((prev) => [newCertificate, ...prev]);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log("🚀 ~ InstructorLoginData ~ values:", values);
      }}
    >
      {({ setFieldValue, values }) => {
        return (
          <Form>
            <div className="flex flex-col gap-5 w-full md:w-3/4 px-8 md:px-16">
              <div>
                <BaseInput
                  name="specialization"
                  id="specialization"
                  type="text"
                  className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("Specialization")}
                  label={t("Specialization")}
                  labelProps="!font-semibold"
                />
              </div>
              <div>
                <BaseInput
                  name="facebook"
                  id="facebook"
                  type="text"
                  className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("facebook")}
                  label={t("facebook")}
                  labelProps="!font-semibold"
                />
              </div>
              <div>
                <BaseInput
                  name="degree"
                  id="degree"
                  type="text"
                  className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("degree")}
                  label={t("degree")}
                  labelProps="!font-semibold"
                />
              </div>
              <div>
                <BaseInput
                  name="year_acquisition"
                  id="year_acquisition"
                  type="text"
                  className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("year acquisition")}
                  label={t("year acquisition")}
                  labelProps="!font-semibold"
                />
              </div>

              <div>
                <h2 className="mb-3 font-semibold">{t("CV file")}</h2>
                <div className="flex items-center flex-col sm:flex-row gap-8">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <div className="cursor-pointer border-2 py-6 px-12 text-center border-dashed border-mainColor relative">
                    <label
                      htmlFor="file-upload"
                      className="absolute top-0 bottom-0 left-0 right-0 w-full h-full cursor-pointer"
                    ></label>
                    <AiOutlineCloudUpload
                      size={150}
                      className="fill-[#E6EAEE] m-auto"
                    />
                    <p>{t("drag or click to add a file")}</p>
                  </div>
                  {file && (
                    <div className="flex items-center gap-5">
                      <div className="flex flex-col  gap-1 justify-center">
                        <span className="text-sm font-medium text-gray-700 text-center">
                          الملفات
                        </span>
                        <div className="bg-mainBg rounded-md p-1 relative">
                          <div
                            // onClick={() => setManyPdfsOpen(true)}
                            className="cursor-pointer flex items-center justify-center p-2 "
                          >
                            <span className="absolute -top-1 -right-3 bg-mainColor w-6 h-6 flex justify-center items-center text-sm font-medium rounded-full text-white">
                              1
                            </span>
                            <HiMiniFolderArrowDown
                              className="fill-mainColor"
                              size={35}
                            />
                          </div>
                        </div>
                      </div>
                      <RiDeleteBin5Line
                        size={35}
                        className="fill-mainRed cursor-pointer"
                        onClick={handleFileDelete}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mx-8 mb-5">
                <h2 className="text-2xl font-semibold">
                  {t("scientific certificates")}
                </h2>
                <Button action={() => setAddNewCertificates(true)}>
                  {t("add")}
                </Button>
              </div>
              <div className="overflow-auto">
                <table className="min-w-full text-center">
                  <thead className="bg-mainColor text-white">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id} className="py-4 px-2 w-full">
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className=" px-6 py-4 text-md font-medium"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {addNewCertificates && (
                      <tr className="border-b-2 border-mainColor text-center">
                        <td className="p-4">
                          <BaseInput
                            name="newCertificate.type_certificate"
                            id="type_certificate"
                            type="text"
                            className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                            placeholder={t("")}
                          />
                        </td>
                        <td className="p-4">
                          <BaseInput
                            name="newCertificate.certificate_name"
                            id="certificate_name"
                            type="text"
                            className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                            placeholder={t("")}
                          />
                        </td>
                        <td className="p-4">
                          <BaseInput
                            name="newCertificate.donor"
                            id="donor"
                            type="text"
                            className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                            placeholder={t("")}
                          />
                        </td>
                        <td className="p-4">
                          <BaseInput
                            name="newCertificate.date_acquisition"
                            id="date_acquisition"
                            type="text"
                            className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                            placeholder={t("")}
                          />
                        </td>
                        <td className="p-4">
                          <BaseInput
                            name="newCertificate.specialization"
                            id="specialization"
                            type="text"
                            className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                            placeholder={t("")}
                          />
                        </td>
                        <td className="p-4">
                          <BaseInput
                            name="newCertificate.appreciation"
                            id="appreciation"
                            type="text"
                            className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                            placeholder={t("")}
                          />
                        </td>
                        <td>
                          <Button
                            className="bg-transparent"
                            action={() => {
                              addNewCertificate(values.newCertificate);
                            }}
                          >
                            <IoIosCheckmarkCircleOutline
                              size={30}
                              className="fill-[#4ECB71]"
                            />
                          </Button>
                        </td>
                      </tr>
                    )}
                    {table.getRowModel().rows.map((row) => {
                      return (
                        <tr
                          key={row.id}
                          className="text-center border-b-2 border-mainColor"
                        >
                          {row.getVisibleCells().map((cell, i) => (
                            <td
                              className="whitespace-nowrap px-6 py-4 text-md font-medium !text-[#292D32]"
                              key={cell.id}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                          {/* <td className="bg-lightGreen p-0 border border-[#C4C4C4]">
                        xxx
                      </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-12 px-8 flex justify-end">
              <Button type="submit" className="me-5">
                {t("confirm")}
              </Button>
              <Button type="button" className="bg-[#E6EAEE] text-mainColor">
                {t("cancel")}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InstructorQualificationData;
