import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function UserShow({ state, showModal, closeModal = () => {} }) {
    const { data } = useForm({
        full_name: state.full_name,
        name: state.name,
        email: state.email,
    });
    return (
        <Modal show={showModal} maxWidth="2xl">
            <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="mb-4 text-lg dark:text-gray-100">Show User</h3>
                <form className="space-y-6">
                    <div>
                        <InputLabel htmlFor="full_name" value="Full Name" />

                        <TextInput
                            id="full_name"
                            className="mt-1 block w-full"
                            defaultValue={data.full_name}
                            onChange={(e) =>
                                setData("full_name", e.target.value)
                            }
                            readonly
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            defaultValue={data.name}
                            readonly
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            defaultValue={data.email}
                            readonly
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <SecondaryButton onClick={closeModal}>
                            Close
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
