import DeliveryTimeForm from "./DeliveryTimeForm";
import { getDeliveryTime } from "@/lib/actions";
import { Truck } from "lucide-react";

const DeliveryTime = async () => {
    const deliveryTime = await getDeliveryTime();
    return (
        <div className="my-4">
            <h3 className="text-xl items-center flex gap-3"><Truck className="w-4 h-4" />Delivery Time</h3>
            <span className="text-gray-500 text-sm">Set maximum time that you need for order</span>
            <DeliveryTimeForm initialTime={deliveryTime?.deliveryTimeInMinutes} />
        </div>
    );
}

export default DeliveryTime;