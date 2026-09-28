"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface FlyingCard {
  id: string | number;
  title: string;
  description: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface ScrollFlyingCardsProps {
  backgroundText?: string;
  cards: FlyingCard[];
  className?: string;
  cardClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  backgroundTextClassName?: string;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;

  animationOffset?: number;
  animationRotation?: number;
  animationScale?: number;
  animationBlur?: number;
}

export const ScrollFlyingCards = ({
  backgroundText = "GREAT UI",
  cards,
  className,
  cardClassName,
  titleClassName,
  descriptionClassName,
  backgroundTextClassName,
  scrollContainerRef,

  animationOffset = 300,
  animationRotation = 10,
  animationScale = 0.85,
  animationBlur = 20,
}: ScrollFlyingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-clip", className)}
      style={{ minHeight: `${(cards.length + 1) * 100}vh` }}
    >
      <div className="pointer-events-none sticky top-0 left-0 z-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <p
          className={cn(
            "text-foreground/5 px-4 text-center text-[12vw] leading-[0.9] font-black break-words whitespace-pre-line select-none md:text-[15vw]",
            backgroundTextClassName,
          )}
        >
          {backgroundText}
        </p>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center">
        {cards.map((card, index) => {
          return (
            <CardItem
              key={card.id}
              card={card}
              index={index}
              totalCards={cards.length}
              scrollContainerRef={scrollContainerRef}
              cardClassName={cardClassName}
              titleClassName={titleClassName}
              descriptionClassName={descriptionClassName}

              animationOffset={animationOffset}
              animationRotation={animationRotation}
              animationScale={animationScale}
              animationBlur={animationBlur}
            />
          );
        })}
      </div>
    </div>
  );
};

const CardItem = ({
  card,
  index,
  scrollContainerRef,
  cardClassName,
  titleClassName,
  descriptionClassName,

  animationOffset = 300,
  animationRotation = 10,
  animationScale = 0.85,
  animationBlur = 20,
}: {
  card: FlyingCard;
  index: number;
  totalCards: number;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  cardClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;

  animationOffset?: number;
  animationRotation?: number;
  animationScale?: number;
  animationBlur?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    container: scrollContainerRef,
    offset: ["start end", "end start"],
  });

  const isEven = index % 2 === 0;

  // Calculate entry and exit values based on direction
  const getTransforms = () => {
    return { x: [0, 0, 0, 0], y: [animationOffset, 0, 0, -animationOffset] };
  };

  const transforms = getTransforms();

  const y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], transforms.y);
  const x = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], transforms.x);

  // Slight rotation based on odd/even
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [
      isEven ? -animationRotation : animationRotation,
      0,
      0,
      isEven ? animationRotation / 2 : -animationRotation / 2,
    ],
  );

  // Smooth fade
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0, 1, 1, 0],
  );

  // Scale effect for depth
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [animationScale, 1, 1, animationScale + 0.05],
  );

  // Blur effect for entering/exiting
  const filter = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [
      `blur(${animationBlur}px)`,
      "blur(0px)",
      "blur(0px)",
      `blur(${animationBlur / 2}px)`,
    ],
  );

  return (
    <div
      ref={cardRef}
      className="flex h-[100vh] w-full items-center justify-center md:h-[120vh]"
    >
      <motion.div
        style={{ x, y, rotate, opacity, scale, filter }}
        className={cn(
          "relative mx-4 flex w-full max-w-sm flex-col overflow-hidden rounded-[2rem] bg-white p-5 md:p-6 dark:bg-neutral-900",
          cardClassName,
          card.className,
        )}
      >
        <div className="mb-4 flex flex-col md:mb-6">
          <h2
            className={cn(
              "mb-1 text-lg font-bold tracking-tight text-neutral-900 md:mb-2 md:text-2xl dark:text-neutral-100",
              titleClassName,
            )}
          >
            {index + 1}. {card.title}
          </h2>
          <p
            className={cn(
              "text-sm leading-[1.5] font-normal text-neutral-600 md:text-[15px] dark:text-neutral-400",
              descriptionClassName,
            )}
          >
            {card.description}
          </p>
        </div>
        <div className="relative flex h-32 w-full items-center justify-center md:h-40 [&>svg]:h-full [&>svg]:w-full [&>svg]:max-w-[140px] md:[&>svg]:max-w-[200px]">
          {card.icon ? (
            card.icon
          ) : card.imageUrl ? (
            <img
              src={card.imageUrl}
              alt={card.title}
              className="h-full w-full object-contain"
            />
          ) : null}
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollFlyingCards;

/**
 * Great UI Component
 *
 * Built with React, TypeScript, Tailwind CSS, and Framer Motion.
 * Designed to be accessible, customizable, and production-ready.
 *
 * Website: https://great-ui.com
 * GitHub: https://github.com/Saurabh-2607/GreatUI
 * X (Great UI): https://x.com/GreatUIHQ
 *
 * Released under the MIT License.
 * Contributions, issues, and feature requests are always welcome.
 *
 * Author: Saurabh Sharma
 * X: https://x.com/srbh_here
 */
