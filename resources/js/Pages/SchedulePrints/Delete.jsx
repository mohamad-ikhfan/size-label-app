import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function SchedulePrintDelete({
    state,
    showModal,
    closeModal = () => {},
}) {
    const [processing, setProcessing] = useState(false);
    const submit = (e) => {
        setProcessing(true);
        e.preventDefault();
        router.delete(route("schedule-print.destroy", state.id), {
            onSuccess: () => {
                setProcessing(false);
                closeModal();
                toast.success("Schedule print deleted successfully.", {
                    position: "top-right",
                    duration: 3000,
                });
            },
        });
    };
    return (
        <Modal show={showModal} maxWidth="sm">
            <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="dark:text-gray-100 text-lg text-center mb-6">
                    Are you sure to delete this data?
                </h3>
                <form onSubmit={submit} className="space-y-6">
                    <div className="flex justify-center gap-4">
                        <PrimaryButton disabled={processing}>
                            Yes, delete!
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
