'use client';

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const CheckoutFormButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending}
            type="submit"
            variant="custom1"
            size="custom1"
        >
            {pending ? <Loader2 className="animate-spin" /> : 'Order with obligation to pay'}
        </Button>
    );
}

export default CheckoutFormButton;
