'use client'
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const items = [
  { id: 0, color: "bg-red-500", description: "Red Description lorem" },
  { id: 1, color: "bg-green-500", description: "Green Description lorem" },
  { id: 2, color: "bg-yellow-500", description: "Yellow Description lorem" },
  { id: 3, color: "bg-blue-500", description: "Blue Description lorem" },
  { id: 4, color: "bg-purple-500", description: "Purple Description lorem" },
  { id: 5, color: "bg-pink-500", description: "Pink Description lorem" },
];

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const numItems = items.length;
  const anglePerItem = 360 / numItems;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = (index: number) => {
    const angleDifference = (index - activeIndex) * anglePerItem;
    setRotationAngle(rotationAngle - angleDifference);
    setActiveIndex(index);
  };

  // Avoid rendering on the server-side
  if (!isMounted) {
    return null;
  }

  return (
    <div className="mt-32 overflow-hidden">
      <p className="text-9xl text-center uppercase">our best products</p>
      <div className="flex justify-between items-center mb-32 -mt-8 h-screen">
        <div className="flex-1 relative h-3/4 text-white">
          <div className="absolute z-20 w-full left-0 px-24 h-full justify-center flex flex-col bg-red-700">
            <p className="text-5xl font-bold">{items[activeIndex].description}</p>
            <p className="text-2xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          </div>
          <div className="absolute w-1/2 -right-1/2 rounded-r-full bg-red-700 h-full"></div>
        </div>

        <div className="relative h-full flex flex-1 justify-center items-center">
          <motion.div
            className="w-full h-full absolute left-12"
            style={{
              transform: `rotate(${rotationAngle + 180}deg)`,
            }}
            animate={{ rotate: rotationAngle + 180 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {items.map((item, index) => {
              const angle = index * anglePerItem;
              const x = 230 * Math.cos((angle * Math.PI) / 180);
              const y = 230 * Math.sin((angle * Math.PI) / 180);

              return (
                <motion.div
                  key={item.id}
                  className="absolute w-32 h-32 rounded-full flex justify-center items-center text-white text-2xl cursor-pointer"
                  initial={{ scale: 1 }}
                  animate={{ scale: item.id === activeIndex ? 2.2 : 1 }}
                  style={{
                    top: `calc(50% + ${y}px)`,
                    left: `calc(50% + ${x}px)`,
                    translateX: '-50%',
                    translateY: '-50%',
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onClick={() => handleClick(index)}
                >
                  <Image src={'/pizza.png'} width={300} height={300} alt="pizza" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
