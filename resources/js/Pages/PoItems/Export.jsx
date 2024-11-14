import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function PoItemExport({ showModal, closeModal = () => {} }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route("po-item.export"), {
            onSuccess: async () => {
                await axios({
                    url: route("po-item.download"),
                    method: "GET",
                    responseType: "blob", // important
                })
                    .then((response) => {
                        const url = window.URL.createObjectURL(
                            new Blob([response.data])
                        );
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download", "export_po_items.xlsx"); //or any other extension
                        document.body.appendChild(link);
                        link.click();
                    })
                    .finally(() => {
                        closeModal();
                        toast.success("Export PO Items successfully.", {
                            position: "top-right",
                            duration: 3000,
                        });
                    });
            },
        });
    };

    return (
        <Modal show={showModal} maxWidth="sm">
            <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="dark:text-gray-100 text-lg text-center mb-6">
                    Are you sure to export PO Items?
                </h3>
                <form onSubmit={submit} className="space-y-6">
                    <div className="flex justify-center gap-4">
                        <PrimaryButton disabled={processing}>
                            Yes, export!
                        </PrimaryButton>
                        <SecondaryButton
                            disabled={processing}
                            onClick={closeModal}
                        >
                            No, Cancel!
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
