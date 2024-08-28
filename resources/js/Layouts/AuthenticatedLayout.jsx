import { useEffect, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, router } from "@inertiajs/react";
import { Toaster } from "react-hot-toast";
import { ChevronUpDownIcon, BellIcon } from "@heroicons/react/16/solid";
import axios from "axios";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [notification, setNotification] = useState([]);
    const [unreadNotification, setUnreadNotification] = useState(0);

    const getNotification = () => {
        axios
            .get(route("notification.index"))
            .then((response) => {
                setNotification(response.data);
                setUnreadNotification(
                    response.data.filter((v) => v.read_at === null).length
                );
            })
            .catch(() => router.reload());
    };

    const handleReadNotification = (id) => {
        router.put(route("notification.read", id));
    };

    const handleDeleteNotification = (id) => {
        router.delete(route("notification.destroy", id));
        getNotification();
    };

    useEffect(() => {
        let timer = setTimeout(() => getNotification(), 10000);

        () => clearTimeout(timer);
    });

    return (
        <>
            <Toaster />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                    <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route("user.index")}
                                        active={route().current("user.*")}
                                    >
                                        Users
                                    </NavLink>
                                    <div className="inline-flex items-center">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button
                                                    type="button"
                                                    className={
                                                        route().current(
                                                            "material.*"
                                                        ) ||
                                                        route().current(
                                                            "transaction-material.*"
                                                        )
                                                            ? "inline-flex items-center px-1 py-5 border-b-2 text-sm font-medium leading-6 transition duration-150 ease-in-out focus:outline-none border-indigo-400 dark:border-indigo-600 text-gray-900 dark:text-gray-100 focus:border-indigo-700"
                                                            : "inline-flex items-center px-1 py-5 border-b-2 text-sm font-medium leading-6 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700"
                                                    }
                                                >
                                                    Materials
                                                    <ChevronUpDownIcon className="ms-2 -me-0.5 h-4 w-4" />
                                                </button>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route(
                                                        "material.index"
                                                    )}
                                                >
                                                    Materials
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "transaction-material.index"
                                                    )}
                                                >
                                                    Transaction Materials
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                    <NavLink
                                        href={route("model-for-material.index")}
                                        active={route().current(
                                            "model-for-material.*"
                                        )}
                                    >
                                        Model For Materials
                                    </NavLink>
                                    <NavLink
                                        href={route("po-item.index")}
                                        active={route().current("po-item.*")}
                                    >
                                        PO Items
                                    </NavLink>
                                    <NavLink
                                        href={route("report-print.index")}
                                        active={route().current(
                                            "report-print.*"
                                        )}
                                    >
                                        Report Prints
                                    </NavLink>
                                    <NavLink
                                        href={route("destroy-ribbon.index")}
                                        active={route().current(
                                            "destroy-ribbon.*"
                                        )}
                                    >
                                        Destroy Ribbons
                                    </NavLink>
                                    <NavLink
                                        href={route("schedule-print.index")}
                                        active={route().current(
                                            "schedule-print.*"
                                        )}
                                    >
                                        Schedule Prints
                                    </NavLink>
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                <div className="ms-3 relative p-2">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center p-1 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    <BellIcon className="w-5" />
                                                    {unreadNotification > 0 && (
                                                        <span className="absolute top-0 right-0 px-1 rounded-full bg-orange-600 text-orange-50 text-xs">
                                                            {unreadNotification}
                                                        </span>
                                                    )}
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <div className="px-2 py-4 text-sm max-h-96 overflow-y-auto space-y-1">
                                                {notification.length > 0 ? (
                                                    notification.map(
                                                        (notif) => (
                                                            <div
                                                                className={
                                                                    notif.read_at ===
                                                                    null
                                                                        ? "bg-green-200 p-2 rounded-md space-y-1"
                                                                        : "bg-gray-200 p-2 rounded-md space-y-1"
                                                                }
                                                                key={notif.id}
                                                            >
                                                                <h6
                                                                    className={
                                                                        notif
                                                                            .data
                                                                            .notif ===
                                                                        "success"
                                                                            ? "font-semibold text-green-800"
                                                                            : "font-semibold text-red-800"
                                                                    }
                                                                >
                                                                    {
                                                                        notif
                                                                            .data
                                                                            .title
                                                                    }
                                                                </h6>
                                                                <p className="text-wrap text-gray-900">
                                                                    {
                                                                        notif
                                                                            .data
                                                                            .message
                                                                    }
                                                                </p>
                                                                <div className="flex flex-wrap justify-between gap-2">
                                                                    <button
                                                                        type="button"
                                                                        className="text-xs text-blue-800 text-nowrap"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            handleReadNotification(
                                                                                notif.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Mark as
                                                                        read
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="text-xs text-red-800 text-nowrap"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            handleDeleteNotification(
                                                                                notif.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <div className="text-center dark:text-gray-400">
                                                        No notification.
                                                    </div>
                                                )}
                                            </div>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                                <div className="relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.full_name}
                                                    <ChevronUpDownIcon className="ms-2 -me-0.5 h-4 w-4" />
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " sm:hidden"
                        }
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white dark:bg-gray-800 shadow">
                        <div className="max-w-full mx-auto py-4 px-2 sm:px-4 lg:px-6">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </>
    );
}
