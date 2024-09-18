import { getMenu } from "@/lib/actions";
import { Pizza } from "lucide-react";
import BestProductsSelect from "./BestProductsSelect";

const BestProducts = async () => {
    const products = await getMenu()

    return (
        <div className="my-4">
            <h3 className="text-xl flex gap-3 items-center"><Pizza className="w-4 h-4" />Best Products</h3>
            <span className="text-gray-500 text-sm">Display best products on homepage</span>
            <BestProductsSelect products={products} />
        </div>
    );
}

export default BestProducts;