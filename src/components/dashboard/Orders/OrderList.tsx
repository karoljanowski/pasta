'use client'
import { pusherClient } from "@/lib/pusher";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "../../ui/table";
import { useEffect, useRef, useState } from "react";
import SelectStatus from "./SelectStatus";
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

