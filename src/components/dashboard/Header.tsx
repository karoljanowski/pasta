'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import DesktopMenu from "./Nav/DesktopMenu";
import MobileMenu from "./Nav/MobileMenu";

const Header = () => {
    const currentPath = usePathname()


    return (
        <>
            <DesktopMenu currentPath={currentPath} />
            <MobileMenu />
        </>

    );
}

export default Header;