'use client';
import { handleChangeStatus } from "@/lib/actions";
import { OrderStatusProps } from "@/lib/types";
import { OrderStatus } from "@prisma/client";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../../ui/select";
import { useState } from "react";

const SelectStatus = ({ status, id }: OrderStatusProps) => {
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(status);
    const statusArray = Object.values(OrderStatus);

    const handleChange = async (newStatus: OrderStatus) => {
        setSelectedStatus(newStatus);
        await handleChangeStatus({ status: newStatus, id });
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
            <SelectTrigger className={`w-full ${getStatusColor(selectedStatus)}`}>
                <SelectValue placeholder={selectedStatus} />
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
