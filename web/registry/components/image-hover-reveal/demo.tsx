"use client";


import React from "react";
import ImageHoverReveal from "./component";

export default function ImageHoverRevealPreview() {


  const sharedSrc =
    "https://ik.imagekit.io/ybq4azred/temp_person_color_1784920435220.png";
  const ghibliOverlay =
    "https://ik.imagekit.io/ybq4azred/temp_ghibli_perfect_1784920632003.png";

  return (
    <div className="flex flex-col items-center justify-center p-8 select-none">
      <div className="flex flex-col items-center gap-3">
        <ImageHoverReveal
          src={sharedSrc}
          overlaySrc={ghibliOverlay}
          alt="Avatar Hover Reveal"
          className="h-56 w-56 rounded-3xl border border-neutral-200 bg-neutral-950 shadow-lg dark:border-neutral-800/80"
          
        />
      </div>
    </div>
  );
}
