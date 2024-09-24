
import CheckoutSteps from "@/components/checkout/Steps";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CheckoutPage = () => {
    return (
        <div className="min-h-screen container mx-auto p-4">
            <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
                <CheckoutSteps />
            </Suspense>
        </div>
    );
}

export default CheckoutPage;
