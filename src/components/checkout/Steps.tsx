'use client'
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CartItems from "../cart/CartItems";
import CheckoutForm from "./CheckoutForm";
import { useCartStore } from "@/lib/store";
import { ChevronLeft } from "lucide-react";

const CheckoutSteps = () => {
    const { items, totalPrice, totalQuantity, initializeCart } = useCartStore()
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        if (totalQuantity === 0) {
            initializeCart();
        }
    }, [totalQuantity, initializeCart]);

    const handleNextStep = () => {
        setCurrentStep(prev => prev + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    return (
        <div className="container mx-auto mt-6">


            <AnimatePresence mode="wait">
                {currentStep === 1 && (
                    <motion.div
                        key="step1"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={{
                            initial: { opacity: 0, x: -100 },
                            animate: { opacity: 1, x: 0 },
                            exit: { opacity: 0, x: -100 },
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-5xl mb-4">Review Your Cart</h2>
                        <CartItems mode='Dark' />
                        <div className="flex mt-6">
                            <button
                                disabled={totalQuantity === 0}
                                onClick={handleNextStep}
                                className="hover:bg-yellow-200 w-full transition-all bg-white text-red-700 px-10 py-2 text-2xl border-red-700 border rounded-lg shadow-md shadow-gray-800">
                                Proceed to Checkout
                            </button>
                        </div>
                    </motion.div>
                )}

                {currentStep === 2 && (
                    <motion.div
                        key="step2"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={{
                            initial: { opacity: 0, x: 100 },
                            animate: { opacity: 1, x: 0 },
                            exit: { opacity: 0, x: 100 },
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex mt-6">
                            <button
                                onClick={handlePreviousStep}
                                className="flex items-center mb-6 bg-yellow-50 text-red-700 rounded-lg px-4 py-1 hover:bg-red-700 hover:text-white border border-black shadow shadow-gray-800">
                                <ChevronLeft className="w-3 h-3 mb-px" />
                                Back to Cart
                            </button>
                        </div>
                        <h2 className="text-5xl mb-6">Shipping Details</h2>
                        <CheckoutForm items={items} totalPrice={totalPrice} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CheckoutSteps;
