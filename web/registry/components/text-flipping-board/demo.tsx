"use client";
import { TextFlippingBoard } from "./component";
import React, { useState, useEffect, useCallback } from "react";

const MESSAGES: string[] = [
    "STAY HUNGRY \nSTAY IN BED \n- STEVE JOBS",
    "What did you get done this week?",
    "I burned $20 \nfor this shit.",
    "DONT WORRY \nBE HAPPY FFS.",
    "LADIES AND GENTLEMEN \nWELCOME TO F#!@# C!@$",
];

export function TextFlippingBoardDemo() {
    const [msgIdx, setMsgIdx] = useState(0);

    const next = useCallback(
        () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
        [],
    );

    useEffect(() => {
        const id = setInterval(next, 3000);
        return () => clearInterval(id);
    }, [next]);

    return (
        <div className="flex w-full flex-col items-center justify-center gap-8 py-20">
            <TextFlippingBoard text={MESSAGES[msgIdx]} />
        </div>
    );
}

export default TextFlippingBoardDemo;
