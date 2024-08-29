import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/16/solid";
import HistoryImportDelete from "./Delete";
import HistoryImportDownload from "./Download";

export default function HistoryImportIndex({ auth, historyImports }) {
    const [showModal, setShowModal] = useState(false);
    const [statusModal, setStatusModal] = useState("");
    const [historyImportData, setHistoryImportData] = useState();

    const closeModal = () => {
        setShowModal(false);
        setStatusModal("");
        setUserData({});
    };

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
                        <div className="w-full p-6 overflow-auto">
                            <table className="w-full text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-gray-700 bg-gray-50 dark:bg-slate-700 dark:text-gray-400 border-b-2 border-gray-500 uppercase">
                                    <tr className="text-nowrap">
                                        <TableHeading sortable={false}>
                                            #
                                        </TableHeading>
                                        <TableHeading sortable={false}>
                                            name
                                        </TableHeading>
                                        <TableHeading sortable={false}>
                                            extension
                                        </TableHeading>
                                        <TableHeading sortable={false}>
                                            mime type
                                        </TableHeading>
                                        <TableHeading sortable={false}>
                                            path
                                        </TableHeading>
                                        <TableHeading sortable={false}>
                                            size
                                        </TableHeading>
                                        <TableHeading sortable={false}>
                                            actions
                                        </TableHeading>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historyImports.data.length > 0 ? (
                                        historyImports.data.map(
                                            (historyImport, index) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={historyImport.id}
                                                >
                                                    <td className="px-3 py-2">
                                                        {++index}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {historyImport.name}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            historyImport.extension
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            historyImport.mime_type
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {historyImport.path}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {historyImport.size}
                                                    </td>
                                                    <td>
                                                        <div className="px-3 py-2 flex gap-1.5">
                                                            <span
                                                                className=" text-gray-500 cursor-pointer"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    setHistoryImportData(
                                                                        historyImport
                                                                    );
                                                                    setShowModal(
                                                                        true
                                                                    );
                                                                    setStatusModal(
                                                                        "download"
                                                                    );
                                                                }}
                                                            >
                                                                Download
                                                            </span>
                                                            <TrashIcon
                                                                className="w-5 text-red-500 cursor-pointer"
                                                                title="delete"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    setHistoryImportData(
                                                                        historyImport
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
                                                colSpan={7}
                                                className="text-center px-3 py-2"
                                            >
                                                No data found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {historyImports.data.length > 0 && (
                                <Pagination links={historyImports.meta.links} />
                            )}
                        </div>
                    </div>
                </div>
                <Modal show={showModal} maxWidth={"sm"}>
                    {statusModal === "delete" && (
                        <HistoryImportDelete
                            historyImport={historyImportData}
                            closeModal={closeModal}
                        />
                    )}
                    {statusModal === "download" && (
                        <HistoryImportDownload
                            historyImport={historyImportData}
                            closeModal={closeModal}
                        />
                    )}
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
