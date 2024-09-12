import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import UserCreate from "./Create";
import UserDelete from "./Delete";
import UserEdit from "./Edit";
import UserShow from "./Show";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import Table from "@/Components/Table";
import TableAction from "@/Components/TableAction";

export default function UserIndex({ auth, users }) {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalShow, setOpenModalShow] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [dataRow, setDataRow] = useState();

    const show = (data) => {
        setDataRow(data);
        setOpenModalShow(true);
    };

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
        setOpenModalShow(false);
        setOpenModalEdit(false);
        setOpenModalDelete(false);
        setDataRow();
    };

    const data = useMemo(() => users.data, [users.data]);

    const columnHelper = createColumnHelper();

    const table = useReactTable({
        columns: [
            columnHelper.accessor("#", {
                cell: (info) => info.row.index + 1,
                enableColumnFilter: false,
                enableSorting: false,
            }),
            columnHelper.accessor("full_name", {
                header: () => "full name",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("name", {
                header: () => "name",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("email", {
                header: () => "email",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            }),
            columnHelper.accessor("blocked_at", {
                header: () => "blocked at",
                cell: (info) => info.getValue(),
                enableColumnFilter: false,
            }),
            columnHelper.accessor("action", {
                cell: (info) => (
                    <TableAction
                        data={info.cell.row.original}
                        show={show}
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
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="pb-12 pt-6">
                <div className="max-w-full mx-auto sm:px-4 lg:px-6">
                    <div className="mb-6 flex justify-end">
                        <PrimaryButton
                            type="button"
                            onClick={() => setOpenModalCreate(true)}
                        >
                            New User
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 md:p-6 text-gray-900 dark:text-gray-100">
                            <Table table={table} />
                        </div>
                    </div>
                </div>
                {openModalCreate && (
                    <UserCreate
                        showModal={openModalCreate}
                        closeModal={closeModal}
                    />
                )}
                {openModalShow && (
                    <UserShow
                        state={dataRow}
                        showModal={openModalShow}
                        closeModal={closeModal}
                    />
                )}
                {openModalEdit && (
                    <UserEdit
                        state={dataRow}
                        showModal={openModalEdit}
                        closeModal={closeModal}
                    />
                )}
                {openModalDelete && (
                    <UserDelete
                        state={dataRow}
                        showModal={openModalDelete}
                        closeModal={closeModal}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
