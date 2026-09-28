"use client";


import React from "react";
import { FacebookCard } from "./component";

export default function FacebookCardPreview() {


  return (
    <div className="flex h-full w-full items-center justify-center p-12 select-none">
      <FacebookCard
        username="greatuihq"
        name="Great UI"
        bio="Designing the best React UI components and animated layouts for modern web apps."
        friends="15K"
        mutualFriends="23"
        enableCardTilt={false}
        
      />
    </div>
  );
}
