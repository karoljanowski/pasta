'use client'

import { CheckoutFormState } from "@/lib/types";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { redirect } from "next/navigation";


const CheckoutFormNotification = ({ state }: { state: CheckoutFormState }) => {

    useEffect(() => {
        if (state.success && state.orderId) {
            toast.success('Your order has been placed')
            redirect(`/checkout/${state.orderId}`)
        }
    }, [state])

    return (
        <Toaster position="top-center" reverseOrder={false} />
    );
}

export default CheckoutFormNotification;