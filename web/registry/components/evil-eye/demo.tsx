import EvilEye from "./component";

export default function EvilEyeUsage() {
    return (
        <div>

            <EvilEye
                eyeColor="#FF6F37"
                intensity={1.5}
                pupilSize={0.6}
                irisWidth={0.25}
                glowIntensity={0.35}
                scale={0.8}
                noiseScale={1}
                pupilFollow={1}
                flameSpeed={1}
                backgroundColor="#060010"
            />       </div>
    )
}