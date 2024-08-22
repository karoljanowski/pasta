// 'use client'
// import { pusherClient } from "@/lib/pusher";
// import { useEffect } from "react";

// const Pusher = () => {
//     useEffect(() => {
//         const channel = pusherClient.subscribe('channel');

//         // Bind to an event within that channel
//         channel.bind('event', function () {
//           console.log('123')
//         });
//     }, [])
//     return (
//         <div>
//             Enter
//         </div>
//     );
// }

// export default Pusher;
'use client'
import { OrderWithCustomer } from "@/lib/types";
import { useState } from "react";
const OrderList = ({orders}: {orders: OrderWithCustomer[]}) => {

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
      setExpandedIndex(expandedIndex === index ? null : index);
    };
  
    return (
        <div className="mt-6">
          {/* Grid Header */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 text-gray-500 border-b pb-2">
                    <div>Order Number</div>
                    <div>Status</div>
                    <div className="text-right sm:text-left sm:block">Customer</div>
                    <div className="hidden sm:block">Time</div>
                    <div className="hidden sm:block">Total</div>
            </div>
    
            {/* Grid Rows */}
            {orders.map((order, index) => (
                <div
                key={index}
                className="grid grid-cols-3 sm:grid-cols-5 gap-4 py-5 border-b items-center even:bg-gray-50 px-2"
                >
                    {/* Order Number */}
                    <div className="text-left sm:text-left">{order.id}</div>
            
                    {/* Status */}
                    <div className="text-left sm:text-left">{order.status}</div>
            
                    {/* Customer */}
                    <div className="hidden sm:block">
                            {order.customer.name} {order.customer.surname}
                            <br />
                            {order.customer.city}, {order.customer.street}
                    </div>
            
                    {/* Time and Total for Desktop */}
                    <div className="hidden sm:block">{new Date(order.time).toLocaleString()}</div>
                    <div className="hidden sm:block">{order.total}$</div>
            
                    {/* Expand Button for Mobile */}
                    <div className="flex justify-end sm:hidden">
                        <button
                        onClick={() => toggleExpand(index)}
                        className="text-blue-500 underline"
                        >
                        {expandedIndex === index ? 'Collapse' : 'Expand'}
                        </button>
                    </div>
    
                    {/* Expanded Details (Visible when expanded on mobile) */}
                    {expandedIndex === index && (
                        <div className="col-span-3 grid grid-cols-1 gap-4 sm:hidden border-t border-gray-200 mt-1">
                        {/* Customer */}
                        <div className="flex justify-between items-center pt-4">
                            <div className="font-medium text-gray-600">Customer</div>
                            <div className="text-right">
                            {order.customer.name} {order.customer.surname}
                            <br />
                            {order.customer.city}, {order.customer.street}
                            </div>
                        </div>
            
                        {/* Time */}
                        <div className="flex justify-between items-center">
                            <div className="font-medium text-gray-600">Time</div>
                            <div className="text-right">{new Date(order.time).toLocaleString()}</div>
                        </div>
            
                        {/* Total */}
                        <div className="flex justify-between items-center">
                            <div className="font-medium text-gray-600">Total</div>
                            <div className="text-right">{order.total}$</div>
                        </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
      );
  };
      


export default OrderList;
