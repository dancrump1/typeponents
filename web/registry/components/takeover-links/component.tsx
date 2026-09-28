import React, { Dispatch, SetStateAction, useEffect } from "react";
import { motion, useAnimate } from "motion/react";




export const UnderlayTransition = ({ active }: { active: number | null }) => {
    const [underlayScope, animateUnderlay] = useAnimate();

    useEffect(() => {
        if (active) {
            animateUnderlay(
                underlayScope.current,
                {
                    top: ["100%", "0%", "0%"],
                    bottom: ["0%", "0%", "100%"],
                },
                { duration: 1.5, ease: "easeInOut" }
            );
        }
    }, [active]);

    return (
        <div
            ref={underlayScope}
            className="absolute bottom-0 left-0 right-0 top-full z-10 bg-neutral-300"
        />
    );
};

export const AnimatedLink = ({
    children,
    href,
    setActive,
    active,
    id,
}: {
    children: string;
    href: string;
    setActive: Dispatch<SetStateAction<number | null>>;
    active: number | null;
    id: number;
}) => {
    return (
        <motion.a
            onMouseEnter={() => {
                setActive(id);
            }}
            href={href}
            animate={active === id || active === null ? "active" : "inactive"}
            variants={{
                active: {
                    opacity: 1,
                },
                inactive: {
                    opacity: 0.25,
                },
            }}
            transition={{
                duration: 0.25,
                ease: "easeInOut",
                staggerChildren: 0.075,
            }}
            whileHover="hovered"
            className="flex overflow-hidden py-2 text-5xl font-thin uppercase md:text-6xl lg:text-8xl"
        >
            {children.split("").map((ch, idx) => {
                return (
                    <motion.span
                        className="block"
                        initial={false}
                        variants={{
                            hovered: {
                                y: ["0%", "-110%", "110%", "0%"],
                                opacity: [1, 0, 0, 1],
                            },
                        }}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                        }}
                        key={idx}
                    >
                        {ch}
                    </motion.span>
                );
            })}
        </motion.a>
    );
};

export const LinkImage = ({
    imgSrc,
    active,
    id,
}: {
    imgSrc: string;
    active: number | null;
    id: number;
}) => {
    return (
        <motion.div
            className="absolute inset-0 z-0"
            animate={active === id ? "active" : "inactive"}
            variants={{
                active: {
                    opacity: 0.25,
                },
                inactive: {
                    opacity: 0,
                },
            }}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: 0.5,
            }}
            style={{
                backgroundImage: `url(${imgSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(8px)",
                opacity: 0,
            }}
        />
    );
};
