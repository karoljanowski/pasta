'use client'
import { motion, useMotionValue, animate, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Product } from "@prisma/client";
import HiddenText from "./HiddenText";
import { useCartStore } from "@/lib/store";
import { CartItem } from "@/lib/types";

const getResponsiveValues = (width: number) => {
    switch (true) {
        case width >= 1600:
            return { px: 1600, radius: 250, imageSize: 230, space: 200 };
        case width >= 1200:
            return { px: 1200, radius: 220, imageSize: 180, space: 140 };
        case width >= 1024:
            return { px: 1024, radius: 170, imageSize: 140, space: 85 };
        case width >= 768:
            return { px: 768, radius: 150, imageSize: 120, space: 60 };
        case width >= 500:
            return { px: 500, radius: 130, imageSize: 100, space: 30 };
        default:
            return { px: 500, radius: 130, imageSize: 100, space: 30 };
    }
}

const Slider = ({ menu }: { menu: Product[] }) => {
    const { addItem } = useCartStore()
    const [dimensions, setDimensions] = useState({ radius: 130, imageSize: 100, space: 30 });
    const activeName = useMotionValue(menu[0].name);
    const activeDescription = useMotionValue(menu[0].description);
    const controls = useAnimation()
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-50px', amount: 0.5 })

    const rotationAngle = useMotionValue(0);
    const activeIndex = useMotionValue(0);
    const isAnimating = useMotionValue(false);

    // const scales = menu.map((_, index) => useMotionValue(index === 0 ? 1.3 : 1));

    const imageCount = menu.length;
    const angleStep = (2 * Math.PI) / imageCount;

    const positions = menu.map((_, index) => {
        const angle = index * angleStep - (Math.PI / 2);
        const x = dimensions.radius * Math.cos(angle);
        const y = dimensions.radius * Math.sin(angle);
        return { x, y, angle };
    });

    const svgSize = dimensions.radius * 2 + dimensions.imageSize + dimensions.space;
    const viewBox = `-${svgSize / 2} -${svgSize / 2} ${svgSize} ${svgSize}`;

    const handleAnimation = (index: number) => {
        if (isAnimating.get() || index === activeIndex.get()) return;

        isAnimating.set(true);

        const anglePerItem = 360 / imageCount;
        const angleDifference = (index - activeIndex.get()) * anglePerItem;

        animate(rotationAngle, rotationAngle.get() - angleDifference, {
            duration: 0.3,
            ease: "easeInOut",
            type: "spring",
            damping: 10,
            onComplete: () => isAnimating.set(false),
        });

        // scales.forEach((scale, i) => {
        //     animate(scale, i === index ? 1.3 : 1, {
        //         duration: 0.3,
        //         ease: "easeInOut",
        //     });
        // });

        activeIndex.set(index);
        const sequence = async () => {
            await controls.start({ opacity: 0, transition: { duration: 0.3 } });
            activeName.set(menu[index].name)
            activeDescription.set(menu[index].description)
            await controls.start({ opacity: 1, transition: { duration: 0.3 } });
        };
        sequence();
    };

    const handleAddToCart = () => {
        const currentProduct = menu[activeIndex.get()]

        const cartItem: CartItem = {
            productId: currentProduct.id,
            productName: currentProduct.name,
            productPrice: currentProduct.price,
            quantity: 1
        }

        //add alert that product addded

        addItem(cartItem)
    }

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setDimensions(getResponsiveValues(window.innerWidth));
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (inView) {
            handleAnimation(activeIndex.get() + 1)
        }
    }, [inView, activeIndex])

    return (
        <div className="mt-16 pt-16 text-white flex flex-col items-center bg-red-700">
            <HiddenText text="Our best products" style="text-5xl md:text-7xl xl:text-9xl text-stroke-reverse text-center uppercase" />
            <motion.div
                className="max-w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                viewport={{ margin: '-200px', once: true }}
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
                    <button onClick={handleAddToCart} className="bg-yellow-50 transition-all uppercase mt-4 text-black px-10 py-2 text-xl border-black border rounded-lg shadow-md shadow-gray-800 hover:bg-yellow-200">Add to cart</button>
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
                                // style={{ scale: scales[index] }}
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
