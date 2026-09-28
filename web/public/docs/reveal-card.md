# Reveal Card

Card covered by a full-bleed image that slides away diagonally to expose a title block and a More link.

**Interaction.** Hovering slides the image panel down and to the right, uncovering the dark title and description above it and a white More corner beneath; the panel slides back over as soon as the pointer leaves.

- Categories: Cards
- Tags: hover
- Import: `@/components/ui/reveal-card`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/reveal-card.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`
- `react-icons`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `imgSrc` *(required)* | `string` | — | — |
| `title` *(required)* | `string` | — | — |
| `description` *(required)* | `string` | — | — |

## Usage

```tsx
import RevealCard from "./component";

const RevealCards = () => {
    return (
        <section className="p-8 bg-white">
            <span className="block text-center text-xl font-medium mb-4">
                Hover a card
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <RevealCard
                    title="Build"
                    description="We make pretty buildings"
                    imgSrc="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                />
                <RevealCard
                    title="See?"
                    description="This ones pretty nice"
                    imgSrc="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                />
                <RevealCard
                    title="TALL!"
                    description="We can even do TALL buildings"
                    imgSrc="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                />

                <RevealCard
                    title="Wavy"
                    description="You like wavy buildings?"
                    imgSrc="https://images.unsplash.com/photo-1598818384697-62330d600309?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                />
                <RevealCard
                    title="Modern"
                    description="This one's real blocky"
                    imgSrc="https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80"
                />
                <RevealCard
                    title="Modular"
                    description="That is all :)"
                    imgSrc="https://images.unsplash.com/photo-1547282548-b82b40322759?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                />
            </div>
        </section>
    );
};

export default function RevealCardUsage() {
    return (
        <div>
            <RevealCards />
        </div>
    );
}
```

## Source

### `components/ui/reveal-card.tsx`

```tsx
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
```
