import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import DestroyRibbonCreate from "./Create";
import DestroyRibbonEdit from "./Edit";
import DestroyRibbonDelete from "./Delete";
import SecondaryButton from "@/Components/SecondaryButton";
import DestroyRibbonExport from "./Export";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import TableAction from "@/Components/TableAction";
import Table from "@/Components/Table";

export default function DestroyRibbonIndex({ auth, destroyRibbons }) {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalExport, setOpenModalExport] = useState(false);
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
        setOpenModalExport(false);
        setDataRow();
    };

    const data = useMemo(() => destroyRibbons.data, [destroyRibbons.data]);

    const columnHelper = createColumnHelper();

    const table = useReactTable({
        columns: [
            columnHelper.accessor("#", {
                cell: (info) => info.row.index + 1,
                enableColumnFilter: false,
                enableSorting: false,
            }),
            columnHelper.accessor("destroyed_at_format", {
                header: () => "destroyed at",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("destroyed_by_name", {
                header: () => "destroyed by",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("qty", {
                header: () => "qty",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("action", {
                cell: (info) =>
                    info.cell.row.original.destroyed_by === auth.user.id ? (
                        <TableAction
                            data={info.cell.row.original}
                            edit={edit}
                            destroy={destroy}
                        />
                    ) : null,
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
                    Destroy ribbons
                </h2>
            }
        >
            <Head title="Destroy Ribbons" />

            <div className="pb-12 pt-6">
                <div className="max-w-full mx-auto sm:px-4 lg:px-6">
                    <div className="mb-6 flex justify-end gap-4">
                        <SecondaryButton
                            type="button"
                            onClick={() => setOpenModalExport(true)}
                        >
                            Export Destroy Ribbon
                        </SecondaryButton>
                        <PrimaryButton
                            type="button"
                            onClick={() => setOpenModalCreate(true)}
                        >
                            New Destroy Ribbon
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 md:p-6 text-gray-900 dark:text-gray-100">
                            <Table table={table} />
                        </div>
                    </div>
                </div>
                {openModalCreate && (
                    <DestroyRibbonCreate
                        userId={auth.user.id}
                        showModal={openModalCreate}
                        closeModal={closeModal}
                    />
                )}
                {openModalEdit && (
                    <DestroyRibbonEdit
                        showModal={openModalEdit}
                        state={dataRow}
                        closeModal={closeModal}
                    />
                )}
                {openModalDelete && (
                    <DestroyRibbonDelete
                        showModal={openModalDelete}
                        state={dataRow}
                        closeModal={closeModal}
                    />
                )}
                {openModalExport && (
                    <DestroyRibbonExport
                        showModal={openModalExport}
                        closeModal={closeModal}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
