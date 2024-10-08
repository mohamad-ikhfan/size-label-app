import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function MaterialEdit({
    state,
    showModal,
    closeModal = () => {},
}) {
    const { data, setData, put, errors, processing } = useForm({
        code: state.code,
        name: state.name,
        description: state.description,
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("material.update", state.id), {
            onSuccess: () => {
                closeModal();
                toast.success("Material updated successfully.", {
                    position: "top-right",
                    duration: 3000,
                });
            },
        });
    };
    return (
        <Modal show={showModal} maxWidth="2xl">
            <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="mb-4 text-lg dark:text-gray-100">
                    Edit Material
                </h3>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="code" value="Code" />

                        <TextInput
                            id="code"
                            className="mt-1 block w-full"
                            required
                            defaultValue={data.code}
                            onChange={(e) => setData("code", e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.code} />
                    </div>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            required
                            defaultValue={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="description" value="Description" />

                        <TextInput
                            id="description"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />

                        <InputError
                            className="mt-2"
                            message={errors.description}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>
                            Update
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
