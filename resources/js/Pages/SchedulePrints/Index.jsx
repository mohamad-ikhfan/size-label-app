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
import Table, { numberFormat } from "@/Components/Table";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import TableAction from "@/Components/TableAction";
import axios from "axios";

export default function SchedulePrintIndex({ auth, users }) {
    const [processSyncToPrinted, setProcessSyncToPrinted] = useState(false);
    const [onFetch, setOnFetch] = useState(false);
    const [schedulePrints, setSchedulePrint] = useState([]);
    const [filter, setFilter] = useState("printing");

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalGenerate, setOpenModalGenerate] = useState(false);
    const [openModalPrinting, setOpenModalPrinting] = useState(false);
    const [dataRow, setDataRow] = useState();

    const fetchData = async () => {
        await axios
            .get(route("schedule-print.fetch"))
            .then((response) => {
                setSchedulePrint(response.data);
                setOnFetch(true);
            })
            .catch(() => window.location.reload());
    };

    useEffect(() => {
        if (!onFetch) {
            fetchData();
            return;
        } else {
            let timer = setTimeout(() => setOnFetch(false), 5000);
            return () => clearTimeout(timer);
        }
    });

    const syncToPrinted = (e) => {
        setProcessSyncToPrinted(true);
        e.preventDefault();
        if (confirm("Are you sure sync to printed?")) {
            router.post(route("schedule-print.sync-to-printed"), [], {
                onSuccess: () => {
                    setOnFetch(false);
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

    const create = () => {
        setOpenModalCreate(true);
    };

    const generate = () => {
        setOpenModalGenerate(true);
    };

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
        setOnFetch(false);
        setOpenModalCreate(false);
        setOpenModalEdit(false);
        setOpenModalDelete(false);
        setOpenModalGenerate(false);
        setOpenModalPrinting(false);
        setDataRow();
    };

    const columnHelper = createColumnHelper();

    const table = useReactTable({
        columns: [
            columnHelper.accessor("line", {
                header: () => "line",
                cell: (info) => (
                    <span className="text-nowrap">{info.getValue()}</span>
                ),
                filterFn: "includesString",
                enableSorting: false,
            }),
            columnHelper.accessor("schedule_format", {
                header: () => "schedule",
                cell: (info) => info.getValue(),
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
                cell: (info) => numberFormat(info.getValue()),
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
                header: () => (
                    <>
                        <div>status</div>
                        <div>
                            <SelectInput
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-fit"
                            >
                                <option value="">ALL</option>
                                <option value="printing">Printing</option>
                                <option value="printed">Printed</option>
                            </SelectInput>
                        </div>
                    </>
                ),
                cell: (info) => info.getValue(),
                enableSorting: false,
                enableColumnFilter: false,
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
        data: schedulePrints.filter((schedule) => {
            if (filter === "printing") {
                if (schedule.status === filter || schedule.status === null) {
                    return schedule;
                }
            } else if (filter === "printed") {
                if (schedule.status === filter) {
                    return schedule;
                }
            } else {
                return schedule;
            }
        }),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        autoResetPageIndex: false,
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
                        <PrimaryButton type="button" onClick={generate}>
                            Generate schedule print
                        </PrimaryButton>
                        <PrimaryButton type="button" onClick={create}>
                            New schedule print
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 md:p-6 text-gray-900 dark:text-gray-100">
                            <Table
                                table={table}
                                pageIndex={
                                    table.getState().pagination.pageIndex
                                }
                            />
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
