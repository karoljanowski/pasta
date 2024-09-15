import MenuList from "@/components/dashboard/Menu/MenuList";
import MenuListSkeleton from "@/components/dashboard/Menu/MenuListSkeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

const Page = async () => {


    return (
        <>
            <h2 className="text-3xl font-bold">Menu</h2>
            <p className="text-lg text-gray-600">Edit menu in your restaurant</p>
            <div className="flex justify-end">
                <Link href="/dashboard/menu/add"><Button>Add product</Button></Link>
            </div>
            <Suspense fallback={<MenuListSkeleton />}>
                <MenuList />
            </Suspense>
        </>
    );
}

export default Page;