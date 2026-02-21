import { useLoaderData } from "react-router";
import type { Certificate } from "../../api/types/certificate";
import type { CertificateListLoaderResult } from "./certificatesListLoader";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from '../../components/Table';

export default function CertificateListPage() {
    const { certificates } = useLoaderData() as CertificateListLoaderResult;

    //Helps define column config
    const columnHelper = createColumnHelper<Certificate>();
    
    //Memoize columns to prevent unnecessary re-renders
    const columns = useMemo(() => [
        columnHelper.accessor("reference_no", {
          header: "Reference No.",
          cell: (info) => info.getValue(),
          enableSorting: false, 
        }),
        //Must match object key!
        columnHelper.accessor("address_to", {
          //Define header and cell content
          header: "Address To",
          cell: (info) => info.getValue(),
          enableSorting: false, 
        }),
        columnHelper.accessor("purpose", {
          header: "Purpose",
          cell: (info) => info.getValue(),
          enableSorting: false, 
        }),
        columnHelper.accessor("issued_on", {
          header: "Issued On",
          cell: (info) => info.getValue(),
          sortingFn: (rowA, rowB, columnId) => {
          const dateA = new Date(rowA.getValue(columnId) as string).getTime();
          const dateB = new Date(rowB.getValue(columnId) as string).getTime();
          return dateA - dateB;
        },
          enableSorting: true,
        }),
        columnHelper.accessor("status", {
          header: "Status",
          cell: (info) => info.getValue(),
          enableSorting: true,
        }),
    ],[]);
     
  return (
        <section className="cert-List">
        <h1 className="text-center font-bold text-2xl py-5">Certificates List</h1>
        <Table columns={columns} certificates={certificates}/>
        </section>
  )
}
