'use client'
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { setDeliveryTime } from "@/lib/actions";
import { useEffect } from "react";
import toast from "react-hot-toast";
import FormButton from "@/components/FormButton";

const DeliveryTimeForm = ({ initialTime }: { initialTime: number | undefined }) => {
    const [state, action] = useFormState(setDeliveryTime, { success: false })

    useEffect(() => {
        if (state.success) {
            toast.success("Delivery time updated")
        } else if (!state.success && state.error) {
            toast.error("Error updating delivery time")
        }

    }, [state])

    return (
        <form action={action} className="my-2 flex">
            <div className="flex-1 flex flex-col">
                <Input defaultValue={initialTime} type="number" name="time" placeholder="120 minutes" />
                {state.error?.time && <span className="text-red-500 ml-1 text-sm">{state.error.time[0]}</span>}
            </div>
            <FormButton text="Save" />
        </form>
    );
}

export default DeliveryTimeForm;