import FloatingActionMenu from "./component";

export default function Usage() {
    return (
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
            <FloatingActionMenu options={[
                {
                    label: "Home",
                    onClick: () => {
                        console.log("Home");
                    },
                },
            ]} />
        </div>
    );
}