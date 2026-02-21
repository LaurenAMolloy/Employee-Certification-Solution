import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { FaArrowsAltV, FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";

import { useState } from "react";


//Columns and data use the same object type
interface TableProps<T extends object> {
  columns: ColumnDef<T, unknown>[];
  certificates: T[];
}

export default function Table<T>({ columns, certificates }: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  
  const table = useReactTable({
  data: certificates ?? [],
  columns,
  getCoreRowModel: getCoreRowModel(),
  //Sorting row model
  onSortingChange: setSorting,
  getSortedRowModel: getSortedRowModel(),
  state: {
    sorting,
  }
  });

  return (
    <div>
      <table className="w-full text-sm text-body">
        <thead className="text-sm text-body bg-gray-100 border-b border-default">
          {/*use the getHeaderGRoup function to render headers:*/}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.getIsSorted();
                const canSort = header.column.getCanSort();

                let icon = null;

                if(canSort){
                  if(isSorted === "asc"){
                    icon = <FaLongArrowAltUp className="inline ml-1" />
                  } else if(isSorted === "desc"){
                    icon = <FaLongArrowAltDown className="inline ml-1" />
                  } else {
                    icon = <FaArrowsAltV className="inline ml-1 text-gray-400" />
                  }
                }
                return (
                  <th key={header.id} className="px-4 py-4">
                  {header.isPlaceholder ? null : (
                  <div
                  onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                  className={canSort ? "cursor-pointer select-none" : ""}
                  >
                  {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                  )}
                {icon}
              </div>
            )}
          </th>

                );
              })}
            </tr>
          ))}
        </thead>
        {/* //TableBody */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-200">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-4 text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}