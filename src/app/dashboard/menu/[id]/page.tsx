import { getProduct } from "@/lib/actions";
import ProductNotFound from "@/components/dashboard/Menu/ProductNotFound";
import ProductFrom from "@/components/dashboard/Menu/Form/ProductForm";

const Page = async ({ params }: { params: { id: string } }) => {
    if (!params.id || isNaN(Number(params.id))) {
        return <ProductNotFound />
    }
    const data = await getProduct(Number(params.id))
    if (!data) {
        return <ProductNotFound />
    }
    return (
        <div>
            <h2 className="text-3xl font-bold">{data.product.name}</h2>
            <p className="text-lg text-gray-600">Edit product from menu</p>
            <ProductFrom product={data.product} image={data.image} mode="edit" />
        </div>
    );
}



export default Page;