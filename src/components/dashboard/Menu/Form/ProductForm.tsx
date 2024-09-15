'use client'
import { Product } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { editProduct, addProduct } from "@/lib/actions";
import { useEffect } from "react";
import EditIngredients from "./EditIngredients";
import EditPhoto from "./EditPhoto";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import ProductFormButton from "./ProductFormButton";

interface ProductFormProps {
    product?: Product;
    mode: 'edit' | 'add';
}

const ProductEdit = ({ product, mode }: ProductFormProps) => {
    const action = mode === 'edit' ? editProduct : addProduct;
    const [state, formAction] = useFormState(action, { success: false });

    useEffect(() => {
        if (state.success) {
            toast.success('Product edited');
            redirect('/dashboard/menu');
        } else if (!state.success && state.errors) {
            toast.error('Product not edited. Please try again');
        }

    }, [state]);

    return (
        <div className="mt-5">
            <form action={formAction}>
                {mode == 'edit' && <input type="hidden" name="id" value={product?.id} />}
                <EditPhoto initialImage={product?.image} />
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-3">
                    <Input defaultValue={product?.name} name="name" placeholder="Product name" />
                    <Input defaultValue={product?.price} name="price" placeholder="Product price" />
                </div>
                <Textarea className="h-24 my-3 resize-none" defaultValue={product?.description} name="description" placeholder="Product description" />
                <EditIngredients ingredientsInitial={product?.ingredients} />

                <ProductFormButton />
            </form>
        </div>
    );
}

export default ProductEdit;

