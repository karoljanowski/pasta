import { getOrder } from "@/lib/actions";

const Page = async ({ params }: { params: { id: string } }) => {
    const order = await getOrder(Number(params.id))
    if (!order) return <div>error</div>
    return (
        <div>
            <div className="text-6xl">masz synek zamowienie numer {order?.id}</div>
            <div className="text-6xl flex gap-2">zamowiles {order?.orderItems.map(item => {
                return <div key={item.id}>{item.quantity} x {item.product.name}</div>
            })}</div>
        </div>
    );
}

export default Page;