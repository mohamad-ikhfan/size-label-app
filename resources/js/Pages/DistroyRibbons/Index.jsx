import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import DestroyRibbonCreate from "./Create";
import DestroyRibbonEdit from "./Edit";
import DestroyRibbonDelete from "./Delete";
import SecondaryButton from "@/Components/SecondaryButton";
import DestroyRibbonExport from "./Export";

export default function DestroyRibbonIndex({
    auth,
    destroyRibbons,
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

        router.get(route("destroy-ribbon.index"), queryParams);
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

        router.get(route("destroy-ribbon.index"), queryParams);
    };

    const numberFormat = (number) =>
        new Intl.NumberFormat("en-IN").format(number);

    const [showModal, setShowModal] = useState(false);
    const [statusModal, setStatusModal] = useState("");
    const [destroyRibbonData, setDestroyRibbonData] = useState({});

    const createModal = () => {
        setShowModal(true);
        setStatusModal("create");
    };

    const exportModal = () => {
        setShowModal(true);
        setStatusModal("export");
    };

    const closeModal = () => {
        setShowModal(false);
        setStatusModal("");
        setDestroyRibbonData({});
    };

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
                        <SecondaryButton type="button" onClick={exportModal}>
                            Export Destroy Ribbon
                        </SecondaryButton>
                        <PrimaryButton type="button" onClick={createModal}>
                            New Destroy Ribbon
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
                                            name="destroyed_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            destroyed at
                                        </TableHeading>
                                        <TableHeading
                                            name="destroyed_by"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            destroyed by
                                        </TableHeading>
                                        <TableHeading
                                            name="qty"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            qty
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
                                    {destroyRibbons.data.length > 0 && (
                                        <tr className="text-nowrap">
                                            <th className="px-3 pb-2"></th>
                                            <th className="px-3 pb-2">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.destroyed_at
                                                    }
                                                    onChange={(e) =>
                                                        searchFieldChanged(
                                                            "destroyed_at",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        show all
                                                    </option>
                                                    {Object.entries(
                                                        filters["destroyed_at"]
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
                                                        queryParams.destroyed_by
                                                    }
                                                    onChange={(e) =>
                                                        searchFieldChanged(
                                                            "destroyed_by",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        show all
                                                    </option>
                                                    {Object.entries(
                                                        filters["destroyed_by"]
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
                                                colSpan={4}
                                            ></th>
                                        </tr>
                                    )}
                                </thead>
                                <tbody>
                                    {destroyRibbons.data.length > 0 ? (
                                        destroyRibbons.data.map(
                                            (destroyRibbon, index) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={destroyRibbon.id}
                                                >
                                                    <td className="px-3 py-2">
                                                        {++index}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            destroyRibbon.destroyed_date
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            destroyRibbon.destroyed_by_name
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {numberFormat(
                                                            destroyRibbon.qty
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            destroyRibbon.created_at
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            destroyRibbon.updated_at
                                                        }
                                                    </td>
                                                    <td>
                                                        {auth.user.id ===
                                                            destroyRibbon.destroyed_by && (
                                                            <div className="px-3 py-2 flex gap-1.5">
                                                                <PencilSquareIcon
                                                                    className="w-5 text-yellow-500 cursor-pointer"
                                                                    title="edit"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        setDestroyRibbonData(
                                                                            destroyRibbon
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
                                                                        setDestroyRibbonData(
                                                                            destroyRibbon
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
                                                        )}
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
                            {destroyRibbons.data.length > 0 && (
                                <Pagination links={destroyRibbons.meta.links} />
                            )}
                        </div>
                    </div>
                </div>
                <Modal
                    show={showModal}
                    maxWidth={statusModal === "delete" ? "sm" : "xl"}
                >
                    {statusModal === "create" && (
                        <DestroyRibbonCreate
                            userId={auth.user.id}
                            closeModal={closeModal}
                        />
                    )}
                    {statusModal === "edit" && (
                        <DestroyRibbonEdit
                            destroyRibbon={destroyRibbonData}
                            closeModal={closeModal}
                        />
                    )}
                    {statusModal === "delete" && (
                        <DestroyRibbonDelete
                            destroyRibbon={destroyRibbonData}
                            closeModal={closeModal}
                        />
                    )}
                    {statusModal === "export" && (
                        <DestroyRibbonExport closeModal={closeModal} />
                    )}
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
