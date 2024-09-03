'use client';

import { useFormStatus } from "react-dom";
import { motion } from 'framer-motion';

const CheckoutFormButton = () => {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            type="submit"
            className="relative flex min-h-[50px] items-center justify-center hover:bg-yellow-200 bg-white text-black px-10 py-2 text-2xl border-black border rounded-lg shadow-md shadow-gray-800"
        >
            {pending ? (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                    <div className="w-6 h-6 border-4 border-t-transparent border-black rounded-full"></div>
                </motion.div>
            ) : (
                "Order with obligation to pay"
            )}
        </button>
    );
}

export default CheckoutFormButton;
