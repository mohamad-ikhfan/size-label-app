import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function PoItemImport({ closeModal = () => {} }) {
    const { data, setData, post, errors, processing } = useForm({
        import_file_f2: "",
        import_file_f4: "",
        import_file_f6: "",
        import_file_f7: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("po-item.import"), {
            onSuccess: () => {
                closeModal();
                toast.success("Import po item on proccess.", {
                    position: "top-right",
                    duration: 3000,
                });
            },
        });
    };

    return (
        <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h3 className="dark:text-gray-100 text-lg mb-6">Import PO Item</h3>
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="import_file_f2" value="Factory 2" />
                    <TextInput
                        id="import_file_f2"
                        type="file"
                        className="block text-sm w-full border-2 p-2 rounded-md border-dashed file:hidden cursor-pointer"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                        onChange={(e) =>
                            setData("import_file_f2", e.target.files[0])
                        }
                    />

                    <InputError
                        className="mt-2"
                        message={errors.import_file_f2}
                    />
                </div>
                <div>
                    <InputLabel htmlFor="import_file_f4" value="Factory 4" />
                    <TextInput
                        id="import_file_f4"
                        type="file"
                        className="block text-sm w-full border-2 p-2 rounded-md border-dashed file:hidden cursor-pointer"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                        onChange={(e) =>
                            setData("import_file_f4", e.target.files[0])
                        }
                    />

                    <InputError
                        className="mt-2"
                        message={errors.import_file_f4}
                    />
                </div>
                <div>
                    <InputLabel htmlFor="import_file_f6" value="Factory 6" />
                    <TextInput
                        id="import_file_f6"
                        type="file"
                        className="block text-sm w-full border-2 p-2 rounded-md border-dashed file:hidden cursor-pointer"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                        onChange={(e) =>
                            setData("import_file_f6", e.target.files[0])
                        }
                    />

                    <InputError
                        className="mt-2"
                        message={errors.import_file_f6}
                    />
                </div>
                <div>
                    <InputLabel htmlFor="import_file_f7" value="Factory 7" />
                    <TextInput
                        id="import_file_f7"
                        type="file"
                        className="block text-sm w-full border-2 p-2 rounded-md border-dashed file:hidden cursor-pointer"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                        onChange={(e) =>
                            setData("import_file_f7", e.target.files[0])
                        }
                    />

                    <InputError
                        className="mt-2"
                        message={errors.import_file_f7}
                    />
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
