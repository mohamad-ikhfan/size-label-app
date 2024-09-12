import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function SchedulePrinting({
    user,
    state,
    showModal,
    closeModal = () => {},
}) {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    var dateValue = currentDate.toISOString().substring(0, 10);

    const { data, setData, put, errors, processing } = useForm({
        status: "printing",
        status_updated_by: user.id,
        status_updated_at: dateValue,
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("schedule-print.printing", state.id), {
            onSuccess: () => {
                closeModal();
                toast.success("Report print printing successfully.", {
                    position: "top-right",
                    duration: 3000,
                });
            },
            onError: (error) => console.log(error),
        });
    };
    return (
        <Modal show={showModal} maxWidth="sm">
            <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="dark:text-gray-100 text-lg text-center mb-6">
                    Are you sure to printing?
                </h3>
                <form onSubmit={submit} className="space-y-6">
                    <div className="flex justify-center gap-4">
                        <PrimaryButton disabled={processing}>
                            Yes, print!
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
