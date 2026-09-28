import StrokeText from "./component";

export default function StrokeTextUsage() {
    return (
        <StrokeText
            text="Draw Attention"
            strokeColor="#A78BFA"
            fillColor="#F8FAFC"
            strokeWidth={1.4}
            drawDuration={1.6}
            fillDelay={0.2}
            stagger={0.05}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            fontSize={128}
            fontWeight={800}
            letterSpacing={-4}
            reverse={false}
        />
    )
}