import { useFormState } from "react-dom";
import { handleNewOrder } from "@/lib/actions";

import { CartItem, CheckoutFormState } from "@/lib/types";
import CheckoutFormButton from "./CheckoutFormButton";
import CheckoutFormNotification from "./CheckoutFormNotification";

const CheckoutForm = ({ items, totalPrice }: { items: CartItem[], totalPrice: number }) => {
    const initialState: CheckoutFormState = { errors: {}, success: false }
    const [state, action] = useFormState(handleNewOrder, initialState)

    return (
        <div>
            <CheckoutFormNotification state={state} />
            <form action={action} className="flex flex-col gap-6 mt-6">
                <input type="hidden" name="cartItems" value={JSON.stringify(items)} />
                <input type="hidden" name="totalPrice" value={JSON.stringify(totalPrice)} />
                <div className="flex flex-col">
                    <label htmlFor="customerFullName" className="text-xl uppercase">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="customerFullName"
                        name="customerFullName"
                        placeholder="Enter your full name"
                        className="bg-transparent border-b border-white outline-none py-2 text-lg focus:border-red-400 transition-all placeholder:text-gray-300"
                    />
                    <span className="text-black px-3 w-max rounded-md bg-yellow-300 mt-2">{state.errors?.customerFullName && state.errors.customerFullName[0]}</span>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="customerCity" className="text-xl uppercase">
                        City
                    </label>
                    <input
                        type="text"
                        id="customerCity"
                        name="customerCity"
                        placeholder="Enter your city"
                        className="bg-transparent border-b border-white outline-none py-2 text-lg focus:border-red-400 transition-all placeholder:text-gray-300"
                    />
                    <span className="text-black px-3 w-max rounded-md bg-yellow-300 mt-2">{state.errors?.customerCity && state.errors.customerCity[0]}</span>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="customerStreet" className="text-xl uppercase">
                        Street
                    </label>
                    <input
                        type="text"
                        id="customerStreet"
                        name="customerStreet"
                        placeholder="Enter your street"
                        className="bg-transparent border-b border-white outline-none py-2 text-lg focus:border-red-400 transition-all placeholder:text-gray-300"
                    />
                    <span className="text-black px-3 w-max rounded-md bg-yellow-300 mt-2">{state.errors?.customerStreet && state.errors.customerStreet[0]}</span>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="paymentType" className="text-xl uppercase">
                        Payment Type
                    </label>
                    <select
                        id="paymentType"
                        name="paymentType"
                        className="bg-transparent border-b border-white outline-none py-2 text-lg focus:border-red-400 transition-all placeholder:text-gray-300"
                    >
                        <option value="Card">Credit Card</option>
                        <option value="Cash">Cash</option>
                    </select>
                    <span className="text-black px-3 w-max rounded-md bg-yellow-300 mt-2">{state.errors?.paymentType && state.errors.paymentType[0]}</span>
                </div>

                <CheckoutFormButton />
            </form>
        </div>
    );
}

export default CheckoutForm;

