import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
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

    const [processUpload, setProcessUpload] = useState(false);

    const handleUploadFile = async (e, setValue) => {
        e.preventDefault();
        setProcessUpload(true);

        if (e.target.files) {
            const file = e.target.files[0];
            setData(setValue, file);
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
        setProcessUpload(false);
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
                        onChange={(e) => handleUploadFile(e, "import_file_f2")}
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
                        required
                        className="block text-sm w-full border-2 p-2 rounded-md border-dashed file:hidden cursor-pointer"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                        onChange={(e) => handleUploadFile(e, "import_file_f4")}
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
                        onChange={(e) => handleUploadFile(e, "import_file_f6")}
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
                        onChange={(e) => handleUploadFile(e, "import_file_f7")}
                    />

                    <InputError
                        className="mt-2"
                        message={errors.import_file_f7}
                    />
                </div>

                <div className="flex gap-4">
                    <PrimaryButton disabled={processing || processUpload}>
                        Import
                    </PrimaryButton>
                    <SecondaryButton
                        disabled={processing || processUpload}
                        onClick={closeModal}
                    >
                        Cancel
                    </SecondaryButton>
                </div>
            </form>
        </div>
    );
}
