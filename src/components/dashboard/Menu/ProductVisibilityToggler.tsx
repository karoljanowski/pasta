'use client'
import { showProduct, hideProduct } from "@/lib/actions"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { EyeOff, Eye } from "lucide-react"

const ProductVisibilityToggler = ({ active, id }: { active: boolean, id: number }) => {

    const toggleVisibility = () => {
        if (active) {
            hideProduct(id)
        } else {
            showProduct(id)
        }
    }

    return (
        <>
            {active ? (
                <DropdownMenuItem onClick={toggleVisibility} className="text-yellow-500">
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide
                </DropdownMenuItem>
            ) : (
                <DropdownMenuItem onClick={toggleVisibility} className="text-yellow-500">
                    <Eye className="w-4 h-4 mr-2" />
                    Show
                </DropdownMenuItem>
            )}
        </>
    );
}

export default ProductVisibilityToggler;