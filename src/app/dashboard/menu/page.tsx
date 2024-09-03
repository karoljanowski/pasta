import { getMenu } from "@/lib/actions";
import MenuList from "@/components/dashboard/MenuList";

const Page = async () => {
    const menu = await getMenu()

    return (
        <>
            <h2 className="text-3xl font-bold">Menu</h2>
            <p className="text-lg text-gray-600">Edit menu in your restaurant</p>
            <MenuList menu={menu} />
        </>
    );
}

export default Page;