import StatusIndicator from "./component";

export default function Usage() {
    return (
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
            <StatusIndicator state="active" label="All systems operational" />
            <StatusIndicator state="down" label="Systems down" />
            <StatusIndicator state="idle" label="Systems idle" />
            <StatusIndicator state="fixing" label="Diagnosing issue, fixing" />		</div>
    );
}