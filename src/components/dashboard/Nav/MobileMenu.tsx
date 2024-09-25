'use client'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetClose } from "@/components/ui/sheet";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { logout } from "@/lib/auth";
const MobileMenu = () => {
    const [opened, setOpened] = useState(false)
    return (
        <div className="block md:hidden">
            <Sheet open={opened} onOpenChange={setOpened}>
                <SheetTrigger>
                    <Menu />
                </SheetTrigger>
                <SheetContent side='left' className="flex flex-col">
                    <SheetHeader className="text-left">
                        <p className="text-xl uppercase">Menu</p>
                    </SheetHeader>
                    <div className="flex flex-col h-full">
                        <Link onClick={() => setOpened(false)} href="/dashboard/orders" className="text-gray-600 border-t py-3 text-md">Orders</Link>
                        <Link onClick={() => setOpened(false)} href="/dashboard/menu" className="text-gray-600 border-t py-3 text-md">Menu</Link>
                        <Link onClick={() => setOpened(false)} href="/dashboard/settings" className="text-gray-600 border-t py-3 text-md">Settings</Link>
                        <Link onClick={() => setOpened(false)} href="/dashboard/file-manager" className="text-gray-600 border-t py-3 text-md">File manager</Link>
                        <button onClick={() => logout()} className="text-red-600 border-t py-3 text-md flex items-center mt-auto gap-2">
                            Logout <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileMenu;