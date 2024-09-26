'use client'
import { Copy } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { duplicateProduct } from "@/lib/actions";
import { toast } from "react-hot-toast";

const ProductDuplicateButton = ({ id, setLoading }: { id: number, setLoading: (loading: boolean) => void }) => {

    const handleDuplicate = async (id: number) => {
        try {
            setLoading(true);
            const result = await duplicateProduct(id);
            if (result.success) {
                toast.success('Product duplicated');
            } else {
                toast.error('Product not found');
            }
        } catch (err) {
            toast.error('Erorr');
        } finally {
            setLoading(false);
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