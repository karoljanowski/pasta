import OrderList from "@/components/dashboard/Orders/OrderList";
import { getOrders } from "@/lib/actions";
const Page = async () => {
    const orders = await getOrders()

    return (
        <>
            <h2 className="text-3xl font-bold">Orders</h2>
            <p className="text-lg text-gray-600">Recent orders from your restaurant</p>
            <OrderList orders={orders} />
        </>
    );
}

export default Page;