import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function ScheduletPrintCreate({ users, closeModal = () => {} }) {
    const { data, setData, post, errors, processing } = useForm({
        line: "",
        schedule: "",
        release: "",
        style_number: "",
        model_name: "",
        qty: "",
        status: "",
        status_updated_by: "",
        status_updated_at: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("schedule-print.store"), {
            onSuccess: () => {
                closeModal();
                toast.success("New report print created successfully.", {
                    position: "top-right",
                    duration: 3000,
                });
            },
        });
    };
    return (
        <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h3 className="mb-4 text-lg dark:text-gray-100">
                New Schedule Print
            </h3>
            <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="line" value="Line" />

                        <TextInput
                            id="line"
                            type="number"
                            className="mt-1 block w-full"
                            value={data.line}
                            onChange={(e) => setData("line", e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.line} />
                    </div>
                    <div>
                        <InputLabel htmlFor="schedule" value="Schedule print" />

                        <TextInput
                            id="schedule"
                            className="mt-1 block w-full"
                            value={data.schedule}
                            onChange={(e) =>
                                setData("schedule", e.target.value)
                            }
                            type="date"
                            onKeyDown={(e) => e.preventDefault()}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.schedule}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="release" value="Release" />

                        <TextInput
                            id="release"
                            className="mt-1 block w-full"
                            value={data.release}
                            onChange={(e) => setData("release", e.target.value)}
                            type="date"
                            onKeyDown={(e) => e.preventDefault()}
                        />

                        <InputError className="mt-2" message={errors.release} />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="style_number"
                            value="Style Number"
                        />

                        <TextInput
                            id="style_number"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.style_number}
                            onChange={(e) =>
                                setData("style_number", e.target.value)
                            }
                        />

                        <InputError
                            className="mt-2"
                            message={errors.style_number}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="model_name" value="Model name" />

                        <TextInput
                            id="model_name"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.model_name}
                            onChange={(e) =>
                                setData("model_name", e.target.value)
                            }
                        />

                        <InputError
                            className="mt-2"
                            message={errors.model_name}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="qty" value="Qty" />

                        <TextInput
                            id="qty"
                            type="number"
                            className="mt-1 block w-full"
                            value={data.qty}
                            onChange={(e) => setData("qty", e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.qty} />
                    </div>
                    <div className={!data.status ? "col-span-2" : ""}>
                        <InputLabel htmlFor="status" value="Status" />

                        <SelectInput
                            id="status"
                            className="mt-1 block w-full"
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                        >
                            <option value="">Select status</option>
                            <option value="printing">Printing</option>
                            <option value="printed">Printed</option>
                        </SelectInput>

                        <InputError className="mt-2" message={errors.status} />
                    </div>
                    {data.status && (
                        <>
                            <div>
                                <InputLabel
                                    htmlFor="status_updated_at"
                                    value="Status updated at"
                                />

                                <TextInput
                                    id="status_updated_at"
                                    className="mt-1 block w-full"
                                    value={data.status_updated_at}
                                    onChange={(e) =>
                                        setData(
                                            "status_updated_at",
                                            e.target.value
                                        )
                                    }
                                    type="date"
                                    onKeyDown={(e) => e.preventDefault()}
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.status_updated_at}
                                />
                            </div>
                            <div className="col-span-2">
                                <InputLabel
                                    htmlFor="status_updated_by"
                                    value="Status updated by"
                                />

                                <SelectInput
                                    id="status_updated_by"
                                    className="mt-1 block w-full"
                                    value={data.status_updated_by}
                                    onChange={(e) =>
                                        setData(
                                            "status_updated_by",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select user</option>
                                    {users.map((user) => {
                                        return (
                                            <option
                                                key={user.id}
                                                user={user.id}
                                            >
                                                {user.name}
                                            </option>
                                        );
                                    })}
                                </SelectInput>

                                <InputError
                                    className="mt-2"
                                    message={errors.status_updated_by}
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <SecondaryButton disabled={processing} onClick={closeModal}>
                        Cancel
                    </SecondaryButton>
                </div>
            </form>
        </div>
    );
}
