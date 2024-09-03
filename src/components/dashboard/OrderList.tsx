'use client'
// import { pusherClient } from "@/lib/pusher";
import { useEffect, useRef, useState } from "react";
import SelectStatus from "./SelectStatus";
import { OrderWithProducts } from "@/lib/types";

const OrderList = ({ orders }: { orders: OrderWithProducts[] }) => {
    const [ordersState, setOrdersState] = useState<OrderWithProducts[]>(orders)
    const initialized = useRef(false)

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true

            // const channel = pusherClient.subscribe('channel');
            // channel.bind('newOrder', (item: OrderWithProducts) => {
            //     setOrdersState(prev => [...prev, item])
            // });
        }
    }, [])

    return (
        <div className="max-w-full overflow-x-scroll">
            <div className="mt-6 min-w-[800px] w-full text-left">
                <div className="grid grid-cols-[100px_200px_minmax(200px,1fr)_minmax(200px,1fr)_150px_100px] gap-4 text-gray-500 border-b pb-2 px-4">
                    <div>Order ID</div>
                    <div>Status</div>
                    <div>Customer</div>
                    <div>Products</div>
                    <div>Time</div>
                    <div>Total</div>
                </div>

                {ordersState && ordersState.map((order, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[100px_200px_minmax(200px,1fr)_minmax(200px,1fr)_150px_100px] gap-4 py-5 border-b items-center even:bg-gray-50 px-4"
                    >
                        <div>{order.id}</div>

                        <SelectStatus status={order.status} id={order.id} />

                        <div>
                            {order.customerFullname}
                            <br />
                            {order.customerCity}, {order.customerStreet}
                        </div>

                        <div>
                            {order.orderItems.map(item =>
                                <>{`${item.quantity} x ${item.product.name}`}<br /></>
                            )}
                        </div>

                        <div>{new Date(order.time).toLocaleTimeString()}<br />{new Date(order.time).toLocaleDateString()}</div>


                        <div>{order.total}$</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderList;
