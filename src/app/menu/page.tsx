import Header from "@/components/Homepage/Header";
import MenuList from "@/components/menu/MenuList";
import { Teko } from "next/font/google";
import { Suspense } from "react";
const teko = Teko({ subsets: ["latin"] });

const page = () => {

    return (
        <div className={`${teko.className} min-h-screen bg-yellow-50`}>
            <Header />
            <div className="container mx-auto">
                <h1 className="text-6xl uppercase mt-10">Menu</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <MenuList />
                </Suspense>
            </div>
        </div>
    );
}

export default page;