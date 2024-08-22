'use client'

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const items = [
  { id: 0, icon: '/pizza.png', description: "Carbonara" },
  { id: 1, icon: '/pizza.png', description: "W KOŃCU" },
  { id: 2, icon: '/pizza.png', description: "ogarnąłęĶ" },
  { id: 3, icon: '/pizza.png', description: "Text 4" },
  { id: 4, icon: '/pizza.png', description: "Text 5" },
  { id: 5, icon: '/pizza.png', description: "Text 6" },
];

const radius = 110
const textRadius = 150
const svgSize = textRadius * 2 + 150

const Slider = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [rotationAngle, setRotationAngle] = useState(0)

    const numItems = items.length
    const anglePerItem = 360 / numItems

    const handleClick = (index: number) => {
        const angleDifference = (index - activeIndex) * anglePerItem
        setRotationAngle(rotationAngle - angleDifference)
        setActiveIndex(index)
    }

    const isVisible = (index: number) => {
        const prevIndex = (activeIndex - 1 + numItems) % numItems
        const nextIndex = (activeIndex + 1) % numItems
        return index === activeIndex || index === prevIndex || index === nextIndex
    }

    return (
        <div className="mt-16 pt-16 text-white flex flex-col items-center bg-red-700">

            <p className="text-5xl md:text-9xl text-stroke-reverse text-center uppercase mb-10">
                Our Best Products
            </p>

            <div className="relative overflow-hidden w-full flex justify-center" style={{height: svgSize / 2}}>
                <motion.svg
                width={svgSize}
                height={svgSize}
                viewBox={`0 0 ${svgSize} ${svgSize}`}
                animate={{ rotate: rotationAngle - 90 }}
                transition={{ duration: 0.5, ease: "easeInOut", type: "spring", damping: 10 }}
                >
                {items.map((item, index) => {
                    const angle = index * anglePerItem * (Math.PI / 180)
                    const x = svgSize / 2 + radius * Math.cos(angle)
                    const y = svgSize / 2 + radius * Math.sin(angle)

                    const textX = svgSize / 2 + textRadius * Math.cos(angle)
                    const textY = svgSize / 2 + textRadius * Math.sin(angle)

                    const textRotation = (index * anglePerItem) + 90

                    if (!isVisible(index)) return null

                    return (
                    <motion.g
                        key={item.id}
                        onClick={() => handleClick(index)}
                        className="cursor-pointer"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <motion.text
                            x={textX}
                            y={textY - (item.id === activeIndex ? 30 : 0)}
                            textAnchor="middle"
                            initial={{fontSize: 30}}
                            animate={{fontSize: item.id === activeIndex ? 50 : 30}}
                            fill="white"
                            transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                            style={{ pointerEvents: "none" }}
                        >
                        {item.description}
                        </motion.text>

                        <motion.image
                        initial={{ scale: 1 }}
                        animate={{ scale: item.id === activeIndex ? 1.8 : 1 }}
                        href={item.icon}
                        width={40}
                        height={40}
                        x={x - 20}
                        y={y - 20}
                        />
                    </motion.g>
                    );
                })}
                </motion.svg>
            </div>
        </div>
  );
};

export default Slider;
