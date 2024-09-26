'use client'
import { pusherClient } from "@/lib/pusher";
import { useEffect, useRef, useState } from "react";
import { OrderWithProducts } from "@/lib/types";
import { DataTable } from "./DataTable";
import columns from "./Columns";

const OrderList = ({ orders }: { orders: OrderWithProducts[] }) => {
    const [ordersState, setOrdersState] = useState<OrderWithProducts[]>(orders)
    const initialized = useRef(false)

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true

            const channel = pusherClient.subscribe('channel');
            channel.bind('newOrder', (item: OrderWithProducts) => {
                setOrdersState(prev => [...prev, item])
            });
        }
    }, [])

    return (
        <>
            <DataTable columns={columns} data={ordersState} />
        </>
    );
};

export default OrderList;

