'use client';
import { handleChangeStatus } from "@/lib/actions";
import { OrderStatusProps } from "@/lib/types";
import { OrderStatus } from "@prisma/client";
import { useState } from "react";

const SelectStatus = ({ status, id }: OrderStatusProps) => {
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(status);
    const statusArray = Object.values(OrderStatus);

    const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value as OrderStatus;
        setSelectedStatus(newStatus);
        await handleChangeStatus({ status: newStatus, id: id });
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
        <div>
            <select
                className={`rounded-lg px-6 py-2 ${getStatusColor(selectedStatus)}`}
                value={selectedStatus}
                onChange={handleChange}
            >
                {statusArray.map((statusValue) => (
                    <option key={statusValue} value={statusValue}>
                        {statusValue}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectStatus;
