import SideRays from "./component";

export default function Usage() {
    return (
        <div>
            <SideRays
                speed={2.5}
                rayColor1="#EAB308"
                rayColor2="#96c8ff"
                intensity={2}
                spread={2}
                origin="top-right"
                tilt={0}
                saturation={1.5}
                blend={0.75}
                falloff={1.6}
                opacity={1}
            />		</div>
    );
}