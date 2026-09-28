import { ParticleGalaxy } from "./component"

export default function Usage() {
    return (
        <div className="relative h-screen w-full">
            <ParticleGalaxy />
            <div className="relative z-10 flex items-center justify-center h-full">
                <h1 className="text-6xl font-bold">Your Content Here</h1>
            </div>
        </div>
    )
}