import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import ReportPrintCreate from "./Create";
import ReportPrintEdit from "./Edit";
import ReportPrintDelete from "./Delete";
import ReportPrintImport from "./Import";
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

export default function ReportPrintIndex({ auth, reportPrints }) {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalImport, setOpenModalImport] = useState(false);
    const [dataRow, setDataRow] = useState();

    const edit = (data) => {
        setDataRow(data);
        setOpenModalEdit(true);
    };

    const destroy = (data) => {
        setDataRow(data);
        setOpenModalDelete(true);
    };

    const closeModal = () => {
        setOpenModalCreate(false);
        setOpenModalEdit(false);
        setOpenModalDelete(false);
        setOpenModalImport(false);
        setDataRow();
    };

    const data = useMemo(() => reportPrints.data, []);

    const columnHelper = createColumnHelper();

    const table = useReactTable({
        columns: [
            columnHelper.accessor("#", {
                cell: (info) => info.row.index + 1,
                enableColumnFilter: false,
                enableSorting: false,
            }),
            columnHelper.accessor("printed_at_format", {
                header: () => "printed at",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("line", {
                header: () => "line",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("po_number", {
                header: () => "po number",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("release_format", {
                header: () => "release",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("style_number", {
                header: () => "style number",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("model_name", {
                header: () => "model name",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("special", {
                header: () => "special",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("qty", {
                header: () => "qty",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("remark", {
                header: () => "remark",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("printed_by_name", {
                header: () => "printed by",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("action", {
                cell: (info) => (
                    <TableAction
                        data={info.cell.row.original}
                        edit={edit}
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
                    Report prints
                </h2>
            }
        >
            <Head title="Report Prints" />

            <div className="pb-12 pt-6">
                <div className="max-w-full mx-auto sm:px-4 lg:px-6">
                    <div className="mb-6 flex justify-end gap-4">
                        <PrimaryButton
                            type="button"
                            onClick={() => setOpenModalImport(true)}
                        >
                            Import report print
                        </PrimaryButton>
                        <PrimaryButton
                            type="button"
                            onClick={() => setOpenModalCreate(true)}
                        >
                            New report print
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 md:p-6 text-gray-900 dark:text-gray-100">
                            <Table table={table} />
                        </div>
                    </div>
                </div>
                {openModalCreate && (
                    <ReportPrintCreate
                        showModal={openModalCreate}
                        user={auth.user}
                        closeModal={closeModal}
                    />
                )}
                {openModalEdit && (
                    <ReportPrintEdit
                        showModal={openModalEdit}
                        user={auth.user}
                        state={dataRow}
                        closeModal={closeModal}
                    />
                )}
                {openModalDelete && (
                    <ReportPrintDelete
                        showModal={openModalDelete}
                        state={dataRow}
                        closeModal={closeModal}
                    />
                )}
                {openModalImport && (
                    <ReportPrintImport
                        showModal={openModalImport}
                        closeModal={closeModal}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
