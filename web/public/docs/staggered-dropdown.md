# Staggered Dropdown

An actions menu that unrolls below a button, with an icon and label on every row.

**Interaction.** Clicking the button flips its chevron and unrolls the panel downward from its top edge; the rows then fade up one after another, each icon popping to full size a beat after its label. Picking a row closes the menu in reverse.

- Categories: Buttons
- Tags: hover
- Import: `@/components/ui/staggered-dropdown`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/staggered-dropdown.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`
- `react-icons`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` *(required)* | `string` | — | — |
| `Icon` *(required)* | `IconType` | — | — |
| `setOpen` *(required)* | `Dispatch<SetStateAction<boolean>>` | — | — |

## Usage

```tsx
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
```

## Source

### `components/ui/staggered-dropdown.tsx`

```tsx
import {
    FiEdit,
    FiChevronDown,
    FiTrash,
    FiShare,
    FiPlusSquare,
} from "react-icons/fi";
import { motion } from "motion/react";
import { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";



const Option = ({
    text,
    Icon,
    setOpen,
}: {
    text: string;
    Icon: IconType;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <motion.li
            variants={itemVariants}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
        >
            <motion.span variants={actionIconVariants}>
                <Icon />
            </motion.span>
            <span>{text}</span>
        </motion.li>
    );
};

export default Option;


const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};
```
