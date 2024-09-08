'use client'
import { pusherClient } from "@/lib/pusher";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "../../ui/table";
import { useEffect, useRef, useState } from "react";
import SelectStatus from "./SelectStatus";
import { OrderWithProducts } from "@/lib/types";

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
        <Table className="mt-3">
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {ordersState.map((order) => (
                    <TableRow className="even:bg-gray-50" key={order.id}>
                        <TableCell className="pl-6" width={80}>{order.id}</TableCell>
                        <TableCell width={180}>
                            <SelectStatus status={order.status} id={order.id} />
                        </TableCell>
                        <TableCell className="whitespace-pre-line">
                            {order.customerFullname}
                            <br />
                            {order.customerCity}, {order.customerStreet}
                        </TableCell>
                        <TableCell>
                            {order.orderItems.map(item =>
                                <div key={item.id}>{`${item.quantity} x ${item.product.name}`}<br /></div>
                            )}</TableCell>
                        <TableCell className="whitespace-pre-line">{new Date(order.time).toLocaleDateString()}</TableCell>
                        <TableCell>{order.total}$</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default OrderList;

