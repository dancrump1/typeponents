"use client";
import React, { useRef } from "react";
import { PixelSwipeText } from "./component";




export default function PixelSwipeTextPreview() {



  

  return (
    <div className="w-full select-none">
      <div className="flex h-screen w-full items-center justify-center text-center text-lg font-semibold text-neutral-500 dark:text-neutral-400">
        Scroll down
      </div>

      <div className="flex h-screen w-full flex-col items-center justify-center gap-0 px-4 text-center">
        <div className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl md:text-2xl dark:text-white">
          <PixelSwipeText  />
        </div>
        <div className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl md:text-2xl dark:text-white">
          <PixelSwipeText >
            Crafted For Next-Gen Interfaces
          </PixelSwipeText>
        </div>
        <div className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl md:text-2xl dark:text-white">
          <PixelSwipeText >
            High Performance Fluid Motion
          </PixelSwipeText>
        </div>
        <div className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl md:text-2xl dark:text-white">
          <PixelSwipeText >
            Autonomous Enterprise Studio
          </PixelSwipeText>
        </div>
      </div>

      <div className="flex h-screen w-full items-center justify-center text-center text-lg font-semibold text-neutral-500 dark:text-neutral-400">
        Scroll up
      </div>
    </div>
  );
}
