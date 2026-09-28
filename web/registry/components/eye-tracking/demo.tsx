import { EyeTracking } from "./component"

export default function EyeTrackingUsage() {
    return (
        <div>
            <EyeTracking
                eyeCount={3}
                eyeSize={100}
                gap={30}
                irisColor="#8B5CF6"
                irisColorSecondary="#A78BFA"
            />
        </div>
    )
}