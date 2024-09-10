import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { CartItem } from "@/lib/types";

type Mode = {
    mode: 'Dark' | 'White'
}

const CartItems = ({ mode }: Mode) => {
    const { items, addItem, removeItem, totalPrice } = useCartStore();

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
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-grow">
                    <p className="text-xl font-semibold text-gray-600">Your cart is empty</p>
                    <p className="text-sm text-gray-500 mt-2">Add some items to get started!</p>
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-4 mb-6">
                        {items.map(item => (
                            <div key={item.productId} className={`flex justify-between items-center p-4 border-b border-gray-200`}>
                                <div>
                                    <p className="text-xl font-semibold">{item.productName}</p>
                                    <p className={`text-lg ${mode == 'White' ? 'text-gray-600' : 'text-gray-50'}`}>Price: ${item.productPrice.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border rounded">
                                        <button onClick={() => handleDecreaseQuantity(item)} className="p-2 hover:bg-gray-200">
                                            <Minus />
                                        </button>
                                        <span className="px-4">{item.quantity}</span>
                                        <button onClick={() => handleIncreaseQuantity(item)} className="p-2 hover:bg-gray-200">
                                            <Plus />
                                        </button>
                                    </div>
                                    <p className="text-lg font-semibold">${(item.productPrice * item.quantity).toFixed(2)}</p>
                                    <button onClick={() => removeItem(item.productId)} className={`${mode == 'White' ? 'text-red-600 hover:text-red-800' : 'text-gray-300 hover:text-gray-500'}`}>
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-2xl font-bold">Total Cart Price</p>
                        <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
                    </div>
                </>
            )}
        </>
    );
};

export default CartItems;
