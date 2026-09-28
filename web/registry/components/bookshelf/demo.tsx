"use client"

import { NewsletterBookshelf, NewsletterBookshelfItem } from "./component";


const editions: NewsletterBookshelfItem[] = [
    {
        id: "edition-04",
        title: "The useful systems issue",
        date: "JUL 24, 2026",
        href: "/posts/useful-systems",
    },
    {
        id: "edition-03",
        title: "A better creative workflow",
        date: "JUL 17, 2026",
        href: "/posts/creative-workflow",
    },
    {
        id: "edition-02",
        title: "Notes on building in public",
        date: "JUL 10, 2026",
        href: "/posts/building-in-public",
        color: "#efe8d4",
    },
    {
        id: "edition-01",
        title: "The small team advantage",
        date: "JUL 3, 2026",
        href: "/posts/small-team-advantage",
        color: "#16277a",
    },
]
export default function BookshelfUsage() {
    return (
        <div>

            <NewsletterBookshelf
                items={editions}
                brand="Studio Notes"
                onSelect={(edition) => console.log("Selected", edition.id)}
            />
        </div>
    );
}
