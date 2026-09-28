"use client";


import React, { useRef } from "react";
import { ScrollFlyingCards } from "./component";


const cards = [
  {
    id: 1,
    title: "Discovery",
    description:
      "User research, competitive analysis, stakeholder interviews, technical audits, and goal alignment, uncovering the insights that shape smart decisions.",
    icon: (
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="#e5e5e5"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="dark:stroke-neutral-700"
        />
        <polygon
          points="100,20 169.282,60 169.282,140 100,180 30.718,140 30.718,60"
          stroke="#404040"
          strokeWidth="1"
          className="dark:stroke-neutral-400"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(100, 20)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(169.282, 60)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(169.282, 140)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(100, 180)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(30.718, 140)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(30.718, 60)"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Strategy",
    description:
      "Synthesizing data into actionable plans. Defining product roadmaps, positioning, and mapping out the user journeys for maximum impact.",
    icon: (
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="100"
          cy="100"
          r="60"
          stroke="#404040"
          strokeWidth="1"
          className="dark:stroke-neutral-400"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="#e5e5e5"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="dark:stroke-neutral-700"
        />
        <line
          x1="20"
          y1="100"
          x2="180"
          y2="100"
          stroke="#e5e5e5"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="dark:stroke-neutral-700"
        />
        <line
          x1="100"
          y1="20"
          x2="100"
          y2="180"
          stroke="#e5e5e5"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="dark:stroke-neutral-700"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(100, 20)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(100, 180)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(20, 100)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(180, 100)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(100, 100)"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Design",
    description:
      "Crafting wireframes, high-fidelity UI, and interactive prototypes. Focusing on aesthetics, accessibility, and intuitive interactions.",
    icon: (
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="100,40 151.96,70 151.96,130 100,160 48.04,130 48.04,70"
          stroke="#e5e5e5"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="dark:stroke-neutral-700"
        />
        <polygon
          points="100,40 151.96,70 100,100 48.04,70"
          stroke="#404040"
          strokeWidth="1"
          className="dark:stroke-neutral-400"
        />
        <polygon
          points="100,100 151.96,70 151.96,130 100,160"
          stroke="#404040"
          strokeWidth="1"
          className="dark:stroke-neutral-400"
        />
        <polygon
          points="100,100 48.04,70 48.04,130 100,160"
          stroke="#404040"
          strokeWidth="1"
          className="dark:stroke-neutral-400"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(100, 40)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(151.96, 70)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(151.96, 130)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(100, 160)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(48.04, 130)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(48.04, 70)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(100, 100)"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Development",
    description:
      "Translating design into robust, scalable code. Building the frontend and backend architectures that bring the vision to life seamlessly.",
    icon: (
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="100,40 169.28,160 30.72,160"
          stroke="#404040"
          strokeWidth="1"
          className="dark:stroke-neutral-400"
        />
        <circle
          cx="100"
          cy="120"
          r="40"
          stroke="#e5e5e5"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="dark:stroke-neutral-700"
        />
        <line
          x1="100"
          y1="40"
          x2="100"
          y2="120"
          stroke="#e5e5e5"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="dark:stroke-neutral-700"
        />
        <line
          x1="30.72"
          y1="160"
          x2="100"
          y2="120"
          stroke="#e5e5e5"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="dark:stroke-neutral-700"
        />
        <line
          x1="169.28"
          y1="160"
          x2="100"
          y2="120"
          stroke="#e5e5e5"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="dark:stroke-neutral-700"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(100, 40)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(169.28, 160)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(30.72, 160)"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          fill="#ef4444"
          transform="translate(100, 120)"
        />
      </svg>
    ),
  },
];

export default function ScrollFlyingCardsPreview() {
  const scrollRef = useRef(null);




  

  

  return (
    <div ref={scrollRef} className="h-[560px] w-full overflow-y-auto select-none">
      <div className="flex h-screen w-full items-center justify-center text-center text-lg font-semibold text-neutral-800 dark:text-neutral-200">
        Scroll down
      </div>

      <ScrollFlyingCards
        cards={cards}
        backgroundText="The complete product lifecycle.&#10;From deep research to scalable architectures."
        backgroundTextClassName="text-3xl md:text-5xl font-bold text-neutral-400 dark:text-neutral-600 leading-tighter"
        scrollContainerRef={scrollRef}
        
      />

      <div className="flex h-screen w-full items-center justify-center text-center text-lg font-semibold text-neutral-800 dark:text-neutral-200">
        Scroll up
      </div>
    </div>
  );
}
