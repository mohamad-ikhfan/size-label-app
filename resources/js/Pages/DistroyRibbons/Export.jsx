import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function DestroyRibbonExport({
    showModal,
    closeModal = () => {},
}) {
    const { data, setData, post, errors, processing } = useForm({
        from_date: "",
        to_date: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("destroy-ribbon.export"), {
            onSuccess: async () => {
                await axios({
                    url: route("destroy-ribbon.download"),
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
                            "export_destroy_ribbon.xlsx"
                        ); //or any other extension
                        document.body.appendChild(link);
                        link.click();
                    })
                    .finally(() => {
                        closeModal();
                        toast.success(
                            "Export destroy ribbon created successfully.",
                            {
                                position: "top-right",
                                duration: 3000,
                            }
                        );
                    });
            },
        });
    };
    return (
        <Modal show={showModal} maxWidth="sm">
            <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="mb-4 text-lg dark:text-gray-100">
                    Export Destroy Ribbon
                </h3>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="from_date" value="From date" />

                        <TextInput
                            id="from_date"
                            className="mt-1 block w-full"
                            required
                            defaultValue={data.from_date}
                            onChange={(e) =>
                                setData("from_date", e.target.value)
                            }
                            type="date"
                            onKeyDown={(e) => e.preventDefault()}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.from_date}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="to_date" value="To date" />

                        <TextInput
                            id="to_date"
                            className="mt-1 block w-full"
                            required
                            defaultValue={data.to_date}
                            onChange={(e) => setData("to_date", e.target.value)}
                            type="date"
                            onKeyDown={(e) => e.preventDefault()}
                        />

                        <InputError className="mt-2" message={errors.to_date} />
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>
                            Export
                        </PrimaryButton>
                        <SecondaryButton
                            disabled={processing}
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
