import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import {
    PencilSquareIcon,
    TrashIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/16/solid";
import ModelForMaterialCreate from "./Create";
import TextInput from "@/Components/TextInput";
import ModelForMaterialEdit from "./Edit";
import ModelForMaterialDelete from "./Delete";

export default function ModelForMaterialIndex({
    auth,
    modelForMaterials,
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

        router.get(route("model-for-material.index"), queryParams);
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

        router.get(route("model-for-material.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const [showModal, setShowModal] = useState(false);
    const [statusModal, setStatusModal] = useState("");
    const [modelForMaterialData, setModelForMaterialData] = useState({});

    const createModal = () => {
        setShowModal(true);
        setStatusModal("create");
    };

    const closeModal = () => {
        setShowModal(false);
        setStatusModal("");
        setModelForMaterialData({});
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Model for materials
                </h2>
            }
        >
            <Head title="Model For Materials" />

            <div className="pb-12 pt-6">
                <div className="max-w-full mx-auto sm:px-4 lg:px-6">
                    <div className="mb-6 flex justify-end">
                        <PrimaryButton type="button" onClick={createModal}>
                            New model for material
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
                                            name="material_type"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Material type
                                        </TableHeading>
                                        <TableHeading
                                            name="material_size"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Material size
                                        </TableHeading>
                                        <TableHeading
                                            name="wide"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Wide
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
                                    {modelForMaterials.data.length > 0 && (
                                        <tr className="text-nowrap">
                                            <th className="px-3 pb-2"></th>
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
                                            <th className="px-3 pb-2">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.material_type
                                                    }
                                                    onChange={(e) =>
                                                        searchFieldChanged(
                                                            "material_type",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        show all
                                                    </option>
                                                    {Object.entries(
                                                        filters["material_type"]
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
                                                        queryParams.material_size
                                                    }
                                                    onChange={(e) =>
                                                        searchFieldChanged(
                                                            "material_size",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        show all
                                                    </option>
                                                    {Object.entries(
                                                        filters["material_size"]
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
                                                        queryParams.wide
                                                    }
                                                    onChange={(e) =>
                                                        searchFieldChanged(
                                                            "wide",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        show all
                                                    </option>
                                                    {Object.entries(
                                                        filters["wide"]
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
                                            <th className="px-3 pb-2"></th>
                                        </tr>
                                    )}
                                </thead>
                                <tbody>
                                    {modelForMaterials.data.length > 0 ? (
                                        modelForMaterials.data.map(
                                            (modelForMaterial, index) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={modelForMaterial.id}
                                                >
                                                    <td className="px-3 py-2">
                                                        {++index}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            modelForMaterial.model_name
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            modelForMaterial.material_type
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            modelForMaterial.material_size
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {modelForMaterial.wide ==
                                                        1 ? (
                                                            <CheckCircleIcon className="w-6 text-green-600" />
                                                        ) : (
                                                            <XCircleIcon className="w-6 text-red-600" />
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            modelForMaterial.created_at
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            modelForMaterial.updated_at
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
                                                                    setModelForMaterialData(
                                                                        modelForMaterial
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
                                                                    setModelForMaterialData(
                                                                        modelForMaterial
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
                                                colSpan={8}
                                                className="text-center px-3 py-2"
                                            >
                                                No data found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {modelForMaterials.data.length > 0 && (
                                <Pagination
                                    links={modelForMaterials.meta.links}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <Modal
                    show={showModal}
                    maxWidth={statusModal === "delete" ? "sm" : "6xl"}
                >
                    {statusModal === "create" && (
                        <ModelForMaterialCreate closeModal={closeModal} />
                    )}
                    {statusModal === "edit" && (
                        <ModelForMaterialEdit
                            modelForMaterial={modelForMaterialData}
                            closeModal={closeModal}
                        />
                    )}
                    {statusModal === "delete" && (
                        <ModelForMaterialDelete
                            modelForMaterial={modelForMaterialData}
                            closeModal={closeModal}
                        />
                    )}
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
