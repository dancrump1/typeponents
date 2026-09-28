import AccordionSolutions from "./component";

const solutions = [
    {
        id: 1,
        title: "Individuals",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos laudantium in iusto iure aliquam commodi possimus eaque sit recusandae incidunt?",
        imgSrc:
            "https://media2.giphy.com/media/SsTcO55LJDBsI/giphy.gif?cid=ecf05e47hfid50hu34mzkabzoy46hrftyl6g6656uygzmnpy&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    },
    {
        id: 2,
        title: "Startups",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos laudantium in iusto iure aliquam commodi possimus eaque sit recusandae incidunt?",
        imgSrc:
            "https://media3.giphy.com/media/3oz8xR9wKr8TaazlQc/giphy.gif?cid=ecf05e47izzshtedbk9y9dv6f5yvdsbakp7tth2n58vsdd7p&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    },
    {
        id: 3,
        title: "Enterprise",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos laudantium in iusto iure aliquam commodi possimus eaque sit recusandae incidunt?",
        imgSrc:
            "https://media1.giphy.com/media/VkMV9TldsPd28/giphy.gif?cid=ecf05e478ipd21u861g034loyqpc66eseytcl7lzjbk1wqrh&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    },
];
export default function AccordionSolutionsUsage() {
    return (
        <div>
            <AccordionSolutions solutions={solutions} />
        </div>
    );
}