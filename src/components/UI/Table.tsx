import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  FilterFn,
  getFilteredRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";
import { Button } from "..";
import { MdNavigateNext } from "react-icons/md";
import { t } from "i18next";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  showNavigation?: boolean;
  showGlobalFilter?: boolean;
  filterFn?: FilterFn<T>;
  footered?: boolean;
  children?: ReactNode;
  totalPages?: Number;
  currentPage?: String;
}

const Table = <T extends object>({
  data,
  columns,
  showNavigation,
  totalPages,
  currentPage,
  children,
}: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayPages = 5;

    const renderButton = (pageNumber: ReactNode) => (
      <Button
        key={Number(pageNumber)}
        aria-current={pageNumber == currentPage ? "page" : undefined}
        className={`relative h-7 w-7 justify-center inline-flex items-center rounded-md p-0 text-sm font-semibold ${
          pageNumber == currentPage
            ? "bg-mainColor text-white"
            : "text-gray-600 bg-[#eee]"
        } focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
      >
        {pageNumber}
      </Button>
    );

    for (let i = 1; i <= Math.min(maxDisplayPages, Number(totalPages)); i++) {
      pageNumbers.push(renderButton(i));
    }

    if (Number(totalPages) > maxDisplayPages) {
      pageNumbers.push(
        <span
          key="ellipsis"
          className="relative h-7 w-5 justify-center inline-flex items-center rounded-md p-0 text-md font-bold text-gray-700"
        >
          ...
        </span>
      );

      pageNumbers.push(renderButton(Number(totalPages)));
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="overflow-auto">
        <table className="min-w-full text-center">
          <thead className="border-b bg-[#DED9FF]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-md font-medium text-mainColor"
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
            {table.getRowModel().rows.map((row, i) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td
                    className={`whitespace-nowrap px-6 py-4 text-md font-medium !text-[#292D32]`}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {showNavigation ? (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 pb-3 pt-5 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <Button
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                action={() => table.nextPage()}
                disabled={currentPage == totalPages}
              >
                {t("Next")}
              </Button>
              <Button
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                action={() => table.previousPage()}
                disabled={currentPage == "1"}
              >
                {t("Previous")}
              </Button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <nav
                  className="isolate inline-flex -space-x-px gap-2"
                  aria-label="Pagination"
                >
                  <Button
                    className="relative h-7 w-7 justify-center inline-flex items-center rounded-md border-none p-0 text-gray-600 bg-[#eee]"
                    action={() => table.previousPage()}
                    disabled={currentPage == "1"}
                  >
                    <MdNavigateNext />
                  </Button>

                  {renderPageNumbers()}

                  <Button
                    className="relative h-7 w-7 justify-center inline-flex items-center rounded-md p-0 text-gray-600 bg-[#eee]"
                    action={() => table.nextPage()}
                    disabled={currentPage == totalPages}
                  >
                    <MdNavigateNext className="transform rotate-180" />
                  </Button>
                </nav>
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  {t("Showing")}
                  <span className="font-medium"> 1 </span>
                  {t("to")}
                  <span className="font-medium"> 10 </span>
                  {t("of")}
                  <span className="font-medium"> 40 </span>
                  {t("entries")}
                </p>
              </div>
            </div>
          </div>
        ) : null}
        {children && children}
      </div>
    </>
  );
};

export default Table;
