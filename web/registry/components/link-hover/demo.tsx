import LinkHover from "./component";

const items = [
    {
        imgUrl: "/itjustworks.jpg",
        title: "Home",
    },
    {
        imgUrl: "/itjustworks.jpg",
        title: "Blog",
    },
    {
        imgUrl: "/itjustworks.jpg",
        title: "About",
    },
];
export default function LinkHoverUsage() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <LinkHover items={items} />
        </div>
    );
}