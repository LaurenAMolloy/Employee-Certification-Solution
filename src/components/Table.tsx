import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

//Columns and data use the same object type
interface TableProps<T extends object> {
  columns: ColumnDef<T, unknown>[];
  certificates: T[];
}

export default function Table<T>({ columns, certificates }: TableProps<T>) {
  const table = useReactTable({
  data: certificates ?? [],
  columns,
  getCoreRowModel: getCoreRowModel(),
});

  return (
    <div>
      <table className="w-full text-sm text-body">
        <thead className="text-sm text-body bg-gray-100 border-b border-default">
          {/*use the getHeaderGRoup function to render headers:*/}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-4">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
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