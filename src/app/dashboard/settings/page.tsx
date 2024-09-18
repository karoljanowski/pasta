import BestProducts from "@/components/dashboard/Settings/BestProducts";
import DeliveryTime from "@/components/dashboard/Settings/DeliveryTime";

const Page = () => {
    return (
        <>
            <h2 className="text-3xl font-bold">Settings</h2>
            <p className="text-lg text-gray-600">Change settings of restaurant site</p>

            <DeliveryTime />
            <BestProducts />
        </>
    );
}

export default Page;