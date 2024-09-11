import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const ProductNotFound = () => {
    return <div className="flex justify-center my-5">
        <div className="text-center">
            <h2 className="text-3xl font-bold">Product not found</h2>
            <p className="text-lg text-gray-600">The product you are looking for does not exist</p>
            <Link href="/dashboard/menu" className="mt-4 block">
                <Button><ChevronLeft className="w-4 h-4" />Go back to menu</Button>
            </Link>
        </div>
    </div>
}
export default ProductNotFound;