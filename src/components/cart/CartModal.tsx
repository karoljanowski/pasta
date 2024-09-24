'use client';
import { ShoppingCart, X } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import CartItems from "./CartItems";
import Link from "next/link";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../ui/hover-card";
import { Button } from "../ui/button";

const CartModal = () => {
    const { totalQuantity, cartOpen, toggleCart } = useCartStore();

    useEffect(() => {
        useCartStore.getState().initializeCart();
    }, []);

    return (
        <>
            <HoverCard openDelay={0} closeDelay={500} open={cartOpen} onOpenChange={(state) => toggleCart(state)}>
                <HoverCardTrigger onClick={() => toggleCart(true)} className="fixed bottom-4 left-4 rounded-full bg-red-950 w-12 h-12 cursor-pointer">
                    <div className="w-full h-full relative p-2 grid place-content-center">
                        <ShoppingCart className="text-white w-5 h-5" />
                        <div className="absolute -top-3 -right-3 leading-[1] bg-red-900 text-white rounded-full w-7 h-7 grid place-content-center text-xl">
                            {totalQuantity}
                        </div>
                    </div>
                </HoverCardTrigger>
                <HoverCardContent onMouseEnter={() => toggleCart(true)} sideOffset={16} className="w-full ml-5 shadow-md shadow-gray-800">
                    <p className="text-xl uppercase font-bold">Cart Items</p>
                    <CartItems />
                    {totalQuantity > 0 &&
                        <Link href="/checkout">
                            <Button variant="custom1" className="w-full" >Checkout</Button>
                        </Link>
                    }
                </HoverCardContent>
            </HoverCard>




        </>
    );
}

export default CartModal;