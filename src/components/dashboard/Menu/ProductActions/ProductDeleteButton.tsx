'use client'
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteProduct } from "@/lib/actions";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const ProductDeleteButton = ({ id, setLoading }: { id: number, setLoading: (loading: boolean) => void }) => {
    const handleDelete = async (id: number) => {
        try {
            setLoading(true);
            const result = await deleteProduct(id);
            if (result.success) {
                toast.success('Product deleted');
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
        <DropdownMenuItem onClick={() => handleDelete(id)} className="text-red-500 cursor-pointer">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
        </DropdownMenuItem>
    );
}

export default ProductDeleteButton;