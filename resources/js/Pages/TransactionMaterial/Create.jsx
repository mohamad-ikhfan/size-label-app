import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function TransactionMaterialCreate({
    user,
    materials,
    closeModal = () => {},
}) {
    const { data, setData, post, errors, processing } = useForm({
        date: "",
        type: "",
        material_id: "",
        qty: "",
        transaction_by: user.id,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("transaction-material.store"), {
            onSuccess: () => {
                closeModal();
                toast.success(
                    "New transaction material created successfully.",
                    {
                        position: "top-right",
                        duration: 3000,
                    }
                );
            },
        });
    };
    return (
        <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h3 className="mb-4 text-lg dark:text-gray-100">
                New Transaction Material
            </h3>
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="date" value="Date" />

                    <TextInput
                        id="date"
                        className="mt-1 block w-full"
                        value={data.date}
                        onChange={(e) => setData("date", e.target.value)}
                        type="date"
                        onKeyDown={(e) => e.preventDefault()}
                    />

                    <InputError className="mt-2" message={errors.date} />
                </div>
                <div>
                    <InputLabel htmlFor="type" value="Type" />

                    <SelectInput
                        id="type"
                        className="mt-1 block w-full"
                        value={data.type}
                        onChange={(e) => setData("type", e.target.value)}
                    >
                        <option value="">Select type</option>
                        <option value="taking">Taking</option>
                        <option value="comming">Comming</option>
                        <option value="stock_opname">Stock Opname</option>
                    </SelectInput>

                    <InputError className="mt-2" message={errors.type} />
                </div>
                <div>
                    <InputLabel htmlFor="material_id" value="Material" />

                    <SelectInput
                        id="material_id"
                        className="mt-1 block w-full"
                        value={data.material_id}
                        onChange={(e) => setData("material_id", e.target.value)}
                    >
                        <option value="">Select material</option>
                        {materials.map((material) => (
                            <option key={material.id} value={material.id}>
                                {material.name}
                            </option>
                        ))}
                    </SelectInput>

                    <InputError className="mt-2" message={errors.material_id} />
                </div>
                <div>
                    <InputLabel htmlFor="qty" value="Qty" />

                    <TextInput
                        id="qty"
                        type="number"
                        className="mt-1 block w-full"
                        value={data.qty}
                        onChange={(e) => setData("qty", e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.qty} />
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
