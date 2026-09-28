import TextLoop from "./component";

export default function TextLoopUsage() {
    return (
        <TextLoop
            text="React ✦ Bits"
            shape="wave"
            speed={90}
            direction="forward"
            separator="✦"
            curviness={90}
            fontSize={46}
            fontWeight={800}
            letterSpacing={2}
            uppercase
            color="#ffffff"
            ribbon
            ribbonColor="#5227FF"
            ribbonWidth={86}
            pauseOnHover
        />
    )
}