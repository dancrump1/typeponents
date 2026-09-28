import SplitFlapDisplay, { SplitFlapDisplayProps } from "./component";
import { CSSProperties } from "react";

type SplitFlapDisplayWrapperProps = SplitFlapDisplayProps & {
    wrapperClassName?: string;
    wrapperStyle?: CSSProperties;
    minHeight?: CSSProperties["minHeight"];
};

function SplitFlapDisplayWrapper({
    wrapperClassName,
    wrapperStyle,
    minHeight = "100vh",
    fit = "contain",
    ...splitFlapDisplayProps
}: SplitFlapDisplayWrapperProps) {
    return (
        <div
            className={wrapperClassName}
            style={{
                boxSizing: "border-box",
                display: "flex",
                minHeight,
                minWidth: 0,
                width: "100%",
                ...wrapperStyle,
            }}
        >
            <SplitFlapDisplay fit={fit} {...splitFlapDisplayProps} />
        </div>
    );
}

export default function SplitFlapDisplayUsage() {
    return (
        <div>
            <SplitFlapDisplayWrapper
                fit="contain"
                minHeight="100vh"
                wrapperStyle={{
                    display: "flex",
                    minHeight: "100vh",
                }}
                content={["Hello", "World"]}
            />
        </div>
    );
}