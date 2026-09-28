import React from "react";

import { motion } from "motion/react";


const TRANSITION = {
    ease: "easeInOut",
    duration: 10,
    repeat: Infinity,
    times: [0, 0.3, 0.4, 0.7, 0.8, 1],
};

export const Spinner = ({
    top,
    bottom,
}: {
    top: React.ReactNode;
    bottom: React.ReactNode;
}) => {
    return (
        <div className="relative h-12 w-full overflow-hidden bg-neutral-900 text-2xl">
            {/* TOP SPINNER */}
            <motion.div
                style={{
                    y: "-50%",
                    x: "-50%",
                }}
                animate={{
                    rotate: ["0deg", "0deg", "180deg", "180deg", "360deg", "360deg"],
                }}
                transition={{
                    ease: "easeInOut",
                    duration: 10,
                    repeat: Infinity,
                    times: [0, 0.3, 0.4, 0.7, 0.8, 1],
                }}
                className="absolute left-1/2 z-10 h-12 w-[50px] overflow-hidden rounded-full bg-neutral-900 ring-[1px] ring-neutral-700"
            >
                <div
                    style={{
                        bottom: 0,
                        transform: "translateY(50%) translateX(-50%)",
                    }}
                    className="absolute left-1/2"
                >
                    {top}
                </div>
                <div
                    style={{
                        top: 0,
                        transform: "translateY(-50%) translateX(-50%) rotate(180deg)",
                    }}
                    className="absolute left-1/2"
                >
                    {bottom}
                </div>
            </motion.div>

            {/* BOTTOM SPINNER */}
            <motion.div
                style={{
                    y: "50%",
                    x: "-50%",
                }}
                animate={{
                    rotate: ["0deg", "0deg", "180deg", "180deg", "360deg", "360deg"],
                }}
                transition={{
                    ease: "easeInOut",
                    duration: 10,
                    repeat: Infinity,
                    times: [0, 0.3, 0.4, 0.7, 0.8, 1],
                }}
                className="absolute left-1/2 z-10 h-12 w-[50px] overflow-hidden rounded-full bg-neutral-900 ring-[1px] ring-neutral-700"
            >
                <div
                    style={{
                        bottom: 0,
                        transform: "translateY(50%) translateX(-50%) rotate(180deg)",
                    }}
                    className="absolute left-1/2"
                >
                    {bottom}
                </div>
                <div
                    style={{
                        top: 0,
                        transform: "translateY(-50%) translateX(-50%)",
                    }}
                    className="absolute left-1/2"
                >
                    {top}
                </div>
            </motion.div>
        </div>
    );
};