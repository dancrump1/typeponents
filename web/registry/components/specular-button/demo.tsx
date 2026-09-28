import SpecularButton from "./component";

export default function SpecularButtonUsage() {
    return (
        <SpecularButton
            size="lg"
            radius={20}
            tint="#ffffff"
            tintOpacity={0}
            blur={20}
            textColor="#f5f5f5"
            lineColor="#ffffff"
            baseColor="#ff0000"
            intensity={2.2}
            shineSize={5}
            shineFade={40}
            thickness={3.4}
            speed={1.85}
            followMouse={false}
            proximity={500}
            autoAnimate
            onClick={() => console.log('clicked')}
        >
            Get Started
        </SpecularButton>

    )
}