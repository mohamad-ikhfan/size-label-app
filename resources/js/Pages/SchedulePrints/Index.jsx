import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import ScheduletPrintCreate from "./Create";
import SchedulePrintDelete from "./Delete";
import ScheduletPrintEdit from "./Edit";
import SchedulePrintGenerate from "./Generate";
import SecondaryButton from "@/Components/SecondaryButton";
import toast from "react-hot-toast";
import SelectInput from "@/Components/SelectInput";
import InputLabel from "@/Components/InputLabel";
import SchedulePrinting from "./Printing";

export default function SchedulePrintIndex({
    auth,
    schedulePrints,
    users,
    queryParams = null,
}) {
    queryParams = queryParams || {};

    const [showModal, setShowModal] = useState(false);
    const [statusModal, setStatusModal] = useState("");
    const [schedulePrintData, setSchedulePrintData] = useState({});

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("schedule-print.index"), queryParams);
    };

    const numberFormat = (number) =>
        new Intl.NumberFormat("en-IN").format(number);

    const createModal = () => {
        setShowModal(true);
        setStatusModal("create");
    };

    const generateModal = () => {
        setShowModal(true);
        setStatusModal("generate");
    };

    const printingModal = () => {
        setShowModal(true);
        setStatusModal("printing");
    };

    const closeModal = () => {
        setShowModal(false);
        setStatusModal("");
        setSchedulePrintData({});
    };

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
                        <PrimaryButton type="button" onClick={generateModal}>
                            Generate schedule print
                        </PrimaryButton>
                        <PrimaryButton type="button" onClick={createModal}>
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
                        <div className="w-full p-6 overflow-auto">
                            <table className="w-full text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-gray-700 bg-gray-50 dark:bg-slate-700 dark:text-gray-400 border-b-2 border-gray-500 uppercase">
                                    <tr className="text-nowrap">
                                        <th className="p-3">line</th>
                                        <th className="p-3">schedule</th>
                                        <th className="p-3">release</th>
                                        <th className="p-3">style number</th>
                                        <th className="p-3">model name</th>
                                        <th className="p-3">qty</th>
                                        <th className="p-3">material type</th>
                                        <th className="p-3">material size</th>
                                        <th className="p-3">status</th>
                                        <th className="p-3">printed by</th>
                                        <th className="p-3">actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedulePrints.data.length > 0 ? (
                                        schedulePrints.data.map(
                                            (schedulePrint) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={schedulePrint.id}
                                                >
                                                    <td className="px-3 py-2">
                                                        {schedulePrint.line}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            schedulePrint.schedule_format
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            schedulePrint.release_format
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            schedulePrint.style_number
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            schedulePrint.model_name
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {numberFormat(
                                                            schedulePrint.qty
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            schedulePrint.model_for_material_type
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            schedulePrint.model_for_material_size
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {schedulePrint.status}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            schedulePrint.status_updated_by_name
                                                        }
                                                    </td>
                                                    <td>
                                                        <div className="px-3 py-2 flex gap-1.5">
                                                            {schedulePrint.status ===
                                                                null && (
                                                                <span
                                                                    className="cursor-pointer text-sm  text-blue-800"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        setSchedulePrintData(
                                                                            schedulePrint
                                                                        );
                                                                        setShowModal(
                                                                            true
                                                                        );
                                                                        setStatusModal(
                                                                            "printing"
                                                                        );
                                                                    }}
                                                                >
                                                                    Printing
                                                                </span>
                                                            )}
                                                            <PencilSquareIcon
                                                                className="w-5 text-yellow-500 cursor-pointer"
                                                                title="edit"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    setSchedulePrintData(
                                                                        schedulePrint
                                                                    );
                                                                    setShowModal(
                                                                        true
                                                                    );
                                                                    setStatusModal(
                                                                        "edit"
                                                                    );
                                                                }}
                                                            />
                                                            <TrashIcon
                                                                className="w-5 text-red-500 cursor-pointer"
                                                                title="delete"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    setSchedulePrintData(
                                                                        schedulePrint
                                                                    );
                                                                    setShowModal(
                                                                        true
                                                                    );
                                                                    setStatusModal(
                                                                        "delete"
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td
                                                colSpan={11}
                                                className="text-center p-3"
                                            >
                                                No data found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {schedulePrints.data.length > 0 && (
                                <Pagination links={schedulePrints.meta.links} />
                            )}
                        </div>
                    </div>
                </div>
                <Modal
                    show={showModal}
                    maxWidth={
                        statusModal === "delete" ||
                        statusModal === "generate" ||
                        statusModal === "printing"
                            ? "sm"
                            : "6xl"
                    }
                >
                    {statusModal === "create" && (
                        <ScheduletPrintCreate
                            users={users}
                            closeModal={closeModal}
                        />
                    )}
                    {statusModal === "edit" && (
                        <ScheduletPrintEdit
                            users={users}
                            schedulePrint={schedulePrintData}
                            closeModal={closeModal}
                        />
                    )}
                    {statusModal === "delete" && (
                        <SchedulePrintDelete
                            schedulePrint={schedulePrintData}
                            closeModal={closeModal}
                        />
                    )}
                    {statusModal === "generate" && (
                        <SchedulePrintGenerate closeModal={closeModal} />
                    )}
                    {statusModal === "printing" && (
                        <SchedulePrinting
                            user={auth.user}
                            schedulePrint={schedulePrintData}
                            closeModal={closeModal}
                        />
                    )}
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
