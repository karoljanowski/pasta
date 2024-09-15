import Link from "next/link"

const DesktopMenu = ({ currentPath }: { currentPath: string }) => {
    return (
        <nav className="text-lg py-2 w-full px-3 bg-gray-100 rounded-md hidden md:flex">
            <div className="flex gap-4">
                <Link href="/dashboard/orders"
                    className={`text-gray-600 px-4 py-1 rounded-md ${currentPath == '/dashboard/orders' ? 'bg-white text-black shadow-md shadow-gray-300 ' : ''}`}>
                    Orders
                </Link>
                <Link
                    href="/dashboard/menu"
                    className={`text-gray-600 px-4 py-1 rounded-md ${currentPath == '/dashboard/menu' ? 'bg-white text-black shadow-md shadow-gray-300 ' : ''}`}
                >
                    Menu
                </Link>
                <Link
                    href="/dashboard/settings"
                    className={`text-gray-600 px-4 py-1 rounded-md ${currentPath == '/dashboard/settings' ? 'bg-white text-black shadow-md shadow-gray-300 ' : ''}`}
                >
                    Settings
                </Link>
                <Link
                    href="/dashboard/file-manager"
                    className={`text-gray-600 px-4 py-1 rounded-md ${currentPath == '/dashboard/file-manager' ? 'bg-white text-black shadow-md shadow-gray-300 ' : ''}`}
                >
                    File manager
                </Link>
            </div>
        </nav>
    )
}

export default DesktopMenu