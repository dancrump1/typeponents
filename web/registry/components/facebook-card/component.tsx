"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface FacebookCardProps {
  username: string;
  name?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  bio?: string;
  friends?: number | string;
  mutualFriends?: number | string;
  text?: string;
  linkText?: string;
  href?: string;
  enableLinkTilt?: boolean;
  linkTiltMaxRotate?: number;
  enableCardTilt?: boolean;
  cardTiltMaxRotate?: number;
  className?: string;
  popoverClassName?: string;
  linkClassName?: string;
  labelClassName?: string;
}

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={cn("fill-current", className)}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const FacebookCard = ({
  username,
  name = "Facebook User",
  avatarUrl = "https://ik.imagekit.io/niqgaoeg3/Great-UI.png",
  bannerUrl = "https://ik.imagekit.io/niqgaoeg3/banner.png",
  bio = "This is a placeholder bio for Facebook.",
  friends = "1.2K",
  mutualFriends = "12",
  text = "Connect on",
  linkText = "Facebook",
  href,
  enableLinkTilt = true,
  linkTiltMaxRotate = 5,
  enableCardTilt = true,
  cardTiltMaxRotate = 5,
  className,
  popoverClassName,
  linkClassName,
  labelClassName,
}: FacebookCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const profileUrl = href || `https://facebook.com/${username}`;

  const linkRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hoverType, setHoverType] = useState<"none" | "link" | "card">("none");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, (val) => {
    const maxRotate =
      hoverType === "link" ? linkTiltMaxRotate : cardTiltMaxRotate;
    const pct = (val + 20) / 40;
    return maxRotate - pct * (2 * maxRotate);
  });
  const rotateY = useTransform(mouseXSpring, (val) => {
    const maxRotate =
      hoverType === "link" ? linkTiltMaxRotate : cardTiltMaxRotate;
    const pct = (val + 20) / 40;
    return -maxRotate + pct * (2 * maxRotate);
  });

  const handleLinkMouseMove = (e: React.MouseEvent) => {
    if (!enableLinkTilt || !linkRef.current) {
      x.set(0);
      y.set(0);
      return;
    }
    const rect = linkRef.current.getBoundingClientRect();
    const nx =
      ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 20;
    const ny =
      ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 20;
    x.set(nx);
    y.set(ny);
  };

  const handleCardMouseMove = (e: React.MouseEvent) => {
    if (!enableCardTilt || !cardRef.current) {
      x.set(0);
      y.set(0);
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const nx =
      ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 20;
    const ny =
      ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 20;
    x.set(nx);
    y.set(ny);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoverType("none");
    x.set(0);
    y.set(0);
  };

  const popoverStyle = {
    x: mouseXSpring,
    rotateX,
    rotateY,
    transformStyle: "preserve-3d" as const,
  };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "text-lg font-medium text-neutral-900/60 transition-colors dark:text-neutral-100/60",
          labelClassName,
        )}
      >
        {text}
      </span>
      <div
        className="relative flex w-max flex-col items-center [perspective:1000px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={linkRef}
          onMouseEnter={() => {
            setHoverType("link");
            if (!enableLinkTilt) {
              x.set(0);
              y.set(0);
            }
          }}
          onMouseMove={handleLinkMouseMove}
          className="cursor-pointer"
        >
          <a href={profileUrl} target="_blank" rel="noopener noreferrer">
            <span
              className={cn(
                "text-lg font-medium text-neutral-900/60 underline underline-offset-4 transition-all duration-300 hover:text-neutral-900 dark:text-neutral-100/60 dark:hover:text-neutral-100",
                linkClassName,
              )}
            >
              {linkText}
            </span>
          </a>
        </div>

        <motion.div
          ref={cardRef}
          onMouseEnter={() => {
            setHoverType("card");
            if (!enableCardTilt) {
              x.set(0);
              y.set(0);
            }
          }}
          onMouseMove={handleCardMouseMove}
          initial="hidden"
          style={popoverStyle}
          animate={isHovered ? "visible" : "hidden"}
          variants={{
            hidden: {
              opacity: 0,
              y: 6,
              scale: 0.98,
              filter: "blur(2px)",
              pointerEvents: "none",
              transformOrigin: "bottom center",
              transition: { duration: 0.15, ease: "easeIn" },
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              pointerEvents: "auto",
              transformOrigin: "bottom center",
              transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className={cn(
            "absolute bottom-full z-50 mb-4 w-80 rounded-2xl border border-dashed border-neutral-300 bg-white/95 p-4 shadow-xl backdrop-blur-md transition-colors after:absolute after:top-full after:left-0 after:h-4 after:w-full dark:border-dashed dark:border-neutral-800 dark:bg-neutral-950/80",
            popoverClassName,
          )}
        >
          <div className="relative -mx-4 -mt-4 h-24 overflow-hidden rounded-t-2xl bg-neutral-100 dark:bg-neutral-900">
            {bannerUrl ? (
              <img
                src={bannerUrl}
                alt="Cover"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-r from-blue-100 to-blue-200 dark:from-neutral-800 dark:to-neutral-900" />
            )}
          </div>

          <div className="relative mb-2 flex items-start justify-between">
            <img
              src={avatarUrl}
              alt={`${name}'s Avatar`}
              className="relative z-10 -mt-10 h-[72px] w-[72px] rounded-full border-4 border-white bg-neutral-100 object-cover shadow-sm dark:border-neutral-950 dark:bg-neutral-900"
            />
            <div className="mt-2 text-[#1877f2] dark:text-white">
              <FacebookIcon className="h-6 w-6" />
            </div>
          </div>

          <div className="flex flex-col text-left">
            <span className="text-lg leading-snug font-bold text-neutral-900 transition-colors dark:text-white">
              {name}
            </span>
            <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
              {friends} friends · {mutualFriends} mutual
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-left text-sm leading-relaxed text-neutral-900 dark:text-neutral-100">
            {bio}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FacebookCard;

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
