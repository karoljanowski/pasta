'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
    const currentPath = usePathname()

    return (
        <nav className="text-lg flex py-2 w-full px-3 bg-gray-100 rounded-md">
            <div className="flex gap-4">
                <Link href="orders"
                    className={`text-gray-600 px-4 py-1 rounded-md ${currentPath == '/dashboard/orders' ? 'bg-white text-black shadow-md shadow-gray-300 ' : ''}`}>
                    Orders
                </Link>
                <Link
                    href="menu"
                    className={`text-gray-600 px-4 py-1 rounded-md ${currentPath == '/dashboard/menu' ? 'bg-white text-black shadow-md shadow-gray-300 ' : ''}`}
                >
                    Menu
                </Link>
                <Link
                    href="settings"
                    className={`text-gray-600 px-4 py-1 rounded-md ${currentPath == '/dashboard/settings' ? 'bg-white text-black shadow-md shadow-gray-300 ' : ''}`}
                >
                    Settings
                </Link>
            </div>
        </nav>

    );
}

export default Header;