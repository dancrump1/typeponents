import EchoText from "./component";

export default function EchoTextUsage() {
    return (

        <EchoText
            text="Motion Echo"
            echoes={12}
            lag={0.24}
            offset={36}
            direction="right"
            fade={0.72}
            blur={3}
            tint="#7dd3fc"
            mode="both"
            cursorRadius={320}
            duration={900}
            ease="ease-out"
            fontSize="clamp(3rem, 9vw, 7rem)"
            fontWeight={800}
            color="#f8fafc"
        />
    )
}