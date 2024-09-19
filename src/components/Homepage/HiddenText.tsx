'use client'
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const HiddenText = ({ style, text }: { style: string, text: string }) => {
    const ref = useRef(null)
    const inView = useInView(ref, { margin: '-120px', once: true, amount: 0.3 })
    const controls = useAnimation()

    useEffect(() => {
        if (inView == true) {
            controls.start({ y: 0 })
        } else {
            controls.start({ y: '100%' })
        }
    }, [inView, controls])

    return (
        <div ref={ref} className="h-max overflow-hidden py-px">
            <motion.p
                className={style}
                initial={{ y: "100%" }}
                animate={controls}
                transition={{ duration: 0.2 }}>
                {text}
            </motion.p>
        </div>
    );
}

export default HiddenText;