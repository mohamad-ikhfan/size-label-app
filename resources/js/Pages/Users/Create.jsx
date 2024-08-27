import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function UserCreate({ closeModal = () => {} }) {
    const { data, setData, post, errors, processing } = useForm({
        full_name: "",
        name: "",
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("user.store"), {
            onSuccess: () => {
                closeModal();
                toast.success("New user created successfully.", {
                    position: "top-right",
                    duration: 3000,
                });
            },
        });
    };
    return (
        <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h3 className="mb-4 text-lg dark:text-gray-100">New User</h3>
            <form onSubmit={submit} className="grid grid-cols-2 gap-4">
                <div>
                    <InputLabel htmlFor="full_name" value="Full Name" />

                    <TextInput
                        id="full_name"
                        className="mt-1 block w-full"
                        required
                        defaultValue={data.full_name}
                        onChange={(e) => setData("full_name", e.target.value)}
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.full_name} />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        required
                        defaultValue={data.name}
                        onChange={(e) => setData("name", e.target.value)}
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

                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        required
                        defaultValue={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.password} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <SecondaryButton disabled={processing} onClick={closeModal}>
                        Cancel
                    </SecondaryButton>
                </div>
            </form>
        </div>
    );
}
