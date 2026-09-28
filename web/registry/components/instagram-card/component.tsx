"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface InstagramCardProps {
  username: string;
  name?: string;
  avatarUrl?: string;
  bio?: string;
  posts?: number | string;
  followers?: number | string;
  following?: number | string;
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

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={cn("fill-current", className)}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

export const InstagramCard = ({
  username,
  name = "Instagram User",
  avatarUrl = "https://ik.imagekit.io/niqgaoeg3/Great-UI.png",
  bio = "This is a placeholder bio for Instagram.",
  posts = "120",
  followers = "10K",
  following = "450",
  text = "Follow me on",
  linkText = "Instagram",
  href,
  enableLinkTilt = true,
  linkTiltMaxRotate = 5,
  enableCardTilt = true,
  cardTiltMaxRotate = 5,
  className,
  popoverClassName,
  linkClassName,
  labelClassName,
}: InstagramCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const profileUrl = href || `https://instagram.com/${username}`;

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
          <div className="mb-4 flex items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white dark:bg-neutral-950">
                <img
                  src={avatarUrl}
                  alt={`${name}'s Avatar`}
                  className="h-12 w-12 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-neutral-900 transition-colors dark:text-white">
                  {username}
                </span>
                <InstagramIcon className="h-4 w-4 text-pink-500" />
              </div>
              <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                {name}
              </span>
            </div>
          </div>

          <div className="mb-3 flex items-center gap-4 text-sm text-neutral-900 dark:text-neutral-100">
            <div>
              <span className="font-semibold">{posts}</span> posts
            </div>
            <div>
              <span className="font-semibold">{followers}</span> followers
            </div>
            <div>
              <span className="font-semibold">{following}</span> following
            </div>
          </div>

          <p className="line-clamp-3 text-left text-sm leading-relaxed text-neutral-900 dark:text-neutral-100">
            {bio}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default InstagramCard;

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
