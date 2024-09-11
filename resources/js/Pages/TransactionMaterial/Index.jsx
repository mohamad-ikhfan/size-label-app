import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import TransactionMaterialCreate from "./Create";
import TransactionMaterialEdit from "./Edit";
import TransactionMaterialDelete from "./Delete";
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

export default function MaterialIndex({
    auth,
    transactionMaterials,
    materials,
}) {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
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
        setDataRow();
    };

    const data = useMemo(() => transactionMaterials.data, []);

    const columnHelper = createColumnHelper();

    const table = useReactTable({
        columns: [
            columnHelper.accessor("#", {
                cell: (info) => info.row.index + 1,
                enableColumnFilter: false,
                enableSorting: false,
            }),
            columnHelper.accessor("date_format", {
                header: () => "date",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("type_text", {
                header: () => "type",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("material_name", {
                header: () => "material",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("qty", {
                header: () => "qty",
                cell: (info) => info.getValue(),
                enableColumnFilter: false,
            }),
            columnHelper.accessor("first_stock_qty", {
                header: () => "first stock",
                cell: (info) => info.getValue(),
                enableColumnFilter: false,
            }),
            columnHelper.accessor("last_stock_qty", {
                header: () => "last stock",
                cell: (info) => info.getValue(),
                enableColumnFilter: false,
            }),
            columnHelper.accessor("transaction_by_name", {
                header: () => "transaction by",
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
                    Transaction Materials
                </h2>
            }
        >
            <Head title="Materials" />

            <div className="pb-12 pt-6">
                <div className="max-w-full mx-auto sm:px-4 lg:px-6">
                    <div className="mb-6 flex justify-end">
                        <PrimaryButton
                            type="button"
                            onClick={() => setOpenModalCreate(true)}
                        >
                            New Transaction Material
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 md:p-6 text-gray-900 dark:text-gray-100">
                            <Table table={table} />
                        </div>
                    </div>
                </div>
                {openModalCreate && (
                    <TransactionMaterialCreate
                        user={auth.user}
                        materials={materials}
                        showModal={openModalCreate}
                        closeModal={closeModal}
                    />
                )}
                {openModalEdit && (
                    <TransactionMaterialEdit
                        materials={materials}
                        state={dataRow}
                        showModal={openModalEdit}
                        closeModal={closeModal}
                    />
                )}
                {openModalDelete && (
                    <TransactionMaterialDelete
                        state={dataRow}
                        showModal={openModalDelete}
                        closeModal={closeModal}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
