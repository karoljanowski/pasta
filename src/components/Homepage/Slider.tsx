'use client'
import { motion, useMotionValue, animate, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Product } from "@prisma/client";
import HiddenText from "./HiddenText";
import { useCartStore } from "@/lib/store";
import { CartItem } from "@/lib/types";
import { Button } from "../ui/button";

const getResponsiveValues = (width: number) => {
    if (width >= 1600) return { px: 1600, radius: 250, imageSize: 230, space: 200 };
    if (width >= 1200) return { px: 1200, radius: 220, imageSize: 180, space: 140 };
    if (width >= 1024) return { px: 1024, radius: 170, imageSize: 140, space: 85 };
    if (width >= 768) return { px: 768, radius: 150, imageSize: 120, space: 60 };
    if (width >= 500) return { px: 500, radius: 130, imageSize: 100, space: 30 };
    return { px: 500, radius: 130, imageSize: 100, space: 30 };
}
//here you can find way to rotate the images and resize
const Slider = ({ menu }: { menu: Product[] }) => {
    if (typeof window !== 'undefined') {

    }
    const { addItem } = useCartStore();
    const [dimensions, setDimensions] = useState(getResponsiveValues(window.innerWidth));
    const [activeName, setActiveName] = useState(menu[0].name);
    const [activeDescription, setActiveDescription] = useState(menu[0].description);
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-120px', amount: 0.3 });

    const rotationAngle = useMotionValue(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const isAnimating = useMotionValue(false);

    const imageCount = menu.length;
    const angleStep = (2 * Math.PI) / imageCount;

    const positions = menu.map((_, index) => {
        const angle = index * angleStep - (Math.PI / 2);
        return {
            x: dimensions.radius * Math.cos(angle),
            y: dimensions.radius * Math.sin(angle),
            angle
        };
    });

    const svgSize = dimensions.radius * 2 + dimensions.imageSize + dimensions.space;
    const viewBox = `-${svgSize / 2} -${svgSize / 2} ${svgSize} ${svgSize}`;

    const handleAnimation = (index: number) => {
        if (isAnimating.get() || index === activeIndex) return;

        isAnimating.set(true);
        const angleDifference = (index - activeIndex) * (360 / imageCount);

        animate(rotationAngle, rotationAngle.get() - angleDifference, {
            duration: 0.3,
            ease: "easeInOut",
            type: "spring",
            damping: 10,
            onComplete: () => isAnimating.set(false),
        });

        setActiveIndex(index);
        controls.start({ opacity: 0, transition: { duration: 0.3 } }).then(() => {
            setActiveName(menu[index].name);
            setActiveDescription(menu[index].description);
            controls.start({ opacity: 1, transition: { duration: 0.3 } });
        });
    };

    const handleAddToCart = () => {
        const currentProduct = menu[activeIndex];
        const cartItem: CartItem = {
            productId: currentProduct.id,
            productName: currentProduct.name,
            productPrice: currentProduct.price,
            quantity: 1
        };
        addItem(cartItem);
    };

    useEffect(() => {
        if (inView) handleAnimation(activeIndex + 1);
    }, [inView, activeIndex]);

    return (
        <div className="mt-16 pt-16 text-white flex flex-col items-center bg-red-700">
            <HiddenText text="Our best products" style="text-5xl md:text-7xl xl:text-9xl text-stroke-reverse text-center uppercase" />
            <motion.div
                className="max-w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: '-120px', once: true, amount: 0.3 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    animate={controls}
                    initial={{ opacity: 1 }}
                    className="text-center my-8 md:my-4 xl:my-2 w-full flex flex-col items-center"
                >
                    <motion.span className="text-4xl md:text-5xl xl:text-6xl">
                        {activeName}
                    </motion.span>
                    <motion.span className="text-xl md:text-2xl xl:text-3xl max-w-[80%] md:max-w-[60%] xl:max-w-[50%] font-thin leading-6">
                        {activeDescription}
                    </motion.span>
                    <Button onClick={handleAddToCart} variant="custom2" className="mt-3" size="custom2">Add to cart</Button>
                </motion.div>

                <div ref={ref} className="w-full flex justify-center items-start overflow-hidden" style={{ height: svgSize / 2 }}>
                    <motion.svg
                        width={svgSize} height={svgSize} viewBox={viewBox}
                        style={{ rotate: rotationAngle }}
                    >
                        {positions.map((pos, index) => (
                            <g className="cursor-pointer" key={index} onClick={() => handleAnimation(index)}>
                                <motion.image
                                    href={menu[index].image}
                                    x={pos.x - dimensions.imageSize / 2}
                                    y={pos.y - dimensions.imageSize / 2}
                                    width={dimensions.imageSize}
                                    height={dimensions.imageSize}
                                    animate={{ scale: activeIndex === index ? 1.2 : 1 }}
                                    transition={{ duration: 0.3 }}
                                    whileHover={{ rotate: 180, transition: { type: 'spring', damping: 13, duration: 0.4 } }}
                                />
                            </g>
                        ))}
                    </motion.svg>
                </div>
            </motion.div>
        </div>
    );
};

export default Slider;