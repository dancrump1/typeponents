import Link from "./component";

export default function HoverImageLinks() {
    return (
        <section className="bg-neutral-950 p-4 md:p-8">
            <div className="mx-auto max-w-5xl">
                <Link
                    heading="About"
                    subheading="Learn what we do here"
                    imgSrc="/imgs/random/11.jpg"
                    href="#"
                />
                <Link
                    heading="Clients"
                    subheading="We work with great people"
                    imgSrc="/imgs/random/6.jpg"
                    href="#"
                />
                <Link
                    heading="Portfolio"
                    subheading="Our work speaks for itself"
                    imgSrc="/imgs/random/4.jpg"
                    href="#"
                />
                <Link
                    heading="Careers"
                    subheading="We want cool people"
                    imgSrc="/imgs/random/5.jpg"
                    href="#"
                />
                <Link
                    heading="Fun"
                    subheading="Incase you're bored"
                    imgSrc="/imgs/random/10.jpg"
                    href="#"
                />
            </div>
        </section>
    );
};