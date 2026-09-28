import SpringCard from "./component";

const SpringCards = () => {
    return (
        <section className="bg-white px-8 py-24">
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
                <SpringCard
                    title="Dynamic"
                    subtitle="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem doloremque vitae minima."
                />
                <SpringCard
                    title="Data Driven"
                    subtitle="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem doloremque vitae minima."
                    className="bg-indigo-300"
                    containerClassName="sm:-translate-y-6"
                />
                <SpringCard
                    title="Dutiful"
                    subtitle="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem doloremque vitae minima."
                    className="bg-red-300"
                />
                <SpringCard
                    title="Demure"
                    subtitle="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem doloremque vitae minima."
                    className="bg-yellow-300"
                    containerClassName="sm:-translate-y-6"
                />
            </div>
        </section>
    );
};

export default function SpringCardsUsage() {
    return (
        <div>
            <SpringCards />
        </div>
    );
}