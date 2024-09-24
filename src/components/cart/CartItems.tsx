import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { CartItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const CartItems = ({ showQuantity = false }: { showQuantity?: boolean }) => {
    const { items, removeItem, addItem, totalPrice } = useCartStore();

    const handleIncreaseQuantity = (item: CartItem) => {
        addItem({ ...item, quantity: 1 });
    };

    const handleDecreaseQuantity = (item: CartItem) => {
        if (item.quantity > 1) {
            addItem({ ...item, quantity: -1 });
        } else {
            removeItem(item.productId);
        }
    };

    return (
        <>
            <div className={`flex flex-col gap-4 my-5 ${showQuantity ? 'text-xl' : 'text-lg'}`}>
                {items.map(item => (
                    <div key={item.productId} className={`flex justify-between ${showQuantity ? 'py-4' : 'py-2'} items-center border-b border-gray-200 min-w-52`}>

                        <p className="font-semibold"><span className="font-normal">{item.quantity} x </span>{item.productName}</p>

                        <div className="flex items-center gap-4">
                            {showQuantity && (
                                <div className="flex items-center border rounded">
                                    <button onClick={() => handleDecreaseQuantity(item)} className="p-2 hover:bg-gray-200">
                                        <Minus />
                                    </button>
                                    <span className="px-4">{item.quantity}</span>
                                    <button onClick={() => handleIncreaseQuantity(item)} className="p-2 hover:bg-gray-200">
                                        <Plus />
                                    </button>
                                </div>
                            )}
                            <button onClick={() => removeItem(item.productId)}>
                                <Trash className="w-4 h-4 mb-1 text-red-900 font-bold" />
                            </button>
                            <p>${(item.productPrice * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`flex justify-between items-center mb-4 ${showQuantity ? 'text-2xl' : 'text-xl'}`}>
                <p>Total Price</p>
                <p className="font-bold">${totalPrice.toFixed(2)}</p>
            </div>
        </>
    );
};

export default CartItems;
