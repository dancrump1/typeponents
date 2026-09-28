"use client";


import React from "react";
import AnimatedLink from "./component";

export default function AnimatedLinkPreview() {


  return (
    <div className="flex w-full items-center justify-center p-12 select-none">
      <AnimatedLink
        href="#"
        className="text-4xl font-semibold transition-colors"
        
      >
        Hover over me
      </AnimatedLink>
    </div>
  );
}
