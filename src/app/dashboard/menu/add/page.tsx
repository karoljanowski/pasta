import ProductFrom from "@/components/dashboard/Menu/Form/ProductForm";

const Page = async () => {

    return (
        <div>
            <h2 className="text-3xl font-bold">New product</h2>
            <p className="text-lg text-gray-600">Add new product to menu</p>
            <ProductFrom mode="add" />
        </div>
    );
}



export default Page;