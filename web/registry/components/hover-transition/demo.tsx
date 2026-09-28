"use client"

import { HoverTransition } from "./component";

export const HoverTransitionUsage = () => {
    return (
        <div>
            <HoverTransitionDemo />
        </div>
    );
};



function DefaultCard() {
    return (
        <article className="relative flex h-full flex-col justify-between overflow-hidden bg-[#ece9e1] p-6 text-[#151515]">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-black/50">
                Product Designer
            </span>
            <div aria-hidden="true" className="absolute inset-0 grid place-items-center text-[9rem] font-semibold tracking-[-0.08em] text-black/[0.06]">
                MC
            </div>
            <div className="relative">
                <h3 className="text-3xl font-medium tracking-[-0.05em]">Maya Chen</h3>
                <p className="mt-1 text-sm text-black/55">Designing thoughtful digital products.</p>
            </div>
        </article>
    )
}

function HoverCard() {
    return (
        <article className="flex h-full flex-col justify-between bg-[#dfff5f] p-6 text-[#111]">
            <p className="max-w-[24ch] text-xl font-medium leading-tight tracking-[-0.035em]">
                Turning complex product ideas into clear, expressive experiences that people enjoy using.
            </p>
            <div>
                <p className="font-semibold">Maya Chen</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-black/55">
                    Product Designer
                </p>
            </div>
        </article>
    )
}

export default function HoverTransitionDemo() {
    return (
        <HoverTransition
            effect="wipe"
            direction="right"
            duration={0.72}
            defaultComponent={<DefaultCard />}
            hoverComponent={<HoverCard />}
            className="aspect-[4/5] w-full max-w-sm rounded-3xl"
        />
    )
}