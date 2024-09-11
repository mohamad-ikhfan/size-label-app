import {
    ArrowDownTrayIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/16/solid";

export function TableAction({ data, show, edit, destroy, download }) {
    return (
        <div className="flex gap-2 justify-start">
            {download && (
                <ArrowDownTrayIcon
                    className="w-5 cursor-pointer text-gray-400"
                    title="Download"
                    onClick={() => download(data)}
                />
            )}
            {show && (
                <EyeIcon
                    className="w-5 cursor-pointer text-blue-400"
                    title="Show"
                    onClick={() => show(data)}
                />
            )}
            {edit && (
                <PencilIcon
                    className="w-5 cursor-pointer text-yellow-400"
                    title="Edit"
                    onClick={() => edit(data)}
                />
            )}
            {destroy && (
                <TrashIcon
                    className="w-5 cursor-pointer text-red-400"
                    title="Delete"
                    onClick={() => destroy(data)}
                />
            )}
        </div>
    );
}