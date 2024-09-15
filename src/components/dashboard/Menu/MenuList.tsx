import { Product } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Separator } from "@/components/ui/separator"
import { Dot, Wheat, DollarSign } from 'lucide-react'
import ProductActions from "./ProductActions";
import { getMenu } from "@/lib/actions";

interface MenuProps {
    menu: Product[]
}

const MenuList = async () => {
    const menu = await getMenu()
    return (
        <div className="mt-6">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                {menu.map(item => {
                    return (
                        <Card key={item.id} className={`${item.active ? 'opacity-100 bg-gray-100' : 'opacity-30 bg-gray-300'} transition-all  flex flex-col h-full`}>
                            <CardHeader>
                                <div className="flex gap-4 items-center">
                                    <div className="w-50 h-50">
                                        <Image src={item.image} alt={item.name} width={50} height={50} />
                                    </div>
                                    <CardTitle>
                                        {item.name}
                                    </CardTitle>
                                    <ProductActions active={item.active} id={item.id} />
                                </div>
                            </CardHeader>
                            <Separator />
                            <CardContent className="mt-4 h-full">
                                <div className="flex flex-col gap-3 h-full">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Wheat className="w-4 h-4 text-lime-500" />
                                            <div className="font-bold">Ingredients</div>
                                        </div>
                                        <div className="flex flex-col mt-1 ml-6">
                                            {item.ingredients.map((ingredient, i) => {
                                                return <div key={i} className="flex items-center gap-2">
                                                    <Dot className="text-lime-700" />
                                                    {ingredient}
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="text-yellow-500 w-4 h-4" />
                                            <h3 className="font-bold">Price</h3>
                                            <div className="font-bold">{item.price}$</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}

export default MenuList;