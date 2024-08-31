'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
    const currentPath = usePathname()

    return (
        <nav className="text-lg flex py-2 w-full px-3 bg-gray-200 my-4 rounded-lg">
            <div className="flex gap-4">
                <Link href="orders" className={`text-gray-600 px-6 py-1 rounded-xl ${currentPath == '/dashboard/orders' ? 'bg-white text-black shadow-md shadow-gray-300 ' : ''}`}>
                    Orders
                </Link>
                <Link
                    href="menu"
                    className={`text-gray-600 px-6 py-1 rounded-xl ${currentPath == '/dashboard/menu' ? 'bg-white text-black shadow-md shadow-gray-300 ' : ''}`}
                >
                    Menu Edit
                </Link>
                <Link
                    href="settings"
                    className={`text-gray-600 px-6 py-1 rounded-xl ${currentPath == '/dashboard/settings' ? 'bg-white text-black shadow-md shadow-gray-300 ' : ''}`}
                >
                    Settings
                </Link>
            </div>
        </nav>

    );
}

export default Header;