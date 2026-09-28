"use client";
import React, { useRef } from "react";
import { TextReveal } from "./component";


export default function TextRevealPreview() {
  const scrollRef = useRef(null);


  

  

  const paragraphs = [
    "Every journey begins with a single moment of wonder—a quiet urge to explore what waits beyond the familiar.",
    "In a world alive with possibilities, small choices often shape destinies in ways we rarely expect.",
    "As horizons expand with every bold step, we discover how curiosity fuels growth far more than any roadmap written before us.",
    "Through challenges and triumphs, the stories we collect become the backbone of who we are, reminding us that adventure is not a destination, but a mindset we choose daily.",
  ];

  return (
    <div ref={scrollRef} className="h-[560px] w-full overflow-y-auto select-none">
      <div className="flex h-[90dvh] w-full items-center justify-center text-center text-lg font-semibold text-black dark:text-white">
        Scroll down
      </div>
      <TextReveal
        paragraphs={paragraphs}
        containerRef={scrollRef}
      />
      <div className="flex h-[90dvh] w-full items-center justify-center text-center text-lg font-semibold text-black dark:text-white">
        Scroll up
      </div>
    </div>
  );
}
