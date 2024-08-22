import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import ScheduletPrintCreate from "./Create";
import SchedulePrintDelete from "./Delete";
import ScheduletPrintEdit from "./Edit";
import SchedulePrintGenerate from "./Generate";

export default function SchedulePrintIndex({
    auth,
    schedulePrints,
    users,
    remarks,
}) {
    const [showModal, setShowModal] = useState(false);
    const [statusModal, setStatusModal] = useState("");
    const [schedulePrintData, setSchedulePrintData] = useState({});

    const createModal = () => {
        setShowModal(true);
        setStatusModal("create");
    };

    const generateModal = () => {
        setShowModal(true);
        setStatusModal("generate");
    };

    const closeModal = () => {
        setShowModal(false);
        setStatusModal("");
        setSchedulePrintData({});
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
                        <PrimaryButton type="button" onClick={generateModal}>
                            Generate schedule print
                        </PrimaryButton>
                        <PrimaryButton type="button" onClick={createModal}>
                            New schedule print
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
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
                                                        {schedulePrint.qty}
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
                        statusModal === "delete" || statusModal === "generate"
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
                        <SchedulePrintGenerate
                            remarks={remarks}
                            closeModal={closeModal}
                        />
                    )}
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
