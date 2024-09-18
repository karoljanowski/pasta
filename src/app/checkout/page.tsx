
import CheckoutSteps from "@/components/checkout/Steps";

import { Teko } from "next/font/google";

const teko = Teko({ subsets: ["latin"] });

const CheckoutPage = () => {
    return (
        <div className={`${teko.className} bg-red-700`}>
            <div className="min-h-screen container mx-auto p-4 text-white">
                <CheckoutSteps />
            </div>
        </div>
    );
}

export default CheckoutPage;
