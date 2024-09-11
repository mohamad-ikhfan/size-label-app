import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import PoItemCreate from "./Create";
import PoItemEdit from "./Edit";
import PoItemDelete from "./Delete";
import PoItemImport from "./Import";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { TableAction } from "@/Components/TableAction";
import { Table } from "@/Components/Table";

export default function PoItemIndex({ auth, poItems }) {
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

    const data = useMemo(() => poItems.data, []);

    const columnHelper = createColumnHelper();

    const table = useReactTable({
        columns: [
            columnHelper.accessor("line", {
                header: () => "line",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("spk_publish_format", {
                header: () => "spk publish",
                cell: (info) => info.getValue(),
                enableColumnFilter: false,
            }),
            columnHelper.accessor("release_format", {
                header: () => "release",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("po_number", {
                header: () => "po number",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("style_number", {
                header: () => "style number",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("model_name", {
                header: () => "model name",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("qty", {
                header: () => "qty",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("special", {
                header: () => "special",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("remark", {
                header: () => "remark",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
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
                    PO items
                </h2>
            }
        >
            <Head title="PO Items" />

            <div className="pb-12 pt-6">
                <div className="max-w-full mx-auto sm:px-4 lg:px-6">
                    <div className="mb-6 flex justify-end gap-4">
                        <PrimaryButton
                            type="button"
                            onClick={() => setOpenModalImport(true)}
                        >
                            Import po item
                        </PrimaryButton>
                        <PrimaryButton
                            type="button"
                            onClick={() => setOpenModalCreate(true)}
                        >
                            New po item
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 md:p-6 text-gray-900 dark:text-gray-100">
                            <Table table={table} />
                        </div>
                    </div>
                </div>
                {openModalCreate && (
                    <PoItemCreate
                        showModal={openModalCreate}
                        closeModal={closeModal}
                    />
                )}
                {openModalEdit && (
                    <PoItemEdit
                        showModal={openModalEdit}
                        state={dataRow}
                        closeModal={closeModal}
                    />
                )}
                {openModalDelete && (
                    <PoItemDelete
                        showModal={openModalDelete}
                        state={dataRow}
                        closeModal={closeModal}
                    />
                )}
                {openModalImport && (
                    <PoItemImport
                        showModal={openModalImport}
                        closeModal={closeModal}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
