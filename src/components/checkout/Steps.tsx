'use client'

import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import CartItems from "../cart/CartItems"
import CheckoutForm from "./CheckoutForm"
import { useCartStore } from "@/lib/store"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const CheckoutSteps = () => {
    const { items, totalPrice, totalQuantity, initializeCart } = useCartStore()
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (totalQuantity === 0) {
            initializeCart()
        }
    }, [totalQuantity, initializeCart])

    const step = searchParams.get('step') ? searchParams.get('step') : 'cart'
    const isCartStep = step === 'cart'
    const isOrderStep = step === 'order'

    return (
        <div className="container mx-auto mt-6">
            <AnimatePresence mode="wait">
                {isCartStep && (
                    <motion.div
                        key="cart"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-5xl mb-4">Your Cart</h2>
                        <CartItems showQuantity={true} />
                        <div className="flex mt-6">
                            <Button
                                disabled={totalQuantity === 0}
                                onClick={() => router.push('/checkout?step=order')}
                                variant="custom1"
                                size="custom1"
                                className="w-full"
                            >
                                Proceed to Checkout
                            </Button>
                        </div>
                    </motion.div>
                )}

                {isOrderStep && (
                    <motion.div
                        key="order"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Button variant="custom1" className="text-base shadow-sm mb-6" onClick={() => router.push('checkout?step=cart')}>
                            <ChevronLeft className="w-3 h-3 mb-px" />
                            Back to Cart
                        </Button>

                        <h2 className="text-5xl mb-6">Shipping Details</h2>
                        <CheckoutForm items={items} totalPrice={totalPrice} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CheckoutSteps
