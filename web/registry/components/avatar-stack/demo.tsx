"use client";

import React from "react";
import AvatarStack from "./component";


const DEMO_USERS = [
  {
    name: "John Doe",
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
  },
  {
    name: "Jane Smith",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
  },
  {
    name: "Alice Johnson",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
  },
  {
    name: "Bob Wilson",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  },
];

export default function AvatarStackPreview() {


  return (
    <div className="mx-auto flex min-h-[400px] w-full items-center justify-center p-8 select-none">
      <AvatarStack users={DEMO_USERS}  />
    </div>
  );
}
