"use client";


import React from "react";
import PixelToAsciiImage from "./component";

export default function PixelToAsciiImagePreview() {


  return (
    <PixelToAsciiImage
      src="https://ik.imagekit.io/ybq4azred/tr:e-bgremove/cyberpunk_portrait_1786705407136.png"
      width={600}
      height={600}
      charSize={24}
      
    />
  );
}
