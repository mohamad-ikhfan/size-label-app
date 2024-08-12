import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function UserShow({ user, closeModal = () => {} }) {
    const { data } = useForm({
        name: user.name,
        email: user.email,
    });
    return (
        <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h3 className="mb-4 text-lg">Show User</h3>
            <form className="space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        readonly
                    />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
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
    );
}
