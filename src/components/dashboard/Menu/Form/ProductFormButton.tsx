'use client'
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
const ProductFormButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button disabled={pending} className="w-full mt-5" type="submit">
            {pending ? <Loader2 className="animate-spin" /> : 'Save Product'}
        </Button>
    );
}

export default ProductFormButton;