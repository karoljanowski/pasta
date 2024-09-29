import { getMenu } from "@/lib/actions";
import Image from "next/image";

const MenuList = async () => {
    const menu = await getMenu()

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {menu.map((item, index) => {
                return (
                    <div key={index}>
                        <Image src={item.image} alt={item.name} width={200} height={200} />
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default MenuList;