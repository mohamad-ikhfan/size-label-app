import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function DestroyRibbonEdit({
    destroyRibbon,
    closeModal = () => {},
}) {
    const { data, setData, put, errors, processing } = useForm({
        destroyed_at: destroyRibbon.destroyed_at,
        qty: destroyRibbon.qty,
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("destroy-ribbon.update", destroyRibbon.id), {
            onSuccess: () => {
                closeModal();
                toast.success("Destroy ribbon updated successfully.", {
                    position: "top-right",
                    duration: 3000,
                });
            },
        });
    };
    return (
        <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h3 className="mb-4 text-lg dark:text-gray-100">
                Edit Destroy Ribbon
            </h3>
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="destroyed_at" value="Destroyed date" />

                    <TextInput
                        id="destroyed_at"
                        className="mt-1 block w-full"
                        defaultValue={data.destroyed_at}
                        onChange={(e) =>
                            setData("destroyed_at", e.target.value)
                        }
                        isFocused
                        type="date"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.destroyed_at}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="qty" value="QTY" />

                    <TextInput
                        id="qty"
                        type="number"
                        className="mt-1 block w-full"
                        defaultValue={data.qty}
                        onChange={(e) => setData("qty", e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.qty} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Update</PrimaryButton>
                    <SecondaryButton disabled={processing} onClick={closeModal}>
                        Cancel
                    </SecondaryButton>
                </div>
            </form>
        </div>
    );
}
