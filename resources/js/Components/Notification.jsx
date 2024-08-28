import { BellIcon } from "@heroicons/react/16/solid";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";

export default function Notification() {
    const [notification, setNotification] = useState([]);
    const [unreadNotification, setUnreadNotification] = useState(0);

    const getNotification = async () => {
        await axios.get(route("notification.index")).then((response) => {
            setNotification(response.data);
            setUnreadNotification(
                response.data.filter((v) => v.read_at === null).length
            );
        });
    };

    const handleReadNotification = (id) => {
        router.put(route("notification.read", id), [], {
            onSuccess: () => getNotification(),
        });
    };

    const handleDeleteNotification = (id) => {
        router
            .delete(route("notification.destroy", id))
            .then(() => getNotification());
    };

    useEffect(() => {
        () => getNotification();
    });

    return (
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
                        notification.map((notif) => (
                            <div
                                className={
                                    notif.read_at === null
                                        ? "bg-green-200 p-2 rounded-md space-y-1"
                                        : "bg-gray-200 p-2 rounded-md space-y-1"
                                }
                                key={notif.id}
                            >
                                <h6
                                    className={
                                        notif.data.notif === "success"
                                            ? "font-semibold text-green-800"
                                            : "font-semibold text-red-800"
                                    }
                                >
                                    {notif.data.title}
                                </h6>
                                <p className="text-wrap text-gray-900">
                                    {notif.data.message}
                                </p>
                                <div className="flex flex-wrap justify-between gap-2">
                                    <button
                                        type="button"
                                        className="text-xs text-blue-800 text-nowrap"
                                        onClick={(e) =>
                                            handleReadNotification(notif.id)
                                        }
                                    >
                                        Mark as read
                                    </button>
                                    <button
                                        type="button"
                                        className="text-xs text-red-800 text-nowrap"
                                        onClick={(e) =>
                                            handleDeleteNotification(notif.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center dark:text-gray-400">
                            No notification.
                        </div>
                    )}
                </div>
            </Dropdown.Content>
        </Dropdown>
    );
}
