'use client'
import { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Loader2 } from "lucide-react";
import ProductDeleteButton from "./ProductActions/ProductDeleteButton";
import ProductEditButton from "./ProductActions/ProductEditButton";
import ProductDuplicateButton from "./ProductActions/ProductDuplicateButton";
import ProductVisibilityToggler from "./ProductActions/ProductVisibilityToggler";

const ProductActions = ({ id, active }: { id: number, active: boolean }) => {
    const [loading, setLoading] = useState(false);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={loading} className="ml-auto">
                {loading ? <Loader2 className="animate-spin" /> : <EllipsisVertical />}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <ProductDeleteButton id={id} setLoading={setLoading} />
                <ProductEditButton id={id} />
                <ProductDuplicateButton id={id} setLoading={setLoading} />
                <ProductVisibilityToggler active={active} id={id} setLoading={setLoading} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ProductActions;