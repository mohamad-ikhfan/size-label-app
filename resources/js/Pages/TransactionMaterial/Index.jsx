import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import TransactionMaterialCreate from "./Create";
import TransactionMaterialEdit from "./Edit";
import TransactionMaterialDelete from "./Delete";

export default function MaterialIndex({
    auth,
    transactionMaterials,
    materials,
    queryParams = null,
}) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("transaction-transactionMaterial.index"), queryParams);
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

        router.get(route("transaction-transactionMaterial.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const [showModal, setShowModal] = useState(false);
    const [statusModal, setStatusModal] = useState("");
    const [transactionMaterialData, setTransactionMaterialData] = useState({});

    const createModal = () => {
        setShowModal(true);
        setStatusModal("create");
    };

    const closeModal = () => {
        setShowModal(false);
        setStatusModal("");
        setTransactionMaterialData({});
    };

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
                        <PrimaryButton type="button" onClick={createModal}>
                            New Transaction Material
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
                                            name="date"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            date
                                        </TableHeading>
                                        <TableHeading
                                            name="type"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            type
                                        </TableHeading>
                                        <TableHeading
                                            name="material_id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Material
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
                                            name="first_stock_id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            first stock
                                        </TableHeading>
                                        <TableHeading
                                            name="last_stock_id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            last stock
                                        </TableHeading>
                                        <TableHeading
                                            name="transaction_by"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Transaction by
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
                                    {transactionMaterials.data.length > 0 && (
                                        <tr className="text-nowrap">
                                            <th className="px-3 pb-2"></th>
                                            <th className="px-3 pb-2">
                                                <TextInput
                                                    className="w-full"
                                                    type="search"
                                                    defaultValue={
                                                        queryParams.code
                                                    }
                                                    placeholder="search..."
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "code",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress("code", e)
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 pb-2"></th>
                                            <th className="px-3 pb-2"></th>
                                            <th className="px-3 pb-2"></th>
                                        </tr>
                                    )}
                                </thead>
                                <tbody>
                                    {transactionMaterials.data.length > 0 ? (
                                        transactionMaterials.data.map(
                                            (transactionMaterial, index) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={transactionMaterial.id}
                                                >
                                                    <td className="px-3 py-2">
                                                        {++index}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            transactionMaterial.date_format
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            transactionMaterial.type
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            transactionMaterial.material_name
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            transactionMaterial.qty
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            transactionMaterial.first_stock_qty
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            transactionMaterial.last_stock_qty
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            transactionMaterial.transaction_by_name
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            transactionMaterial.created_at
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            transactionMaterial.updated_at
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
                                                                    setTransactionMaterialData(
                                                                        transactionMaterial
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
                                                                    setTransactionMaterialData(
                                                                        transactionMaterial
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
                                                className="text-center px-3 py-2"
                                            >
                                                No data found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {transactionMaterials.data.length > 0 && (
                                <Pagination
                                    links={transactionMaterials.meta.links}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <Modal
                    show={showModal}
                    maxWidth={statusModal === "delete" ? "sm" : "xl"}
                >
                    {statusModal === "create" && (
                        <TransactionMaterialCreate
                            user={auth.user}
                            materials={materials}
                            closeModal={closeModal}
                        />
                    )}
                    {statusModal === "edit" && (
                        <TransactionMaterialEdit
                            materials={materials}
                            transactionMaterial={transactionMaterialData}
                            closeModal={closeModal}
                        />
                    )}
                    {statusModal === "delete" && (
                        <TransactionMaterialDelete
                            transactionMaterial={transactionMaterialData}
                            closeModal={closeModal}
                        />
                    )}
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
