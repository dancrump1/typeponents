"use client";


import React, { useRef } from "react";
import WordFocusScroll from "./component";


export default function WordFocusScrollPreview() {
  const scrollRef = useRef(null);




  

  

  return (
    <div ref={scrollRef} className="h-[560px] w-full overflow-y-auto select-none">
      <div className="flex h-screen w-full items-center justify-center text-center text-lg font-semibold text-neutral-400">
        Scroll down to see words focus (scaling up, sharping, fading in)
      </div>

      <WordFocusScroll
        text="Every journey begins with a single moment of wonder—a quiet urge to explore what waits beyond the familiar. In a world alive with possibilities, small choices often shape destinies in ways we rarely expect. As horizons expand with every bold step, we discover how curiosity fuels growth far more than any roadmap written before us. Through challenges and triumphs, the stories we collect become the backbone of who we are."
        scrollContainerRef={scrollRef}
        
      />

      <div className="flex h-screen w-full items-center justify-center text-center text-lg font-semibold text-neutral-400">
        Scroll up
      </div>
    </div>
  );
}
