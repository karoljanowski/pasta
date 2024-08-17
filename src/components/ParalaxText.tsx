'use client'
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";

interface ParallaxProps {
  text: string;
  baseVelocity: number;
  textClass: string;
}

interface ParallaxContainerProps {
  text: string;
  baseVelocity: number;
}

const ParallaxText = ({ text, baseVelocity, textClass }: ParallaxProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3], {
    clamp: false
  });

  const wrap = (min: number, max: number, value: number): number =>  {
    const range = max - min;
  
    if (value >= min && value <= max) {
        return value;
    }
  
    const wrappedValue = ((value - min) % range + range) % range + min;
  
    return wrappedValue;
  }

  const x = useTransform(baseX, v => `${wrap(-25, 25, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <motion.div className={`text-8xl tracking-[3px] font-bold flex whitespace-nowrap flex-nowrap gap-10 uppercase ${textClass}`} style={{x}}>
      <span>{text}</span>
      <span>{text}</span>
      <span>{text}</span>
      <span>{text}</span>
      <span>{text}</span>
      <span>{text}</span>
    </motion.div>
  );
}

export const ParalaxContainer = ({text, baseVelocity} : ParallaxContainerProps) => {
  return (
    <div className="overflow-hidden absolute -z-10 top-0 left-0 w-full flex justify-center">
      <div className="h-screen pt-12 mb-12 w-full flex flex-nowrap items-center justify-evenly flex-col rotate-[25deg]">
        <ParallaxText baseVelocity={baseVelocity} text={text} textClass="text-red-700" />
        <ParallaxText baseVelocity={-baseVelocity} text={text} textClass="text-stroke text-white" />
        <ParallaxText baseVelocity={baseVelocity} text={text} textClass="text-red-700" />
      </div>
    </div>
  ) 
}
