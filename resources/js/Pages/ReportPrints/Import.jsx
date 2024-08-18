import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ReportPrintImport({ closeModal = () => {} }) {
    return (
        <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h3 className="dark:text-gray-100 text-lg mb-6">
                Import Report Print
            </h3>
            <form className="space-y-6">
                <div>
                    <TextInput
                        id="line"
                        type="file"
                        className="block w-full border-2 p-2 rounded-md border-dashed file:hidden cursor-pointer"
                    />

                    {/* <InputError className="mt-2" message={errors.line} /> */}
                </div>

                <div className="flex gap-4">
                    <PrimaryButton>Import</PrimaryButton>
                    <SecondaryButton onClick={closeModal}>
                        Cancel
                    </SecondaryButton>
                </div>
            </form>
        </div>
    );
}
