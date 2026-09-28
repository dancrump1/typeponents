import MagnetButton from "./component";

const MagnetButtonExample = () => {
    return (
        <div className="grid min-h-[400px] place-content-center bg-violet-200 p-4">
            <MagnetButton />
        </div>
    );
};

export default function MagnetButtonUsage() {
    return (
        <div>
            <MagnetButtonExample />
        </div>
    );
}