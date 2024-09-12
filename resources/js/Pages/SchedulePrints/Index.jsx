import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import ScheduletPrintCreate from "./Create";
import SchedulePrintDelete from "./Delete";
import ScheduletPrintEdit from "./Edit";
import SchedulePrintGenerate from "./Generate";
import SecondaryButton from "@/Components/SecondaryButton";
import toast from "react-hot-toast";
import SelectInput from "@/Components/SelectInput";
import InputLabel from "@/Components/InputLabel";
import SchedulePrinting from "./Printing";
import Table from "@/Components/Table";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import TableAction from "@/Components/TableAction";

export default function SchedulePrintIndex({
    auth,
    schedulePrints,
    users,
    queryParams = null,
}) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("schedule-print.index"), queryParams);
    };

    useEffect(() => {
        const timer = setTimeout(
            async () => router.reload({ only: ["schedulePrints"] }),
            6000
        );
        return () => clearTimeout(timer);
    }, [schedulePrints]);

    const [processSyncToPrinted, setProcessSyncToPrinted] = useState(false);

    const syncToPrinted = (e) => {
        setProcessSyncToPrinted(true);
        e.preventDefault();
        if (confirm("Are you sure sync to printed?")) {
            router.post(route("schedule-print.sync-to-printed"), [], {
                onSuccess: () => {
                    setProcessSyncToPrinted(false);
                    toast.success("Sync to printed successfully.", {
                        position: "top-right",
                        duration: 3000,
                    });
                },
            });
        } else {
            setProcessSyncToPrinted(false);
        }
    };

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalGenerate, setOpenModalGenerate] = useState(false);
    const [openModalPrinting, setOpenModalPrinting] = useState(false);
    const [dataRow, setDataRow] = useState();

    const edit = (data) => {
        setDataRow(data);
        setOpenModalEdit(true);
    };

    const destroy = (data) => {
        setDataRow(data);
        setOpenModalDelete(true);
    };

    const printing = (data) => {
        setDataRow(data);
        setOpenModalPrinting(true);
    };

    const closeModal = () => {
        setOpenModalCreate(false);
        setOpenModalEdit(false);
        setOpenModalDelete(false);
        setOpenModalGenerate(false);
        setOpenModalPrinting(false);
        setDataRow();
    };

    const data = useMemo(() => schedulePrints.data, [schedulePrints.data]);

    const columnHelper = createColumnHelper();

    const table = useReactTable({
        columns: [
            columnHelper.accessor("line", {
                header: () => "line",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
                enableSorting: false,
            }),
            columnHelper.accessor("schedule_format", {
                header: () => "schedule",
                cell: (info) => info.getValue(),
                enableColumnFilter: false,
                enableSorting: false,
            }),
            columnHelper.accessor("release_format", {
                header: () => "release",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
                enableSorting: false,
            }),
            columnHelper.accessor("style_number", {
                header: () => "style number",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
                enableSorting: false,
            }),
            columnHelper.accessor("model_name", {
                header: () => "model name",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
                enableSorting: false,
            }),
            columnHelper.accessor("qty", {
                header: () => "qty",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
                enableSorting: false,
            }),
            columnHelper.accessor("model_for_material_type", {
                header: () => "material type",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
                enableSorting: false,
            }),
            columnHelper.accessor("model_for_material_size", {
                header: () => "material size",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
                enableSorting: false,
            }),
            columnHelper.accessor("status", {
                header: () => "status",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
                enableSorting: false,
            }),
            columnHelper.accessor("status_updated_by_name", {
                header: () => "printed by",
                cell: (info) => info.getValue(),
                filterFn: "includesString",
                enableSorting: false,
            }),
            columnHelper.accessor("action", {
                cell: (info) => (
                    <TableAction
                        data={info.cell.row.original}
                        printing={
                            info.cell.row.original.status_updated_by === null &&
                            printing
                        }
                        edit={auth.user.id === 1 && edit}
                        destroy={auth.user.id === 1 && destroy}
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
                    Schedule prints
                </h2>
            }
        >
            <Head title="Schedule Prints" />

            <div className="pb-12 pt-6">
                <div className="max-w-full mx-auto sm:px-4 lg:px-6">
                    <div className="mb-6 flex justify-end gap-4">
                        <SecondaryButton
                            type="button"
                            disabled={processSyncToPrinted}
                            onClick={(e) => syncToPrinted(e)}
                        >
                            Sync to printed
                        </SecondaryButton>
                        <PrimaryButton
                            type="button"
                            onClick={() => setOpenModalGenerate(true)}
                        >
                            Generate schedule print
                        </PrimaryButton>
                        <PrimaryButton
                            type="button"
                            onClick={() => setOpenModalCreate(true)}
                        >
                            New schedule print
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-end p-6">
                            <div className="flex gap-4">
                                <InputLabel
                                    htmlFor="status"
                                    value="Status Filter"
                                />
                                <SelectInput
                                    className="w-full"
                                    defaultValue={
                                        queryParams.status ?? "printing"
                                    }
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="printed">printed</option>
                                    <option value="printing">printing</option>
                                </SelectInput>
                            </div>
                        </div>
                        <div className="p-4 md:p-6 text-gray-900 dark:text-gray-100">
                            <Table table={table} />
                        </div>
                    </div>
                </div>
                {openModalCreate && (
                    <ScheduletPrintCreate
                        users={users}
                        showModal={openModalCreate}
                        closeModal={closeModal}
                    />
                )}
                {openModalEdit && (
                    <ScheduletPrintEdit
                        users={users}
                        showModal={openModalEdit}
                        state={dataRow}
                        closeModal={closeModal}
                    />
                )}
                {openModalDelete && (
                    <SchedulePrintDelete
                        showModal={openModalDelete}
                        state={dataRow}
                        closeModal={closeModal}
                    />
                )}
                {openModalGenerate && (
                    <SchedulePrintGenerate
                        showModal={openModalGenerate}
                        closeModal={closeModal}
                    />
                )}
                {openModalPrinting && (
                    <SchedulePrinting
                        showModal={openModalPrinting}
                        user={auth.user}
                        state={dataRow}
                        closeModal={closeModal}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
