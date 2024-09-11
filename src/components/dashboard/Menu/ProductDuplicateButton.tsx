'use client'
import { Copy } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { duplicateProduct } from "@/lib/actions";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";

const ProductDuplicateButton = ({ id }: { id: number }) => {

    const handleDuplicate = async (id: number) => {
        try {
            const result = await duplicateProduct(id);
            if (result.success) {
                toast.success('Product duplicated');
            } else {
                toast.error('Product not found');
            }
        } catch (err) {
            toast.error('Erorr');
        }
    }
    return (
        <>
            <DropdownMenuItem onClick={() => handleDuplicate(id)} className="text-green-500 cursor-pointer">
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
            </DropdownMenuItem>
        </>
    );
}

export default ProductDuplicateButton;