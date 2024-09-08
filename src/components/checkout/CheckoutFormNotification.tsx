'use client'

import { CheckoutFormState } from "@/lib/types";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useCartStore } from "@/lib/store";


const CheckoutFormNotification = ({ state }: { state: CheckoutFormState }) => {
    const { clearCart } = useCartStore()

    useEffect(() => {
        if (state.success && state.orderId) {
            clearCart()
            toast.success('Your order has been placed')
            redirect(`/checkout/${state.orderId}`)
        }
    }, [state])

    return (
        <Toaster position="top-center" reverseOrder={false} />
    );
}

export default CheckoutFormNotification;