import { getMenu } from "@/lib/actions";
import MenuList from "@/components/dashboard/Menu/MenuList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async () => {
    const menu = await getMenu()

    return (
        <>
            <h2 className="text-3xl font-bold">Menu</h2>
            <p className="text-lg text-gray-600">Edit menu in your restaurant</p>
            <div className="flex justify-end">
                <Link href="/dashboard/menu/add"><Button>Add product</Button></Link>
            </div>
            <MenuList menu={menu} />
        </>
    );
}

export default Page;