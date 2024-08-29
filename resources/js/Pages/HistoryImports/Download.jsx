import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function HistoryImportDownload({
    historyImport,
    closeModal = () => {},
}) {
    const [processing, setProcessing] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        await axios({
            url: route("history-import.download", historyImport.id),
            method: "GET",
            responseType: "blob", // important
        })
            .then((response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute(
                    "download",
                    historyImport.name + "." + historyImport.extension
                );
                document.body.appendChild(link);
                link.click();
            })
            .finally(() => {
                setProcessing(false);
                closeModal();
                toast.success("History import downloaded successfully.", {
                    position: "top-right",
                    duration: 3000,
                });
            });
    };

    return (
        <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h3 className="dark:text-gray-100 text-lg text-center mb-6">
                Are you sure to download this file?
            </h3>
            <form onSubmit={submit} className="space-y-6">
                <div className="flex justify-center gap-4">
                    <PrimaryButton disabled={processing}>
                        Download!
                    </PrimaryButton>
                    <SecondaryButton disabled={processing} onClick={closeModal}>
                        Cancel!
                    </SecondaryButton>
                </div>
            </form>
        </div>
    );
}
