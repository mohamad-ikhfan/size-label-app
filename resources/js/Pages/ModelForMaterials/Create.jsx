import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function ModelForMaterialCreate({ closeModal = () => {} }) {
    const { data, setData, post, errors, processing } = useForm({
        model_name: "",
        gender: "",
        category: "",
        material_type: "",
        material_size: "",
        wide: 0,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("model-for-material.store"), {
            onSuccess: () => {
                closeModal();
                toast.success("New model for material created successfully.", {
                    position: "top-right",
                    duration: 3000,
                });
            },
        });
    };
    return (
        <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h3 className="mb-4 text-lg dark:text-gray-100">
                New Model For Material
            </h3>
            <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="model_name" value="Model name" />

                        <TextInput
                            id="model_name"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.model_name}
                            onChange={(e) =>
                                setData("model_name", e.target.value)
                            }
                        />

                        <InputError
                            className="mt-2"
                            message={errors.model_name}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="gender" value="Gender" />

                        <SelectInput
                            id="gender"
                            className="mt-1 block w-full"
                            value={data.gender}
                            onChange={(e) => setData("gender", e.target.value)}
                        >
                            <option value="">Select gender</option>
                            <option value="Mens">Mens</option>
                            <option value="Womens">Womens</option>
                            <option value="Boys Grade School">
                                Boys Grade School
                            </option>
                            <option value="Grade School Unisex">
                                Grade School Unisex
                            </option>
                            <option value="Boys Pre School">
                                Boys Pre School
                            </option>
                            <option value="Pre School Unisex">
                                Pre School Unisex
                            </option>
                            <option value="Boys Toddler">Boys Toddler</option>
                            <option value="Toddler Unisex">
                                Toddler Unisex
                            </option>
                        </SelectInput>

                        <InputError className="mt-2" message={errors.gender} />
                    </div>
                    <div>
                        <InputLabel htmlFor="category" value="Category" />

                        <SelectInput
                            id="category"
                            className="mt-1 block w-full"
                            value={data.category}
                            onChange={(e) =>
                                setData("category", e.target.value)
                            }
                        >
                            <option value="">Select category</option>
                            <option value="M/W">M/W</option>
                            <option value="GS">GS</option>
                            <option value="PS">PS</option>
                            <option value="TD">TD</option>
                        </SelectInput>

                        <InputError
                            className="mt-2"
                            message={errors.category}
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="material_type"
                            value="Material type"
                        />

                        <SelectInput
                            id="material_type"
                            className="mt-1 block w-full"
                            value={data.material_type}
                            onChange={(e) =>
                                setData("material_type", e.target.value)
                            }
                        >
                            <option value="">Select material type</option>
                            <option value="Heatseal">Heatseal</option>
                            <option value="Poliyester">Poliyester</option>
                        </SelectInput>

                        <InputError
                            className="mt-2"
                            message={errors.material_type}
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="material_size"
                            value="Material size"
                        />

                        <SelectInput
                            id="material_size"
                            className="mt-1 block w-full"
                            value={data.material_size}
                            onChange={(e) =>
                                setData("material_size", e.target.value)
                            }
                        >
                            <option value="">Select material size</option>
                            <option value="BIG (35x33)">BIG (35x33)</option>
                            <option value="SMALL (30x33)">SMALL (30x33)</option>
                            <option value="BIG (35x33) & SMALL (30x33)">
                                BIG (35x33) & SMALL (30x33)
                            </option>
                            <option value="SMALL (30x21)">SMALL (30x21)</option>
                        </SelectInput>

                        <InputError
                            className="mt-2"
                            message={errors.material_size}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="wide" value="Wide" />

                        <SelectInput
                            id="wide"
                            className="mt-1 block w-full"
                            value={data.wide}
                            onChange={(e) => setData("wide", e.target.value)}
                        >
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </SelectInput>

                        <InputError className="mt-2" message={errors.wide} />
                    </div>
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
