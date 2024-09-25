'use client'
import { Product } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { setBestProducts } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import FormButton from "@/components/FormButton";

const BestProductsSelect = ({ products }: { products: Product[] }) => {
    const [state, action] = useFormState(setBestProducts, { success: false })

    useEffect(() => {
        if (state.success) {
            toast.success("Best products updated")
        } else if (!state.success && state.errors) {
            toast.error(state.errors[0] ? state.errors[0] : "Failed to update best products")
        }
    }, [state])

    return (
        <form action={action} className="flex flex-col items-start gap-3 my-3">
            <div className="flex gap-4 flex-wrap">
                {products.map((product) => {
                    return (
                        <div key={product.id} className="flex items-center gap-1">
                            <Checkbox defaultChecked={product.isBest} name={product.id.toString()} id={product.id.toString()} />
                            <label htmlFor={product.id.toString()}>{product.name}</label>
                        </div>
                    )
                })}
            </div>
            <FormButton text="Save" />
        </form>
    );
}

export default BestProductsSelect;