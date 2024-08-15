import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import BaseInput from "../../UI/BaseInput";
import { Button } from "../..";
import { toast } from "react-toastify";

const SuggestedReferences = ({
  suggestedReferences,
  setSuggestedReferences,
}) => {
  const [editSuggestedReferences, setEditSuggestedReferences] = useState(null);

  const initialValues = {
    reference_title: editSuggestedReferences?.reference_title || "",
    author: editSuggestedReferences?.author || "",
    date: editSuggestedReferences?.date || "",
    link: editSuggestedReferences?.link || "",
  };

  const suggestedReferencesColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("reference title")}</span>,
        accessorKey: "reference_title",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("author")}</span>,
        accessorKey: "author",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("date")}</span>,
        accessorKey: "date",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("link")}</span>,
        accessorKey: "link",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "action",
        cell: (info) => {
          return (
            <div className="flex items-center justify-center gap-3">
              <FaRegEdit
                onClick={() => {
                  const suggestedReferencesFilter = suggestedReferences?.filter(
                    (data: any) => {
                      return data.id !== info.row.original.id;
                    }
                  );

                  setSuggestedReferences(suggestedReferencesFilter);

                  setEditSuggestedReferences(info.row.original);
                }}
                size={25}
                className="cursor-pointer fill-mainColor"
              />
              <RiDeleteBin5Line
                onClick={() => {
                  const suggestedReferencesFilter = suggestedReferences?.filter(
                    (data: any, index) => {
                      return index !== info.row.index;
                    }
                  );
                  setSuggestedReferences(suggestedReferencesFilter);
                }}
                size={26}
                className="cursor-pointer mt-0.5 fill-mainRed"
              />
            </div>
          );
        },
      },
    ],
    [suggestedReferences]
  );

  const table = useReactTable({
    data: suggestedReferences,
    columns: suggestedReferencesColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ setFieldValue, values }) => {
        useEffect(() => {
            if (editSuggestedReferences?.id) {
              Object.keys(values).map((key) => {
                return setFieldValue(key, editSuggestedReferences[key]);
              });
            }
          }, [editSuggestedReferences]);
        return (
          <Form>
            <div className="bg-[#EEEDED]">
              <h2 className="p-6 text-2xl font-medium">
                {t("suggested references")}
              </h2>
              <div className="overflow-auto">
                <table className="min-w-full text-center">
                  <thead className="text-white bg-mainColor">
                    {table?.getHeaderGroups().map((headerGroup) => (
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
                          name="reference_title"
                          id="reference_title"
                          type="text"
                          className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                        />
                      </td>
                      <td className="p-4">
                        <BaseInput
                          name="author"
                          id="author"
                          type="text"
                          className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                        />
                      </td>
                      <td className="p-4">
                        <BaseInput
                          name="date"
                          id="date"
                          type="date"
                          className="w-full text-lg py-[3px] !border-2 !border-black rounded-lg"
                        />
                      </td>
                      <td className="p-4">
                        <BaseInput
                          name="link"
                          id="link"
                          type="text"
                          className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                        />
                      </td>
                      <td className="p-4">
                        <Button
                          type="button"
                          action={() => {
                            if (
                              (!values.reference_title && !values.author) ||
                              !values.date ||
                              !values.link
                            ) {
                              toast.info("complete data must be added");
                              return;
                            }

                            setSuggestedReferences((prev: any) => [
                              {
                                reference_title: values.reference_title,
                                author: values.author,
                                date: values.date,
                                link: values.link,
                                id: suggestedReferences?.length + 1,
                              },
                              ...prev,
                            ]);

                            setFieldValue("reference_title", "");
                            setFieldValue("author", "");
                            setFieldValue("date", "");
                            setFieldValue("link", "");
                          }}
                        >
                          {t("add")}
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
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SuggestedReferences;
