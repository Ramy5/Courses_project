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
import Pagination from "./Pagination";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<[]>[];
  showNavigation?: boolean;
  showGlobalFilter?: boolean;
  filterFn?: FilterFn<T>;
  footered?: boolean;
  children?: ReactNode;
  totalPages?: number;
  currentPage?: string;
  className?: any;
}

const Table = <T extends object>({
  data,
  columns,
  showNavigation,
  totalPages,
  currentPage,
  className,
}: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="!overflow-auto">
        <table className="min-w-full text-center">
          <thead className={`${className} border-b bg-[#DED9FF]`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`${
                      className ? "text-white" : "text-mainColor"
                    } px-6 py-4 text-md font-medium`}
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
              <tr
                key={row.id}
                className={`${
                  className ? "border-b-2 border-mainColor" : "border-b"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className={`whitespace-nowrap px-1 py-6 text-md font-medium !text-[#292D32]`}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        showNavigation={showNavigation}
        table={table}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Table;
