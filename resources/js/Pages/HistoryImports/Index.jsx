import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import HistoryImportDelete from "./Delete";
import HistoryImportDownload from "./Download";
import { Table } from "@/Components/Table";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { TableAction } from "@/Components/TableAction";

export default function HistoryImportIndex({ auth, historyImports }) {
    const [openModalDownload, setOpenModalDownload] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [dataRow, setDataRow] = useState();

    const download = (data) => {
        setDataRow(data);
        setOpenModalDownload(true);
    };

    const destroy = (data) => {
        setDataRow(data);
        setOpenModalDelete(true);
    };

    const closeModal = () => {
        setOpenModalDownload(false);
        setOpenModalDelete(false);
        setDataRow();
    };

    const data = useMemo(() => historyImports.data, []);

    const columnHelper = createColumnHelper();

    const table = useReactTable({
        columns: [
            columnHelper.accessor("#", {
                cell: (info) => info.row.index + 1,
                enableColumnFilter: false,
                enableSorting: false,
            }),
            columnHelper.accessor("name", {
                header: () => "name",
                cell: (info) => info.getValue(),
                enableSorting: false,
            }),
            columnHelper.accessor("extension", {
                header: () => "extension",
                cell: (info) => info.getValue(),
                enableColumnFilter: false,
                enableSorting: false,
            }),
            columnHelper.accessor("mime_type", {
                header: () => "mime type",
                cell: (info) => info.getValue(),
                enableColumnFilter: false,
                enableSorting: false,
            }),
            columnHelper.accessor("path", {
                header: () => "path",
                cell: (info) => info.getValue(),
                enableColumnFilter: false,
                enableSorting: false,
            }),
            columnHelper.accessor("size", {
                header: () => "size",
                cell: (info) => info.getValue(),
                enableColumnFilter: false,
                enableSorting: false,
            }),
            columnHelper.accessor("action", {
                cell: (info) => (
                    <TableAction
                        data={info.cell.row.original}
                        download={download}
                        destroy={destroy}
                    />
                ),
                enableColumnFilter: false,
                enableSorting: false,
            }),
        ],
        data: data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    History Imports
                </h2>
            }
        >
            <Head title="History Imports" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-4 lg:px-6">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 md:p-6 text-gray-900 dark:text-gray-100">
                            <Table table={table} />
                        </div>
                    </div>
                </div>
                {openModalDelete && (
                    <HistoryImportDelete
                        state={dataRow}
                        showModal={openModalDelete}
                        closeModal={closeModal}
                    />
                )}
                {openModalDownload && (
                    <HistoryImportDownload
                        state={dataRow}
                        showModal={openModalDownload}
                        closeModal={closeModal}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
