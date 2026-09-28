"use client";

import { createContext, useContext, useState } from "react";

type HoverContextType = {
	hovered: string | null;
	setHovered: (id: string | null) => void;
	hovering: boolean;
	setHovering: (value: boolean) => void;
};

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export function HoverProvider({ children }: { children: React.ReactNode }) {
	const [hovered, setHovered] = useState<string | null>("about");
	const [hovering, setHovering] = useState<boolean>(false);

	return (
		<HoverContext.Provider
			value={{ hovered, setHovered, hovering, setHovering }}
		>
			{children}
		</HoverContext.Provider>
	);
}

export function useHover() {
	const ctx = useContext(HoverContext);
	if (!ctx) throw new Error("useHover must be used within HoverProvider");
	return ctx;
}
