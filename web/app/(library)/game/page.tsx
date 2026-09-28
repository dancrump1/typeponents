"use client";

import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const AppWithoutSSR = dynamic(() => import("@/components/PhaserPage"), {
	ssr: false,
});

export default function Home() {
	return <AppWithoutSSR />;
}
