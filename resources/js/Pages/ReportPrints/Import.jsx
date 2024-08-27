import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function ReportPrintImport({ closeModal = () => {} }) {
    const { data, setData, post, errors, processing } = useForm({
        import_file: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("report-print.import"), {
            onSuccess: () => {
                closeModal();
                toast.success("Import report print on proccess.", {
                    position: "top-right",
                    duration: 3000,
                });
            },
        });
    };

    return (
        <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h3 className="dark:text-gray-100 text-lg mb-6">
                Import Report Print
            </h3>
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <TextInput
                        id="import_file"
                        type="file"
                        className="block text-sm w-full border-2 p-2 rounded-md border-dashed file:hidden cursor-pointer"
                        required
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                        onChange={(e) =>
                            setData("import_file", e.target.files[0])
                        }
                    />

                    <InputError className="mt-2" message={errors.import_file} />
                </div>

                <div className="flex gap-4">
                    <PrimaryButton disabled={processing}>Import</PrimaryButton>
                    <SecondaryButton disabled={processing} onClick={closeModal}>
                        Cancel
                    </SecondaryButton>
                </div>
            </form>
        </div>
    );
}
