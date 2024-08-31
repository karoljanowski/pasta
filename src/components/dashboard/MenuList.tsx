import { Product } from "@prisma/client";
import Image from "next/image";

interface MenuProps {
    menu: Product[]
}

const MenuList = ({ menu }: MenuProps) => {
    console.log(menu)
    return (
        <div className="mt-6">
            <div className="grid grid-cols-4 gap-4">
                {menu.map(item => {
                    return (
                        <div key={item.id} className="bg-gray-100 rounded-lg p-4">
                            <Image src={item.images[0]} alt={item.name} />
                            <div>{item.name}</div>
                            <div>{item.description}</div>
                            <div>{item.price}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default MenuList;