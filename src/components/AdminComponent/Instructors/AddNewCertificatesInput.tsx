import React, { useEffect, useMemo, useState } from "react";
import BaseInput from "../../UI/BaseInput";
import { Form, Formik } from "formik";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { t } from "i18next";
import { Button, DateInputField } from "../..";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface Certificate {
  type_certificate: string;
  certificate_name: string;
  donor: string;
  date_acquisition: string;
  specialization: string;
  appreciation: string;
}

interface AddNewCertificatesInput_TP {
  editObj: Certificate;
  newCertificates: any;
  setNewCertificates: any;
  dataReceived: any;
  setEditCertificateData: any;
}

const AddNewCertificatesInput = ({
  editObj,
  setNewCertificates,
  newCertificates,
  dataReceived,
  setEditCertificateData,
}: AddNewCertificatesInput_TP) => {
  console.log("🚀 ~ newCertificates:", newCertificates)
  // const editCertificate = editObj?.newCertificate && editObj?.newCertificate[0];
  const [editCertificate, setEditCertificate] = useState({});
  const { id: instructorParamID } = useParams();

  const initialValues: Certificate = {
    type_certificate: editCertificate?.type_certificate || "",
    certificate_name: editCertificate?.certificate_name || "",
    donor: editCertificate?.donor || "",
    date_acquisition: editCertificate?.date_acquisition || "",
    specialization: editCertificate?.specialization || "",
    appreciation: editCertificate?.appreciation || "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (editCertificate?.id) {
      setFormValues(editCertificate);
    }
  }, [editCertificate]);

  const certificatesColumnsFee = useMemo<ColumnDef<any>[]>(
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
        cell: (info) => {
          const editData = newCertificates?.length
            ? newCertificates
            : editObj?.newCertificate;
          return (
            <div className="flex items-center gap-5">
              <FaRegEdit
                size={22}
                className="cursor-pointer fill-mainColor"
                onClick={() => {
                  const suggestedReferencesFilter = editData?.filter(
                    (data: any) => {
                      return data.id !== info.row.original.id;
                    }
                  );

                  setNewCertificates(suggestedReferencesFilter);

                  setEditCertificate(info.row.original);
                }}
              />
              <RiDeleteBin5Line
                onClick={() => {
                  const suggestedReferencesFilter = editData?.filter(
                    (data: any) => {
                      return data.id !== info.row.original.id;
                    }
                  );
                  setNewCertificates(suggestedReferencesFilter);
                }}
                size={22}
                className="m-auto cursor-pointer fill-mainRed"
              />
            </div>
          );
        },
      },
    ],
    [newCertificates, editCertificate]
  );

  const table = useReactTable({
    data: newCertificates,
    columns: certificatesColumnsFee,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={() => {}}>
      {({ values, resetForm, setFieldValue }) => {
        console.log("🚀 ~ values:", values)
        // useEffect(() => {
        //   if (editCertificate?.id) {
        //     Object.keys(values).map((key) => {
        //       return setFieldValue(key, editCertificate[key]);
        //     });
        //   }
        // }, [editCertificate]);
        return (
          <Form>
            <table className="min-w-full text-center">
              <thead className="text-white bg-mainColor">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="w-full px-2 py-4">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 font-medium text-md"
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
                <tr className="text-center border-b-2 border-mainColor">
                  <td className="p-4">
                    <BaseInput
                      name="type_certificate"
                      id="type_certificate"
                      type="text"
                      className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                      placeholder={t("")}
                      value={
                        values.type_certificate ||
                        editCertificate?.type_certificate
                      }
                      onChange={(e) =>
                        setFieldValue("type_certificate", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-4">
                    <BaseInput
                      name="certificate_name"
                      id="certificate_name"
                      type="text"
                      className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                      placeholder={t("")}
                      value={
                        values.certificate_name ||
                        editCertificate?.certificate_name
                      }
                      onChange={(e) =>
                        setFieldValue("certificate_name", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-4">
                    <BaseInput
                      name="donor"
                      id="donor"
                      type="text"
                      className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                      placeholder={t("")}
                      value={values.donor || editCertificate?.donor}
                      onChange={(e) => setFieldValue("donor", e.target.value)}
                    />
                  </td>
                  <td className="p-4">
                    <BaseInput
                      name="date_acquisition"
                      id="date_acquisition"
                      type="date"
                      className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                      placeholder={t("")}
                      value={
                        values.date_acquisition ||
                        editCertificate?.date_acquisition
                      }
                      onChange={(e) =>
                        setFieldValue("date_acquisition", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-4">
                    <BaseInput
                      name="specialization"
                      id="specialization"
                      type="text"
                      className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                      placeholder={t("")}
                      value={
                        values.specialization || editCertificate?.specialization
                      }
                      onChange={(e) =>
                        setFieldValue("specialization", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-4">
                    <BaseInput
                      name="appreciation"
                      id="appreciation"
                      type="text"
                      className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                      placeholder={t("")}
                      value={
                        values.appreciation || editCertificate?.appreciation
                      }
                      onChange={(e) =>
                        setFieldValue("appreciation", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Button
                      className="bg-transparent hover:scale-[0.9]"
                      type="button"
                      action={() => {
                        if (values?.type_certificate) {
                          if (dataReceived) {
                            setEditCertificate(values);
                            setEditCertificateData({
                              ...values,
                              id: dataReceived?.id,
                            });
                          }
                          setNewCertificates((prev) => [
                            { ...values, id: editCertificate?.id },
                            ...prev,
                          ]);
                        } else {
                          toast.info("add data first");
                        }
                        resetForm();
                        setEditCertificate({});
                      }}
                    >
                      <IoIosCheckmarkCircleOutline
                        size={30}
                        className="fill-[#4ECB71]"
                      />
                    </Button>
                  </td>
                </tr>

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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddNewCertificatesInput;
