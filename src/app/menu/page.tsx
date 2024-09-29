import CartModal from "@/components/cart/CartModal";
import Header from "@/components/Homepage/Header";
import MenuList from "@/components/menu/MenuList";
import { Teko } from "next/font/google";
import { Suspense } from "react";
const teko = Teko({ subsets: ["latin"] });

const page = () => {
    return (
        <>
            <div className={`${teko.className} min-h-screen bg-yellow-50`}>
                <Header />
                <div className="container mx-auto">
                    <Suspense fallback={<div>Loading...</div>}>
                        <MenuList />
                    </Suspense>
                </div>
                <CartModal />
            </div>
        </>
    );
}

export default page;