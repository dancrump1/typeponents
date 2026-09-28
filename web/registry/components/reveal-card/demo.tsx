import RevealCard from "./component";

const RevealCards = () => {
    return (
        <section className="p-8 bg-white">
            <span className="block text-center text-xl font-medium mb-4">
                Hover a card
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <RevealCard
                    title="Build"
                    description="We make pretty buildings"
                    imgSrc="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                />
                <RevealCard
                    title="See?"
                    description="This ones pretty nice"
                    imgSrc="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                />
                <RevealCard
                    title="TALL!"
                    description="We can even do TALL buildings"
                    imgSrc="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                />

                <RevealCard
                    title="Wavy"
                    description="You like wavy buildings?"
                    imgSrc="https://images.unsplash.com/photo-1598818384697-62330d600309?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                />
                <RevealCard
                    title="Modern"
                    description="This one's real blocky"
                    imgSrc="https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80"
                />
                <RevealCard
                    title="Modular"
                    description="That is all :)"
                    imgSrc="https://images.unsplash.com/photo-1547282548-b82b40322759?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                />
            </div>
        </section>
    );
};

export default function RevealCardUsage() {
    return (
        <div>
            <RevealCards />
        </div>
    );
}
