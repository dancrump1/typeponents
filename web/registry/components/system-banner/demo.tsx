import { SystemBanner } from "./component";

export default function Usage() {
    return (
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
            <SystemBanner text="Development Mode" color="bg-orange-500" size="xs" show={true} color="#f97316" size="md" />
        </div>
    );
}