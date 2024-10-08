import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function UserEdit({ state, showModal, closeModal = () => {} }) {
    const { data, setData, put, errors, processing } = useForm({
        full_name: state.full_name,
        name: state.name,
        email: state.email,
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("user.update", state.id), {
            onSuccess: () => {
                closeModal();
                toast.success("User updated successfully.", {
                    position: "top-right",
                    duration: 3000,
                });
            },
        });
    };
    return (
        <Modal show={showModal} maxWidth="2xl">
            <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="mb-4 text-lg dark:text-gray-100">Edit User</h3>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="full_name" value="Full Name" />

                        <TextInput
                            id="full_name"
                            className="mt-1 block w-full"
                            required
                            defaultValue={data.full_name}
                            onChange={(e) =>
                                setData("full_name", e.target.value)
                            }
                            isFocused
                        />

                        <InputError
                            className="mt-2"
                            message={errors.full_name}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            required
                            defaultValue={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            isFocused
                            autoComplete="name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            defaultValue={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.email} />
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
