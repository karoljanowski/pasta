import { getOrder } from "@/lib/actions";
import { OrderStatus } from "@prisma/client";

const Page = async ({ params }: { params: { id: string } }) => {
    const order = await getOrder(Number(params.id));
    if (!order) return <div className="text-center text-red-500 text-3xl mt-20">Order not found</div>;

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.Processing:
                return "bg-yellow-100 text-yellow-800 border-yellow-500";
            case OrderStatus.Accepted:
                return "bg-blue-100 text-blue-800 border-blue-500";
            case OrderStatus.Preparing:
                return "bg-orange-100 text-orange-800 border-orange-500";
            case OrderStatus.Shipped:
                return "bg-purple-100 text-purple-800 border-purple-500";
            case OrderStatus.Completed:
                return "bg-green-100 text-green-800 border-green-500";
            default:
                return "bg-gray-100 text-gray-800 border-gray-500";
        }
    };

    return (
        <div className="bg-yellow-50 flex justify-center items-center min-h-screen px-2">
            <div className="container mx-auto my-10 bg-red-700 rounded-xl shadow-lg shadow-gray-800 py-10 px-4 md:px-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-center text-white mb-1 md:md-4">Order Confirmation</h1>
                <div className="text-center text-2xl text-gray-100 opacity-80 mb-6">Order #{order?.id}</div>

                <div className="space-y-4">
                    {/* Order Status */}
                    <div className={`border-l-4 p-4 ${getStatusColor(order.status)}`}>
                        <p className="text-lg font-medium">Status: {order.status}</p>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
                        <p className="text-3xl text-gray-800 font-semibold mb-4">Order Summary</p>
                        <div>
                            {order?.orderItems.map(item => (
                                <div key={item.id} className="flex items-center justify-between text-xl border-b border-gray-300 last-of-type:border-b-0 py-2">
                                    <p>{item.quantity} x {item.product.name}</p>
                                    <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-2xl font-bold mt-2 pt-4 border-t border-gray-400">
                            <p>Total</p>
                            <p>${order.total}</p>
                        </div>
                    </div>

                    {/* Delivery Details */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                        <p className="text-3xl text-gray-800 font-semibold mb-4">Delivery Details</p>
                        <p className="text-xl leading-6 mb-2">
                            {order.customerFullname}
                        </p>
                        <p className="text-lg leading-6">
                            {order.customerStreet}, {order.customerCity}
                        </p>
                        <p className="mt-4 text-lg">Payment type: <span className="font-medium">{order.payment}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
