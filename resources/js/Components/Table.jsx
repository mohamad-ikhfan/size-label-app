import { flexRender } from "@tanstack/react-table";
import InputLabel from "./InputLabel";
import SelectInput from "./SelectInput";
import {
    ChevronDownIcon,
    ChevronUpDownIcon,
    ChevronUpIcon,
} from "@heroicons/react/16/solid";
import TextInput from "./TextInput";

export function Table({ table }) {
    if (table) {
        return (
            <div className="w-full overflow-auto py-6">
                <table className="w-full text-left border text-gray-500 dark:text-gray-200">
                    <thead className="dark:bg-gray-600 font-bold uppercase border text-nowrap">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className="p-4"
                                        >
                                            {header.isPlaceholder ? null : (
                                                <>
                                                    <div
                                                        {...{
                                                            className:
                                                                header.column.getCanSort()
                                                                    ? "flex gap-1 cursor-pointer select-none"
                                                                    : "",
                                                            onClick:
                                                                header.column.getToggleSortingHandler(),
                                                        }}
                                                    >
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}
                                                        {{
                                                            asc: (
                                                                <ChevronUpIcon className="w-6 -mt-0.5 text-gray-500 dark:text-gray-200" />
                                                            ),
                                                            desc: (
                                                                <ChevronDownIcon className="w-6 -mt-0.5 text-gray-500 dark:text-gray-200" />
                                                            ),
                                                        }[
                                                            header.column.getIsSorted()
                                                        ] ?? (
                                                            <ChevronUpDownIcon
                                                                className={
                                                                    !header.column.getCanSort()
                                                                        ? "hidden"
                                                                        : "w-6 -mt-0.5 text-gray-500 dark:text-gray-200"
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                    {header.column.getCanFilter() ? (
                                                        <div>
                                                            <TextInput
                                                                type="search"
                                                                className="py-1"
                                                                placeholder="search..."
                                                                value={header.column.getFilterValue()}
                                                                onChange={(e) =>
                                                                    header.column.setFilterValue(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    ) : null}
                                                </>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="dark:bg-gray-900 dark:hover:bg-gray-800 border"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-2">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav className="mt-4 flex justify-between gap-6">
                    <h3 className="text-gray-500 dark:text-gray-200 my-auto">
                        {"Total data : " +
                            table.getPrePaginationRowModel().rows.length +
                            " rows"}
                    </h3>
                    <div className="flex gap-1">
                        <InputLabel
                            htmlFor="show-pagination"
                            value="Show:"
                            className="my-auto"
                        />
                        <SelectInput
                            className="py-1 text-gray-500 dark:text-gray-200"
                            id="show-pagination"
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value));
                            }}
                        >
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </SelectInput>
                    </div>
                    <div className="flex gap-2">
                        <span className="flex my-auto gap-1 text-gray-500 dark:text-gray-200 text-sm">
                            <h3>Page:</h3>
                            <strong>
                                {table.getState().pagination.pageIndex +
                                    1 +
                                    " of " +
                                    table.getPageCount()}
                            </strong>
                        </span>
                        <span className="space-x-1">
                            <button
                                className={
                                    "border-2 border-gray-600 inline-block px-2 py-1 rounded text-gray-500 dark:text-gray-200 " +
                                    (!table.getCanPreviousPage()
                                        ? "!text-gray-500 cursor-not-allowed"
                                        : "hover:border-blue-600 hover:bg-gray-950 hover:text-gray-50")
                                }
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {"<<"}
                            </button>
                            <button
                                className={
                                    "border border-gray-600 inline-block px-2 py-1 rounded text-gray-500 dark:text-gray-200 " +
                                    (!table.getCanPreviousPage()
                                        ? "!text-gray-500 cursor-not-allowed"
                                        : "hover:border-blue-600 hover:bg-gray-950 hover:text-gray-50")
                                }
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {"<"}
                            </button>
                            <button
                                className={
                                    "border border-gray-600 inline-block px-2 py-1 rounded text-gray-500 dark:text-gray-200 " +
                                    (!table.getCanNextPage()
                                        ? "!text-gray-500 cursor-not-allowed"
                                        : "hover:border-blue-600 hover:bg-gray-950 hover:text-gray-50")
                                }
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                {">"}
                            </button>
                            <button
                                className={
                                    "border border-gray-600 inline-block px-2 py-1 rounded text-gray-500 dark:text-gray-200 " +
                                    (!table.getCanNextPage()
                                        ? "!text-gray-500 cursor-not-allowed"
                                        : "hover:border-blue-600 hover:bg-gray-950 hover:text-gray-50")
                                }
                                onClick={() =>
                                    table.setPageIndex(table.getPageCount() - 1)
                                }
                                disabled={!table.getCanNextPage()}
                            >
                                {">>"}
                            </button>
                        </span>
                    </div>
                </nav>
            </div>
        );
    } else {
        return null;
    }
}
