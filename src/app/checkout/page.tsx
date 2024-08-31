
import CheckoutSteps from "@/components/checkout/Steps";
const CheckoutPage = () => {
    return (
        <div className="bg-red-700">
            <div className="min-h-screen container mx-auto p-4 text-white">
                <h1 className="text-5xl font-bold">Checkout</h1>
                <CheckoutSteps />
            </div>
        </div>
    );
}

export default CheckoutPage;
