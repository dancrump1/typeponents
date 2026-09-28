import { motion } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";



const RevealCard = ({
    imgSrc,
    title,
    description,
}: {
    imgSrc: string;
    title: string;
    description: string;
}) => {
    return (
        <motion.div whileHover="hover" className="w-full h-[300px] relative">
            <div className="h-1/2 p-6 flex flex-col justify-center bg-black">
                <h3 className="text-xl mb-2 font-semibold text-white">{title}</h3>
                <p className="text-sm font-light text-slate-300">{description}</p>
            </div>
            <motion.div
                initial={{
                    top: "0%",
                    right: "0%",
                }}
                variants={{
                    hover: {
                        top: "50%",
                        right: "50%",
                    },
                }}
                className="absolute inset-0 bg-slate-200 z-10"
                style={{
                    backgroundImage: `url(${imgSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <a
                href="#"
                rel="nofollow"
                className="w-1/2 h-1/2 absolute bottom-0 right-0 z-0 grid place-content-center bg-white text-black hover:text-indigo-500 transition-colors"
            >
                <div className="flex items-center">
                    <span className="text-xs">MORE</span>
                    <FiArrowUpRight className="text-lg" />
                </div>
            </a>
        </motion.div>
    );
};

export default RevealCard;