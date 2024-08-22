import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function SchedulePrintGenerate({
    remarks,
    closeModal = () => {},
}) {
    const { data, setData, post, errors, processing } = useForm({
        from_release: "",
        except_remarks: [],
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data.except_remarks);

        post(route("schedule-print.generate"), {
            onSuccess: () => {
                closeModal();
                toast.success("Report print generated successfully.", {
                    position: "top-right",
                    duration: 3000,
                });
            },
        });
    };

    return (
        <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h3 className="mb-4 text-lg dark:text-gray-100">
                Generate Schedule Print
            </h3>
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="from_release" value="From release" />

                    <TextInput
                        id="from_release"
                        className="mt-1 block w-full"
                        value={data.from_release}
                        onChange={(e) =>
                            setData("from_release", e.target.value)
                        }
                        type="date"
                        onKeyDown={(e) => e.preventDefault()}
                    />

                    <InputError
                        className="mt-2"
                        message={errors.from_release}
                    />
                </div>
                <div>
                    <InputLabel
                        htmlFor="except_remarks"
                        value="Except Remarks"
                    />

                    <SelectInput
                        id="except_remarks"
                        className="mt-1 block w-full"
                        value={data.except_remarks}
                        onChange={(e) =>
                            data.except_remarks.push(e.target.value)
                        }
                    >
                        <option value="">Select remark</option>
                        {Object.entries(remarks).map((value) => (
                            <option key={value[0]} value={value[0]}>
                                {value[1]}
                            </option>
                        ))}
                    </SelectInput>

                    <InputError
                        className="mt-2"
                        message={errors.except_remarks}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        Generate
                    </PrimaryButton>
                    <SecondaryButton disabled={processing} onClick={closeModal}>
                        Cancel
                    </SecondaryButton>
                </div>
            </form>
        </div>
    );
}
