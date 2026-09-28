import FabGrid from "./component";
import { HomeIcon } from "lucide-react";

export default function Usage() {
    return (
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
            <FabGrid actions={[
                {
                    link: "https://www.google.com",
                    icon: <HomeIcon className="w-4 h-4" />,
                    name: "Home",
                },
            ]} />
        </div>
    );
}