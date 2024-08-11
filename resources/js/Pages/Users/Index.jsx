import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

export default function User({ auth, users, queryParams = null }) {
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    User Lists
                </h2>
            }
        >
            <Head title="User Lists" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="w-full p-5 overflow-auto">
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
                                                    Show all
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
                                            <td></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
