'use client';
import { ShoppingCart, X } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import CartItems from "./CartItems";
import Link from "next/link";

const CartModal = () => {
    const { totalQuantity } = useCartStore();
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        useCartStore.getState().initializeCart();
    }, []);

    return (
        <>
            <div onClick={() => setShowCart(true)} className="fixed bottom-4 left-4 rounded-full bg-red-950 w-12 h-12 cursor-pointer">
                <div className="w-full h-full relative p-2 grid place-content-center">
                    <ShoppingCart className="text-white w-5 h-5" />
                    <div className="absolute -top-3 -right-3 leading-[1] bg-red-900 text-white rounded-full w-7 h-7 grid place-content-center text-xl">
                        {totalQuantity}
                    </div>
                </div>
            </div>
            {showCart &&
                <div onClick={() => setShowCart(false)} className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center items-start z-[9999]">
                    <div onClick={(e) => e.stopPropagation()} className="w-full mx-4 mt-10 max-w-[800px] bg-yellow-50 p-4 rounded-lg flex flex-col shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-3xl uppercase font-bold">Cart Items</p>
                            <X className="text-red-900 cursor-pointer w-6 h-6" onClick={() => setShowCart(false)} />
                        </div>
                        <CartItems mode='White' />
                        {totalQuantity > 0 &&
                            <Link href={'/checkout'} className="hover:bg-red-900 text-center transition-all bg-red-700 text-white px-10 w-full py-2 text-xl border-black border rounded-lg shadow-md shadow-gray-800">
                                Checkout
                            </Link>
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default CartModal;
