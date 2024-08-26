import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function ReportPrintEdit({
    user,
    reportPrint,
    closeModal = () => {},
}) {
    const { data, setData, put, errors, processing } = useForm({
        printed_at: reportPrint.printed_at,
        line: reportPrint.line,
        release: reportPrint.release,
        po_number: reportPrint.po_number,
        style_number: reportPrint.style_number,
        model_name: reportPrint.model_name,
        qty: reportPrint.qty,
        special: reportPrint.special,
        remark: reportPrint.remark,
        printed_by: user.id,
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("report-print.update", reportPrint.id), {
            onSuccess: () => {
                closeModal();
                toast.success("Report print updated successfully.", {
                    position: "top-right",
                    duration: 3000,
                });
            },
        });
    };
    return (
        <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h3 className="mb-4 text-lg dark:text-gray-100">Edit PO Item</h3>
            <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="printed_at" value="Print date" />

                        <TextInput
                            id="printed_at"
                            className="mt-1 block w-full"
                            defaultValue={data.printed_at}
                            onChange={(e) =>
                                setData("printed_at", e.target.value)
                            }
                            type="date"
                            onKeyDown={(e) => e.preventDefault()}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.printed_at}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="line" value="Line" />

                        <TextInput
                            id="line"
                            type="number"
                            className="mt-1 block w-full"
                            defaultValue={data.line}
                            onChange={(e) => setData("line", e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.line} />
                    </div>
                    <div>
                        <InputLabel htmlFor="release" value="Release" />

                        <TextInput
                            id="release"
                            className="mt-1 block w-full"
                            defaultValue={data.release}
                            onChange={(e) => setData("release", e.target.value)}
                            type="date"
                            onKeyDown={(e) => e.preventDefault()}
                        />

                        <InputError className="mt-2" message={errors.release} />
                    </div>
                    <div>
                        <InputLabel htmlFor="po_number" value="PO Number" />

                        <TextInput
                            id="po_number"
                            type="number"
                            className="mt-1 block w-full"
                            defaultValue={data.po_number}
                            onChange={(e) =>
                                setData("po_number", e.target.value)
                            }
                        />

                        <InputError
                            className="mt-2"
                            message={errors.po_number}
                        />
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
                            defaultValue={data.style_number}
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
                            defaultValue={data.model_name}
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
                            defaultValue={data.qty}
                            onChange={(e) => setData("qty", e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.qty} />
                    </div>
                    <div>
                        <InputLabel htmlFor="special" value="Special" />

                        <TextInput
                            id="special"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={data.special}
                            onChange={(e) => setData("special", e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.special} />
                    </div>
                </div>
                <div>
                    <InputLabel htmlFor="remark" value="Remark" />

                    <TextInput
                        id="remark"
                        type="text"
                        className="mt-1 block w-full"
                        defaultValue={data.remark}
                        onChange={(e) => setData("remark", e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.remark} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Update</PrimaryButton>
                    <SecondaryButton disabled={processing} onClick={closeModal}>
                        Cancel
                    </SecondaryButton>
                </div>
            </form>
        </div>
    );
}
