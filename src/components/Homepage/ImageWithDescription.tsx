'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const ImageWithDescription = ({ heading, text, image, reverse }: { heading: string, text: string, image: string, reverse: boolean }) => {
    return (
        <div
            className={`flex mt-8 overflow-hidden flex-col md:flex-row items-center justify-between gap-8 ${reverse ? 'md:flex-row-reverse' : ''}`}
        >
            <motion.div
                className="w-full md:w-1/2 text-center md:text-left"
                initial={{ opacity: 0, x: reverse ? '-10%' : '10%' }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                viewport={{ margin: '-120px', once: true, amount: 0.3 }}
            >
                <h3 className="text-3xl font-bold mb-4">{heading}</h3>
                <p className="text-lg">{text}</p>
                <Link href={`/menu`}>
                    <Button variant="custom2" size="custom2" className="mt-4">Go to menu</Button>
                </Link>
            </motion.div>
            <motion.div
                className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, x: reverse ? '-10%' : '10%' }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                viewport={{ margin: '-120px', once: true, amount: 0.3 }}
            >
                <Image src={image} alt="About us" width={600} height={600} className="object-cover w-full h-full" />
            </motion.div>
        </div>
    );
}

export default ImageWithDescription;
