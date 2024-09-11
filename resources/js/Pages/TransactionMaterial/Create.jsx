import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function TransactionMaterialCreate({
    user,
    materials,
    showModal,
    closeModal = () => {},
}) {
    const { data, setData, post, errors, processing } = useForm({
        date: "",
        type: "",
        materials: [],
        transaction_by: user.id,
    });

    const [materialSelects, setMaterialSelect] = useState([
        { material_id: "", qty: "" },
    ]);

    const handleMaterialChange = (value, index) => {
        const newInputMaterial = [...materialSelects];
        newInputMaterial[index].material_id = value;
        setMaterialSelect(newInputMaterial);
        setData("materials", newInputMaterial);
    };

    const handleQtyChange = (value, index) => {
        const newInputMaterial = [...materialSelects];
        newInputMaterial[index].qty = value;
        setMaterialSelect(newInputMaterial);
        setData("materials", newInputMaterial);
    };

    const handleAddInput = () => {
        const newInputMaterial = [...materialSelects];
        newInputMaterial.push({
            material_id: "",
            qty: "",
        });
        setMaterialSelect(newInputMaterial);
        setData("materials", newInputMaterial);
    };

    const handleRemoveInput = (index) => {
        const newInputMaterial = [...materialSelects];
        if (newInputMaterial.length > 1) {
            newInputMaterial.splice(index, 1);
            setMaterialSelect(newInputMaterial);
            setData("materials", newInputMaterial);
            console.log(index);
            console.log(newInputMaterial);
        }
    };

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
        <Modal show={showModal} maxWidth="2xl">
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
                            required
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
                            required
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
                        <h6 className="text-sm">Materials</h6>
                        {materialSelects.map(({ material_id, qty }, index) => (
                            <div className="px-2" key={index}>
                                <div className="flex justify-end">
                                    <span
                                        className="p-2 text-red-600 text-sm cursor-pointer font-bold"
                                        title="remove"
                                        onClick={() => handleRemoveInput(index)}
                                    >
                                        X
                                    </span>
                                </div>

                                <div className="w-full flex gap-4">
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor={"material_id_" + index}
                                            value="Material"
                                        />

                                        <SelectInput
                                            id={"material_id_" + index}
                                            className="mt-1 block w-full"
                                            value={material_id}
                                            required
                                            onChange={(e) =>
                                                handleMaterialChange(
                                                    e.target.value,
                                                    index
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select material
                                            </option>
                                            {materials.map((material) => (
                                                <option
                                                    key={material.id}
                                                    value={material.id}
                                                >
                                                    {material.name}
                                                </option>
                                            ))}
                                        </SelectInput>

                                        <InputError
                                            className="mt-2"
                                            message={errors.materials}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor={"qty_" + index}
                                            value="Qty"
                                        />

                                        <TextInput
                                            id={"qty_" + index}
                                            type="number"
                                            className="mt-1 block w-full"
                                            required
                                            min="1"
                                            value={qty}
                                            onChange={(e) =>
                                                handleQtyChange(
                                                    e.target.value,
                                                    index
                                                )
                                            }
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.materials}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center mt-3">
                            <span
                                className="py-1 px-2 rounded-md bg-green-700 text-gray-50 text-sm cursor-pointer"
                                onClick={() => handleAddInput()}
                            >
                                Add Material
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>
                            Save
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
