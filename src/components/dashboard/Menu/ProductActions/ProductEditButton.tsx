import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Edit2 } from "lucide-react";
import Link from "next/link";
const ProductEditButton = ({ id }: { id: number }) => {
    return (
        <DropdownMenuItem className="text-blue-500">
            <Link className="flex w-full" href={`/dashboard/menu/${id}`}>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
            </Link>
        </DropdownMenuItem>
    );
}

export default ProductEditButton;