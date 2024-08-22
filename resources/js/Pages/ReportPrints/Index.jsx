import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import ReportPrintCreate from "./Create";
import ReportPrintEdit from "./Edit";
import ReportPrintDelete from "./Delete";
import ReportPrintImport from "./Import";

export default function ReportPrintIndex({
    auth,
    reportPrints,
    queryParams = null,
    filters,
}) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("report-print.index"), queryParams);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }

        router.get(route("report-print.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const [showModal, setShowModal] = useState(false);
    const [statusModal, setStatusModal] = useState("");
    const [reportPrintData, setReportPrintData] = useState({});

    const createModal = () => {
        setShowModal(true);
        setStatusModal("create");
    };

    const importModal = () => {
        setShowModal(true);
        setStatusModal("import");
    };

    const closeModal = () => {
        setShowModal(false);
        setStatusModal("");
        setReportPrintData({});
    };

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
                        <PrimaryButton type="button" onClick={importModal}>
                            Import report print
                        </PrimaryButton>
                        <PrimaryButton type="button" onClick={createModal}>
                            New report print
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="w-full p-6 overflow-auto">
                            <table className="w-full text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-gray-700 bg-gray-50 dark:bg-slate-700 dark:text-gray-400 border-b-2 border-gray-500 uppercase">
                                    <tr className="text-nowrap">
                                        <TableHeading sortable={false}>
                                            #
                                        </TableHeading>
                                        <TableHeading
                                            name="printed_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Printed at
                                        </TableHeading>
                                        <TableHeading
                                            name="line"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Line
                                        </TableHeading>
                                        <TableHeading
                                            name="release"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Release
                                        </TableHeading>
                                        <TableHeading
                                            name="po_number"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            PO Number
                                        </TableHeading>
                                        <TableHeading
                                            name="style_number"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Style number
                                        </TableHeading>
                                        <TableHeading
                                            name="model_name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Model name
                                        </TableHeading>
                                        <TableHeading
                                            name="qty"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Qty
                                        </TableHeading>
                                        <TableHeading
                                            name="special"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Special
                                        </TableHeading>
                                        <TableHeading
                                            name="remark"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Remark
                                        </TableHeading>
                                        <TableHeading
                                            name="printed_by"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Printed by
                                        </TableHeading>
                                        <TableHeading
                                            name="created_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            created at
                                        </TableHeading>
                                        <TableHeading
                                            name="updated_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            updated at
                                        </TableHeading>
                                        <TableHeading sortable={false}>
                                            actions
                                        </TableHeading>
                                    </tr>
                                    {reportPrints.data.length > 0 && (
                                        <tr className="text-nowrap">
                                            <th className="px-3 pb-2"></th>
                                            <th className="px-3 pb-2">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.printed_at
                                                    }
                                                    onChange={(e) =>
                                                        searchFieldChanged(
                                                            "printed_at",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        show all
                                                    </option>
                                                    {Object.entries(
                                                        filters["printed_at"]
                                                    ).map((value) => (
                                                        <option
                                                            key={value[0]}
                                                            value={value[0]}
                                                        >
                                                            {value[1]}
                                                        </option>
                                                    ))}
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 pb-2">
                                                <TextInput
                                                    className="w-full"
                                                    type="search"
                                                    defaultValue={
                                                        queryParams.line
                                                    }
                                                    placeholder="search..."
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "line",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress("line", e)
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 pb-2">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.release
                                                    }
                                                    onChange={(e) =>
                                                        searchFieldChanged(
                                                            "release",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        show all
                                                    </option>
                                                    {Object.entries(
                                                        filters["release"]
                                                    ).map((value) => (
                                                        <option
                                                            key={value[0]}
                                                            value={value[0]}
                                                        >
                                                            {value[1]}
                                                        </option>
                                                    ))}
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 pb-2">
                                                <TextInput
                                                    className="w-full"
                                                    type="search"
                                                    defaultValue={
                                                        queryParams.po_number
                                                    }
                                                    placeholder="search..."
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "po_number",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress(
                                                            "po_number",
                                                            e
                                                        )
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 pb-2">
                                                <TextInput
                                                    className="w-full"
                                                    type="search"
                                                    defaultValue={
                                                        queryParams.style_number
                                                    }
                                                    placeholder="search..."
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "style_number",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress(
                                                            "style_number",
                                                            e
                                                        )
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 pb-2">
                                                <TextInput
                                                    className="w-full"
                                                    type="search"
                                                    defaultValue={
                                                        queryParams.model_name
                                                    }
                                                    placeholder="search..."
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "model_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress(
                                                            "model_name",
                                                            e
                                                        )
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 pb-2"></th>
                                            <th className="px-3 pb-2">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.special
                                                    }
                                                    onChange={(e) =>
                                                        searchFieldChanged(
                                                            "special",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        show all
                                                    </option>
                                                    {Object.entries(
                                                        filters["special"]
                                                    ).map((value) => (
                                                        <option
                                                            key={value[0]}
                                                            value={value[0]}
                                                        >
                                                            {value[1]}
                                                        </option>
                                                    ))}
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 pb-2">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.remark
                                                    }
                                                    onChange={(e) =>
                                                        searchFieldChanged(
                                                            "remark",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        show all
                                                    </option>
                                                    {Object.entries(
                                                        filters["remark"]
                                                    ).map((value) => (
                                                        <option
                                                            key={value[0]}
                                                            value={value[0]}
                                                        >
                                                            {value[1]}
                                                        </option>
                                                    ))}
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 pb-2">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.printed_by
                                                    }
                                                    onChange={(e) =>
                                                        searchFieldChanged(
                                                            "printed_by",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        show all
                                                    </option>
                                                    {Object.entries(
                                                        filters["printed_by"]
                                                    ).map((value) => (
                                                        <option
                                                            key={value[0]}
                                                            value={value[0]}
                                                        >
                                                            {value[1]}
                                                        </option>
                                                    ))}
                                                </SelectInput>
                                            </th>
                                            <th
                                                className="px-3 pb-2"
                                                colSpan={3}
                                            ></th>
                                        </tr>
                                    )}
                                </thead>
                                <tbody>
                                    {reportPrints.data.length > 0 ? (
                                        reportPrints.data.map(
                                            (reportPrint, index) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={reportPrint.id}
                                                >
                                                    <td className="px-3 py-2">
                                                        {++index}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            reportPrint.printed_at_format
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {reportPrint.line}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            reportPrint.release_format
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {reportPrint.po_number}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            reportPrint.style_number
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {reportPrint.model_name}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {reportPrint.qty}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {reportPrint.special}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {reportPrint.remark}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            reportPrint.printed_by_name
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {reportPrint.created_at}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {reportPrint.updated_at}
                                                    </td>
                                                    <td>
                                                        <div className="px-3 py-2 flex gap-1.5">
                                                            <PencilSquareIcon
                                                                className="w-5 text-yellow-500 cursor-pointer"
                                                                title="edit"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    setReportPrintData(
                                                                        reportPrint
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
                                                                    setReportPrintData(
                                                                        reportPrint
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
                                                colSpan={14}
                                                className="text-center px-3 py-2"
                                            >
                                                No data found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {reportPrints.data.length > 0 && (
                                <Pagination links={reportPrints.meta.links} />
                            )}
                        </div>
                    </div>
                </div>
                <Modal
                    show={showModal}
                    maxWidth={
                        statusModal === "delete" || statusModal === "import"
                            ? "sm"
                            : "6xl"
                    }
                >
                    {statusModal === "create" && (
                        <ReportPrintCreate
                            user={auth.user}
                            closeModal={closeModal}
                        />
                    )}
                    {statusModal === "edit" && (
                        <ReportPrintEdit
                            user={auth.user}
                            reportPrint={reportPrintData}
                            closeModal={closeModal}
                        />
                    )}
                    {statusModal === "delete" && (
                        <ReportPrintDelete
                            reportPrint={reportPrintData}
                            closeModal={closeModal}
                        />
                    )}
                    {statusModal === "import" && (
                        <ReportPrintImport closeModal={closeModal} />
                    )}
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
