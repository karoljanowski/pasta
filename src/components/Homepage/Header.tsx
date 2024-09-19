'use client'
import { useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
    const [isScrolled, setisScrolled] = useState<boolean>(false)
    const { scrollYProgress } = useScroll()
    useMotionValueEvent(scrollYProgress, 'change', latest => {
        if (latest > 0.005) {
            setisScrolled(true)
        } else {
            setisScrolled(false)
        }
    })

    return (
        <div className={`transition-all duration-300 sticky z-50 h-full top-0 bg-opacity-80 left-0 w-full ${isScrolled ? 'bg-yellow-50' : 'bg-transparent'}`}>
            <div className={`flex items-center justify-evenly container mx-auto px-4 uppercase transition-all`}>
                <Link className={`transition-all ${isScrolled ? 'py-3 text-base' : 'text-xl py-4'}`} href={'/menu'}>menu</Link>
                <Link className={`transition-all ${isScrolled ? 'py-3 text-xl' : 'text-3xl py-4'}`} href={'/'}>pizza & pasta</Link>
                <Link className={`transition-all ${isScrolled ? 'py-3 text-base' : 'text-xl py-4'}`} href={'/#about'}>about</Link>
            </div>
        </div>
    );
}

export default Header;