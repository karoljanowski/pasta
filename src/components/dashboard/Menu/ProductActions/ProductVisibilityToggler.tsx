'use client'
import { showProduct, hideProduct } from "@/lib/actions"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { EyeOff, Eye } from "lucide-react"
import toast from "react-hot-toast"

const ProductVisibilityToggler = ({ active, id, setLoading }: { active: boolean, id: number, setLoading: (loading: boolean) => void }) => {

    const toggleVisibility = async () => {
        try {
            setLoading(true)
            const response = active ? await hideProduct(id) : await showProduct(id)
            if (response?.success) {
                toast.success('Product visibility toggled')
            } else {
                toast.error('Product not found')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <DropdownMenuItem onClick={toggleVisibility} className="text-yellow-500 cursor-pointer">
                {active ? (
                    <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Hide
                    </>
                ) : (
                    <>
                        <Eye className="w-4 h-4 mr-2" />
                        Show
                    </>
                )
                }
            </DropdownMenuItem>
        </>
    );
}

export default ProductVisibilityToggler;