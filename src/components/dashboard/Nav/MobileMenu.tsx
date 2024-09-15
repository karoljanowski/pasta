import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetClose } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
const MobileMenu = () => {
    return (
        <div className="block md:hidden">
            <Sheet>
                <SheetTrigger>
                    <Menu />
                </SheetTrigger>
                <SheetContent side='left'>
                    <SheetHeader className="text-left">
                        <p className="text-xl uppercase">Menu</p>
                    </SheetHeader>
                    <div className="flex flex-col mt-4">
                        <SheetClose asChild><Link href="/dashboard/orders" className="text-gray-600 border-t py-3 uppercase text-2xl">Orders</Link></SheetClose>
                        <SheetClose asChild><Link href="/dashboard/menu" className="text-gray-600 border-t py-3 uppercase text-2xl">Menu</Link></SheetClose>
                        <SheetClose asChild><Link href="/dashboard/settings" className="text-gray-600 border-t py-3 uppercase text-2xl">Settings</Link></SheetClose>
                        <SheetClose asChild><Link href="/dashboard/file-manager" className="text-gray-600 border-t py-3 uppercase text-2xl">File manager</Link></SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileMenu;