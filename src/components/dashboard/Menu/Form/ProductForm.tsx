'use client'
import { Product } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { editProduct, addProduct } from "@/lib/actions";
import { useEffect } from "react";
import EditIngredients from "./EditIngredients";
import EditImage from "./EditImage";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { HeadBlobResult } from "@vercel/blob";
import FormButton from "@/components/FormButton";

interface ProductFormProps {
    product?: Product;
    image?: HeadBlobResult;
    mode: 'edit' | 'add';
}

const ProductEdit = ({ product, mode, image }: ProductFormProps) => {
    const action = mode === 'edit' ? editProduct : addProduct;
    const [state, formAction] = useFormState(action, { success: false });

    useEffect(() => {
        if (state.success) {
            toast.success(mode === 'edit' ? 'Product edited' : 'Product added');
            redirect('/dashboard/menu');
        } else if (!state.success && state.errors) {
            toast.error('Check product form');
        }

    }, [state, mode]);

    return (
        <div className="mt-5">
            <form action={formAction}>
                {mode == 'edit' && <input type="hidden" name="id" value={product?.id} />}
                <EditImage initialImage={image} error={state.errors?.image && state.errors.image[0]} />
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-3">
                    <div>
                        <Input defaultValue={product?.name} name="name" placeholder="Product name" />
                        {state.errors?.name && <span className="text-red-700 mt-1 text-sm">{state.errors.name[0]}</span>}
                    </div>
                    <div>
                        <Input defaultValue={product?.price} name="price" placeholder="Product price" />
                        {state.errors?.price && <span className="text-red-700 mt-1 text-sm">{state.errors.price[0]}</span>}
                    </div>
                </div>
                <div className="my-3">
                    <Textarea className="h-24 resize-none" defaultValue={product?.description} name="description" placeholder="Product description" />
                    {state.errors?.description && <span className="text-red-700 mt-1 text-sm">{state.errors.description[0]}</span>}
                </div>
                <EditIngredients ingredientsInitial={product?.ingredients} />

                <FormButton text="Save" />
            </form>
        </div>
    );
}

export default ProductEdit;

