import { Product } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Separator } from "@/components/ui/separator"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faDollarSign, faEllipsisVertical, faSeedling } from "@fortawesome/free-solid-svg-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../../ui/button";


interface MenuProps {
    menu: Product[]
}

const MenuList = ({ menu }: MenuProps) => {
    return (
        <div className="mt-6">
            <div className="grid grid-cols-4 gap-4">
                {menu.map(item => {
                    console.log(item)
                    return (
                        <Card key={item.id} className="bg-gray-100 flex flex-col h-full">
                            <CardHeader>
                                <div className="flex gap-4 items-center">
                                    <div className="w-50 h-50">
                                        <Image src={item.image} alt={item.name} width={50} height={50} />
                                    </div>
                                    <CardTitle>
                                        {item.name}
                                    </CardTitle>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="ml-auto">
                                            <FontAwesomeIcon icon={faEllipsisVertical} className="text-black w-5 h-5 text-right" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Hide</DropdownMenuItem>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <Separator />
                            <CardContent className="mt-4 h-full">
                                <div className="flex flex-col gap-3 h-full">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faSeedling} className="w-4 h-4 text-lime-600" />
                                            <div className="font-bold">Ingredients</div>
                                        </div>
                                        <div className="flex flex-col mt-1 ml-6">
                                            {item.ingredients.map((ingredient, i) => {
                                                return <div key={i} className="flex items-center gap-2">
                                                    <FontAwesomeIcon icon={faCircle} className="w-1 h-1 text-black" />
                                                    {ingredient}
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faDollarSign} className="w-4 h-4 text-yellow-600" />
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