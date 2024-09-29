import { getMenu } from "@/lib/actions";
import Image from "next/image";
import MenuButtons from "./MenuButtons";

const MenuList = async () => {
    const menu = await getMenu();

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-2 sm:gap-4 pt-4 pb-12 mx-4 bg-yellow-50">
            {menu.map((item, index) => {
                return (
                    <div key={index} className="p-4 overflow-hidden rounded-lg flex flex-col items-center bg-white shadow-lg hover:border-red-700 border-transparent border">
                        <Image src={item.image} alt={item.name} width={120} height={120} />
                        <h2 className="text-xl font-bold text-black mt-4 text-center">{item.name}</h2>
                        <p className="text-gray-700 mt-2 text-center word-break-words">{item.ingredients}</p>
                        <div className="flex items-center justify-between w-full mt-auto pt-2">
                            <p className="text-2xl font-semibold text-red-700">${item.price}</p>
                            <MenuButtons item={item} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default MenuList;