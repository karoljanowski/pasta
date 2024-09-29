'use client'
import { useCartStore } from "@/lib/store";
import { Button } from "../ui/button";
import { Eye, Plus } from "lucide-react";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Product } from "@prisma/client";
import { CartItem } from "@/lib/types";

const MenuButtons = ({ item }: { item: Product }) => {
    const { addItem } = useCartStore();

    const handleAddToCart = () => {
        const currentProduct = item;
        const cartItem: CartItem = {
            productId: currentProduct.id,
            productName: currentProduct.name,
            productPrice: currentProduct.price,
            quantity: 1
        };
        addItem(cartItem);
    };

    return (
        <div className="flex space-x-1">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="custom2" className="bg-black shadow-none w-9 h-9 text-white p-2 rounded-full"><Eye /></Button>
                </PopoverTrigger>
                <PopoverContent>
                    <p className="font-semibold">Description</p>
                    <p>{item.description}</p>
                </PopoverContent>
            </Popover>
            <Button onClick={() => handleAddToCart()} variant="custom2" className="bg-red-700 shadow-none w-9 h-9 text-white p-2 rounded-full"><Plus /></Button>
        </div>
    );
}

export default MenuButtons;