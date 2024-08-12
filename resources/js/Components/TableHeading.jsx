import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function TableHeading({
    sortable = true,
    name,
    children,
    sort_field = null,
    sort_direction = null,
    sortChanged = () => {},
}) {
    return (
        <>
            {sortable ? (
                <th onClick={(e) => sortChanged(name)}>
                    <div className="px-3 py-2 flex items-center justify-between gap-1 cursor-pointer">
                        <div>{children}</div>
                        <div>
                            <ChevronUpIcon
                                className={
                                    "w-4 -mb-1 " +
                                    (sort_field === name &&
                                    sort_direction === "asc"
                                        ? "text-gray-950 dark:text-white"
                                        : "")
                                }
                            />
                            <ChevronDownIcon
                                className={
                                    "w-4 -mt-1 " +
                                    (sort_field === name &&
                                    sort_direction === "desc"
                                       ? "text-gray-950 dark:text-white"
                                        : "")
                                }
                            />
                        </div>
                    </div>
                </th>
            ) : (
                <th className="px-3 py-2 cursor-default">{children}</th>
            )}
        </>
    );
}
