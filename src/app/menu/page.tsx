import CartModal from "@/components/cart/CartModal";
import Header from "@/components/Homepage/Header";
import MenuList from "@/components/menu/MenuList";
import { Skeleton } from "@/components/ui/skeleton";
import { Teko } from "next/font/google";
import { Suspense } from "react";
const teko = Teko({ subsets: ["latin"] });

const page = () => {
    return (
        <>
            <div className={`${teko.className} min-h-screen bg-yellow-50`}>
                <Header />
                <div className="container mx-auto">
                    <Suspense fallback={
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-2 sm:gap-4 pt-4 pb-12 mx-4">
                            {Array.from({ length: 5 }).map((_, index) => {
                                return (
                                    <Skeleton key={index} className="w-full rounded-xl h-80" />
                                )
                            })}

                        </div>
                    }>
                        <MenuList />
                    </Suspense>
                </div>
                <CartModal />
            </div>
        </>
    );
}

export default page;