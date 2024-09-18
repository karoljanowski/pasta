import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const DeliveryTimeButton = () => {
    const { pending } = useFormStatus()
    return (
        <Button disabled={pending} type="submit">
            {pending ? <Loader2 className="animate-spin" /> : 'Save'}
        </Button>
    );
}

export default DeliveryTimeButton;