'use client'
import { Product } from "@prisma/client";
import { Input, Textarea } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { editProduct } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import EditIngredients from "./EditIngredients";
import EditPhoto from "./EditPhoto";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const ProductEdit = ({ product }: { product: Product }) => {
    const [state, action] = useFormState(editProduct, { success: false });

    useEffect(() => {
        if (state.success) {
            toast.success('Product edited');
            redirect('/dashboard/menu');
        } else {
            toast.error('Product not edited. Please try again');
        }

    }, [state]);

    return (
        <div className="mt-5">
            <form action={action}>
                <input type="hidden" name="id" value={product.id} />
                <EditPhoto initialImage={product.image} />
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-3">
                    <Input defaultValue={product.name} name="name" placeholder="Product name" />
                    <Input defaultValue={product.price} name="price" placeholder="Product price" />
                </div>
                <Textarea className="h-24 my-3" defaultValue={product.description} name="description" placeholder="Product description" />
                <EditIngredients ingredientsInitial={product.ingredients} />

                <Button className="w-full mt-5" type="submit">Save Product</Button>
            </form>
        </div>
    );
}

export default ProductEdit;

