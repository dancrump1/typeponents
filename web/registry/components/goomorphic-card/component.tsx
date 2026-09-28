import { FC } from "react";
import { motion, Variants } from "motion/react";
import styles from "./goomorphic-card.module.css";

// Credit:
// https://react-motion-components.vercel.app/?path=/docs/components-cards-goomorphic-card--docs&globals=outline:!true

export const card: Variants = {
    init: {
        backgroundSize: "120%",
        backgroundPosition: "50% 100%",
        transition: { ease: [0.7, 0, 0, 0.9], type: "tween", duration: 5 },
    },
    anim: {
        backgroundSize: "110%",
        backgroundPosition: "50% 200%",
        filter: ["brightness(1)", "brightness(2)", "brightness(1)"],
        transition: { ease: [0.7, 0, 0, 0.9], type: "tween", duration: 1, delay: 0.9 },
    },
};

export const hr: Variants = {
    init: {
        opacity: 0,
    },
    anim: {
        opacity: 1,
        transition: { type: "tween", duration: 0.5, delay: 1.4 },
    },
};

export const text: Variants = {
    init: {
        filter: "blur(5px)",
        color: "rgba(255,0,0,1)",
    },
    anim: {
        filter: "blur(0px)",
        color: "rgba(255,255,255,0.6)",
        transition: { type: "tween", duration: 1, filter: { type: "tween", delay: 0.8, duration: 1 } },
    },
};

export const socials: Variants & { [key: string]: any } = {
    init: {
        height: 40,
        "--mask":
            "radial-gradient(0px at 50% 0px, #000 99%, #0000 101%) calc(50% - 36px) 0/72px 100%, radial-gradient(0px at 50% 0px, #0000 99%, #000 101%) 50% 0px/72px 100% repeat-x",
    },
    anim: {
        height: [40, 75, 40],
        "--mask": [
            "radial-gradient(0px at 50% 0px, #000 99%, #0000 101%) calc(50% - 36px) 0/72px 100%, radial-gradient(0px at 50% 0px, #0000 99%, #000 101%) 50% 0px/72px 100% repeat-x",
            "radial-gradient(18px at 50% 18px, #000 99%, #0000 101%) calc(50% - 36px) 0/72px 100%, radial-gradient(18px at 50% 0px, #0000 99%, #000 101%) 50% 18px/72px 100% repeat-x",
            "radial-gradient(18px at 50% 18px, #000 99%, #0000 101%) calc(50% - 36px) 0/72px 100%, radial-gradient(18px at 50% 0px, #0000 99%, #000 101%) 50% 18px/72px 100% repeat-x",
            "radial-gradient(0px at 50% 0px, #000 99%, #0000 101%) calc(50% - 36px) 0/72px 100%, radial-gradient(0px at 50% 0px, #0000 99%, #000 101%) 50% 0px/72px 100% repeat-x",
        ],
        transition: {
            ease: [0.85, 0, 0.15, 0.6],
            type: "tween",
            duration: 1.5,
            "--mask": { delay: 0.2, duration: 0.65 },
            height: { duration: 1 },
        },
    },
};

export const meta: Variants & { [key: string]: any } = {
    init: {
        bottom: [-30, -30, -30],
        height: [40, 40, 40],
        width: "70%",
        borderRadius: 0,
        "--mask":
            "radial-gradient(0px at 50% calc(100% - 0px), #000 99%, #0000 101%) calc(50% - 36px) 0/72px 100%, radial-gradient(0px at 50% calc(100% + 0px), #0000 99%, #000 101%) 50% calc(100% - 0px) / 72px 100% repeat-x",
    },
    anim: {
        bottom: [-30, 115, 70],
        height: [40, 70, 40],
        width: ["70%", "90%", "100%"],
        borderRadius: [0, 0, 50],
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        "--mask": [
            "radial-gradient(0px at 50% calc(100% - 0px), #000 99%, #0000 101%) calc(50% - 36px) 0/72px 100%, radial-gradient(0px at 50% calc(100% + 0px), #0000 99%, #000 101%) 50% calc(100% - 0px) / 72px 100% repeat-x",
            "radial-gradient(18px at 50% calc(100% - 18px), #000 99%, #0000 101%) calc(50% - 36px) 0/72px 100%, radial-gradient(18px at 50% calc(100% + 0px), #0000 99%, #000 101%) 50% calc(100% - 18px) / 72px 100% repeat-x",
            "radial-gradient(18px at 50% calc(100% - 18px), #000 99%, #0000 101%) calc(50% - 36px) 0/72px 100%, radial-gradient(18px at 50% calc(100% + 0px), #0000 99%, #000 101%) 50% calc(100% - 18px) / 72px 100% repeat-x",
            "radial-gradient(0px at 50% calc(100% - 0px), #000 99%, #0000 101%) calc(50% - 36px) 0/72px 100%, radial-gradient(0px at 50% calc(100% + 0px), #0000 99%, #000 101%) 50% calc(100% - 0px) / 72px 100% repeat-x",
        ],
        transition: {
            duration: 1.5,
            type: "tween",
            ease: [0.9, 0, 0.15, 0.6],
            "--mask": { delay: 0.2, duration: 0.65 },
            height: { duration: 0.9 },
        },
    },
};

const MapIcon: FC = () => {
    return (
        <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Icon-Set-Filled" transform="translate(-206.000000, -413.000000)" fill="#ffffff20">
                        <path
                            d="M232,430 C232,430.553 231.552,431 231,431 C230.448,431 230,430.553 230,430 L230,422 C230,421.448 230.448,421 231,421 C231.552,421 232,421.448 232,422 L232,430 L232,430 Z M224,433 C224,433.553 223.552,434 223,434 C222.448,434 222,433.553 222,433 L222,427 C222,426.448 222.448,426 223,426 C223.552,426 224,426.448 224,427 L224,433 L224,433 Z M216,434 C216,434.553 215.552,435 215,435 C214.448,435 214,434.553 214,434 L214,424 C214,423.448 214.448,423 215,423 C215.552,423 216,423.448 216,424 L216,434 L216,434 Z M230,413 L222,419 L214,416 L206,421 L206,445 L214,440 L222,443 L230,437 L238,443 L238,419 L230,413 L230,413 Z"
                            id="map"
                        ></path>
                    </g>
                </g>
            </g>
        </svg>
    );
};

const CameraIcon: FC = () => {
    return (
        <svg viewBox="0 -2 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Icon-Set-Filled" transform="translate(-258.000000, -467.000000)" fill="#ffffff20">
                        <path
                            d="M286,471 L283,471 L282,469 C281.411,467.837 281.104,467 280,467 L268,467 C266.896,467 266.53,467.954 266,469 L265,471 L262,471 C259.791,471 258,472.791 258,475 L258,491 C258,493.209 259.791,495 262,495 L286,495 C288.209,495 290,493.209 290,491 L290,475 C290,472.791 288.209,471 286,471 Z M274,491 C269.582,491 266,487.418 266,483 C266,478.582 269.582,475 274,475 C278.418,475 282,478.582 282,483 C282,487.418 278.418,491 274,491 Z M274,477 C270.687,477 268,479.687 268,483 C268,486.313 270.687,489 274,489 C277.313,489 280,486.313 280,483 C280,479.687 277.313,477 274,477 L274,477 Z"
                            id="camera"
                        ></path>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export type DataType = {
    location: string;
    device: string;
    name: string;
    user: string;
    url: string;
};

const GoomorphicCard: FC<DataType> = (data: DataType) => {
    const { location, device, name, user, url } = data;

    return (
        <motion.div
            className={styles.card}
            variants={card}
            initial="init"
            whileHover="anim"
            style={{
                backgroundImage: `url(${url})`,
            }}
        >
            <div className={styles.container}>
                <motion.div className={styles.meta} variants={meta}>
                    <motion.p variants={text}>
                        <MapIcon />
                        <span>{location}</span>
                    </motion.p>

                    <motion.p variants={text}>
                        <span>{device}</span>
                        <CameraIcon />
                    </motion.p>
                </motion.div>
                <motion.div className={styles.socials} variants={socials}>
                    <motion.hr variants={hr} />
                    <p>{name}</p>
                    <p>{user} on Unsplash</p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default GoomorphicCard;