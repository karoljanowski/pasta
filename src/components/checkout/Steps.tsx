'use client'
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CartItems from "../cart/CartItems";
import CheckoutForm from "./CheckoutForm";
import { useCartStore } from "@/lib/store";

const CheckoutSteps = () => {
    const { totalQuantity, initializeCart } = useCartStore()
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

    const handleStepClick = (step: number) => {
        setCurrentStep(step);
    };

    const variants = {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
    };

    return (
        <div className="container mx-auto mt-6">
            <div className="flex justify-center items-center mb-8">
                <div
                    className={`text-xl flex items-center cursor-pointer transition-all ${currentStep === 1 ? 'text-white' : 'text-gray-300'}`}
                    onClick={() => handleStepClick(1)}
                >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${currentStep === 1 ? 'border-white bg-white text-red-700' : 'border-gray-300 text-gray-300'}`}>
                        1
                    </div>
                    <span className="ml-2">Review Cart</span>
                </div>
                <div className="flex-grow border-t-2 mx-2"></div>
                <div
                    className={`text-xl flex items-center cursor-pointer transition-all ${currentStep === 2 ? 'text-white' : 'text-gray-300'}`}
                    onClick={() => handleStepClick(2)}
                >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${currentStep === 2 ? 'border-white bg-white text-red-700' : 'border-gray-300 text-gray-300'}`}>
                        2
                    </div>
                    <span className="ml-2">Shipping Details</span>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {currentStep === 1 && (
                    <motion.div
                        key="step1"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={variants}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl mb-4">Review Your Cart</h2>
                        <CartItems mode='Dark' />
                        <div className="flex mt-6">
                            <button
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
                        variants={variants}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl mb-6">Shipping Details</h2>
                        <CheckoutForm />
                        <div className="flex mt-6">
                            <button
                                onClick={handlePreviousStep}
                                className="hover:bg-gray-300 w-full transition-all bg-gray-200 text-red-700 px-10 py-2 text-2xl border-red-700 border rounded-lg shadow-md shadow-gray-800">
                                Back to Cart
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CheckoutSteps;
