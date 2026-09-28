import { useState } from "react";
import { motion } from "motion/react";
import { FiChevronDown, FiEdit, FiPlusSquare, FiShare, FiTrash } from "react-icons/fi";
import Option from "./component";

const StaggeredDropDown = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-8 pb-56 flex items-center justify-center bg-white">
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <button
                    onClick={() => setOpen((pv) => !pv)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
                >
                    <span className="font-medium text-sm">Post actions</span>
                    <motion.span variants={iconVariants}>
                        <FiChevronDown />
                    </motion.span>
                </button>

                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{ originY: "top", translateX: "-50%" }}
                    className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
                >
                    <Option setOpen={setOpen} Icon={FiEdit} text="Edit" />
                    <Option setOpen={setOpen} Icon={FiPlusSquare} text="Duplicate" />
                    <Option setOpen={setOpen} Icon={FiShare} text="Share" />
                    <Option setOpen={setOpen} Icon={FiTrash} text="Remove" />
                </motion.ul>
            </motion.div>
        </div>
    );
};
const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};


export default function StaggeredDropdownUsage() {
    return (
        <div>
            <StaggeredDropDown />
        </div>
    );
}