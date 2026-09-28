import InteractiveTeam from "./component";

const teamMembers = [
    {
        name: "John Doe",
        img: "/itjustworks.jpg",
    },
];
export default function InteractiveTeamUsage() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <InteractiveTeam teamMembers={teamMembers} />
        </div>
    );
}