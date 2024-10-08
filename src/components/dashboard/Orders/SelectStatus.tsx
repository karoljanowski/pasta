'use client';
import { handleChangeStatus } from "@/lib/actions";
import { OrderStatusProps } from "@/lib/types";
import { OrderStatus } from "@prisma/client";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../../ui/select";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const SelectStatus = ({ status, id }: OrderStatusProps) => {
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(status);
    const statusArray = Object.values(OrderStatus);
    const [loading, setLoading] = useState(false);

    const handleChange = async (newStatus: OrderStatus) => {
        try {
            setLoading(true);
            const reponse = await handleChangeStatus({ status: newStatus, id });
            if (reponse.success) {
                toast.success('Status updated');
                setSelectedStatus(newStatus);
            } else {
                toast.error('Order not found');
            }
        } catch (error) {
            toast.error('Error');
        } finally {
            setLoading(false);
            setSelectedStatus(newStatus);
        }
    };

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.Processing:
                return 'bg-yellow-300';
            case OrderStatus.Accepted:
                return 'bg-blue-300';
            case OrderStatus.Preparing:
                return 'bg-orange-300';
            case OrderStatus.Shipped:
                return 'bg-purple-300';
            case OrderStatus.Completed:
                return 'bg-green-300';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <Select
            value={selectedStatus}
            onValueChange={(value: OrderStatus) => handleChange(value)}
        >
            <SelectTrigger disabled={loading} className={`w-full ${getStatusColor(selectedStatus)}`}>
                {loading ? <Loader2 className="animate-spin w-full h-4" /> : selectedStatus}
            </SelectTrigger>
            <SelectContent>
                {statusArray.map((statusValue) => (
                    <SelectItem key={statusValue} value={statusValue}>
                        {statusValue}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectStatus;
