import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ReportPrintImport({
    showModal,
    closeModal = () => {},
}) {
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

    const [processUpload, setProcessUpload] = useState(false);

    const handleUploadFile = async (e) => {
        e.preventDefault();
        setProcessUpload(true);

        if (e.target.files) {
            const file = e.target.files[0];
            setData("import_file", file);
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
        setProcessUpload(false);
    };

    return (
        <Modal show={showModal} maxWidth="sm">
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
                            onChange={(e) => handleUploadFile(e)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.import_file}
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
        </Modal>
    );
}
