import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import UserCreate from "./Create";
import {
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/16/solid";
import UserDelete from "./Delete";
import UserEdit from "./Edit";
import UserShow from "./Show";

export default function UserIndex({ auth, users, queryParams = null }) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("user.index"), queryParams);
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

        router.get(route("user.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const [showModal, setShowModal] = useState(false);
    const [statusModal, setStatusModal] = useState("");
    const [user, setUser] = useState({});

    const createModal = () => {
        setShowModal(true);
        setStatusModal("create");
    };

    const closeModal = () => {
        setShowModal(false);
        setStatusModal("");
        setUser({});
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    User lists
                </h2>
            }
        >
            <Head title="User Lists" />

            <div className="pb-12 pt-6">
                <div className="max-w-full mx-auto sm:px-4 lg:px-6">
                    <div className="mb-6 flex justify-end">
                        <PrimaryButton type="button" onClick={createModal}>
                            New User
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="w-full p-6 overflow-auto">
                            <table className="w-full text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-gray-700 bg-gray-50 dark:bg-slate-700 dark:text-gray-400 border-b-2 border-gray-500 uppercase">
                                    <tr className="text-nowrap">
                                        <TableHeading sortable={false}>
                                            id
                                        </TableHeading>
                                        <TableHeading
                                            name="name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            name
                                        </TableHeading>
                                        <TableHeading
                                            name="email"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            email
                                        </TableHeading>
                                        <TableHeading
                                            name="blocked"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            blocked
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
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2">
                                            <TextInput
                                                className="w-full"
                                                type="search"
                                                defaultValue={queryParams.name}
                                                placeholder="search..."
                                                onBlur={(e) =>
                                                    searchFieldChanged(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyPress={(e) =>
                                                    onKeyPress("name", e)
                                                }
                                            />
                                        </th>
                                        <th className="px-3 py-2">
                                            <TextInput
                                                className="w-full"
                                                type="search"
                                                defaultValue={queryParams.email}
                                                placeholder="search..."
                                                onBlur={(e) =>
                                                    searchFieldChanged(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyPress={(e) =>
                                                    onKeyPress("email", e)
                                                }
                                            />
                                        </th>
                                        <th className="px-3 py-2">
                                            <SelectInput
                                                className="w-full"
                                                defaultValue={
                                                    queryParams.blocked
                                                }
                                                onChange={(e) =>
                                                    searchFieldChanged(
                                                        "blocked",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    show all
                                                </option>
                                                <option value={true}>
                                                    Blocked
                                                </option>
                                                <option value={false}>
                                                    Unblocked
                                                </option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={user.id}
                                        >
                                            <td className="px-3 py-2">
                                                {user.id}
                                            </td>
                                            <td className="px-3 py-2">
                                                {user.name}
                                            </td>
                                            <td className="px-3 py-2">
                                                {user.email}
                                            </td>
                                            <td className="px-3 py-2">
                                                {user.blocked}
                                            </td>
                                            <td className="px-3 py-2">
                                                {user.created_at}
                                            </td>
                                            <td className="px-3 py-2">
                                                {user.updated_at}
                                            </td>
                                            <td>
                                                <div className="flex gap-1.5">
                                                    <EyeIcon
                                                        className="w-5 text-gray-500 cursor-pointer"
                                                        title="show"
                                                        onClick={(e) => {
                                                            setUser(user);
                                                            setShowModal(true);
                                                            setStatusModal(
                                                                "show"
                                                            );
                                                        }}
                                                    />
                                                    <PencilSquareIcon
                                                        className="w-5 text-yellow-500 cursor-pointer"
                                                        title="edit"
                                                        onClick={(e) => {
                                                            setUser(user);
                                                            setShowModal(true);
                                                            setStatusModal(
                                                                "edit"
                                                            );
                                                        }}
                                                    />
                                                    <TrashIcon
                                                        className="w-5 text-red-500 cursor-pointer"
                                                        title="delete"
                                                        onClick={(e) => {
                                                            setUser(user);
                                                            setShowModal(true);
                                                            setStatusModal(
                                                                "delete"
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
                <Modal
                    show={showModal}
                    maxWidth={statusModal === "delete" ? "sm" : "xl"}
                >
                    {statusModal === "create" && (
                        <UserCreate closeModal={closeModal} />
                    )}
                    {statusModal === "show" && (
                        <UserShow user={user} closeModal={closeModal} />
                    )}
                    {statusModal === "edit" && (
                        <UserEdit user={user} closeModal={closeModal} />
                    )}
                    {statusModal === "delete" && (
                        <UserDelete user={user} closeModal={closeModal} />
                    )}
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
