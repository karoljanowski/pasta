'use client';
import { motion } from "framer-motion";
import Image from "next/image";

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
                <button className="hover:bg-red-900 hover:text-white transition-all bg-white text-black px-10 py-1 text-2xl mt-2 border-black border rounded-lg shadow-md shadow-gray-800">Go to menu</button>
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
