import { getProduct } from "@/lib/actions";
import ProductNotFound from "@/components/dashboard/Menu/ProductNotFound";
import ProductFrom from "@/components/dashboard/Menu/Form/ProductForm";

const Page = async ({ params }: { params: { id: string } }) => {
    if (!params.id || isNaN(Number(params.id))) {
        return <ProductNotFound />
    }
    const product = await getProduct(Number(params.id))
    if (!product) {
        return <ProductNotFound />
    }
    return (
        <div>
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-lg text-gray-600">Edit product from menu</p>
            <ProductFrom product={product} />
        </div>
    );
}



export default Page;