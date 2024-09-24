'use client'
import { useFormState } from "react-dom";
import { handleNewOrder } from "@/lib/actions";
import { CartItem, CheckoutFormState } from "@/lib/types";
import CheckoutFormButton from "./CheckoutFormButton";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem } from "../ui/select";
import { SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { useCartStore } from "@/lib/store";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const CheckoutForm = ({ items, totalPrice }: { items: CartItem[], totalPrice: number }) => {
    const initialState: CheckoutFormState = { errors: {}, success: false }
    const [state, action] = useFormState(handleNewOrder, initialState)

    const { clearCart } = useCartStore()

    useEffect(() => {
        if (state.success && state.orderId) {
            clearCart()
            toast.success('Your order has been placed')
            redirect(`/checkout/${state.orderId}`)
        } else if (!state.success && state.errors) {
            toast.error('Check order form')
        }
    }, [state])

    return (
        <div>
            <form action={action} className="flex flex-col gap-6 mt-6">
                <input type="hidden" name="cartItems" value={JSON.stringify(items)} />
                <input type="hidden" name="totalPrice" value={JSON.stringify(totalPrice)} />
                <div className="flex flex-col">
                    <label htmlFor="customerFullName" className="text-xl uppercase">
                        Full Name
                    </label>
                    <Input
                        type="text"
                        id="customerFullName"
                        name="customerFullName"
                        placeholder="Enter your full name"
                        variant="checkout"
                    />
                    <span className="text-white px-3 w-max rounded-md bg-red-700 mt-2">{state.errors?.customerFullName && state.errors.customerFullName[0]}</span>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="customerCity" className="text-xl uppercase">
                        City
                    </label>
                    <Input
                        variant="checkout"
                        type="text"
                        id="customerCity"
                        name="customerCity"
                        placeholder="Enter your city"
                    />
                    <span className="text-white px-3 w-max rounded-md bg-red-700 mt-2">{state.errors?.customerCity && state.errors.customerCity[0]}</span>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="customerStreet" className="text-xl uppercase">
                        Street
                    </label>
                    <Input
                        variant="checkout"
                        type="text"
                        id="customerStreet"
                        name="customerStreet"
                        placeholder="Enter your street"
                    />
                    <span className="text-white px-3 w-max rounded-md bg-red-700 mt-2">{state.errors?.customerStreet && state.errors.customerStreet[0]}</span>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="paymentType" className="text-xl uppercase">
                        Payment Type
                    </label>
                    <Select>
                        <SelectTrigger className="text-left border-b border-b-red-700 px-3 py-1 outline-none">
                            <SelectValue placeholder="Select payment type" />
                        </SelectTrigger>
                        <SelectContent className="">
                            <SelectItem value="Card">Card</SelectItem>
                            <SelectItem value="Cash">Cash</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-white px-3 w-max rounded-md bg-red-700 mt-2">{state.errors?.paymentType && state.errors.paymentType[0]}</span>
                </div>

                <CheckoutFormButton />
            </form>
        </div>
    );
}

export default CheckoutForm;

