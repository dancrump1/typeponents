"use client";

import React from "react";
import { motion } from "motion/react";

export type PathData = {
  d: string;
  stroke?: string;
  fill?: string;
  strokeWidth?: string;
  transform?: string;
};

export interface AnimatedPathProps {
  className?: string;
  rawSvg?: string;
  paths?: (string | PathData)[];
  viewBox?: string;
  strokeColor?: string;
  strokeWidth?: string | number;
  fillColor?: string;
  pathLengthDuration?: number;
  fillDuration?: number;
  pathDelay?: number;
  fillDelay?: number;
}

function parseSvg(svgString: string) {
  const paths: PathData[] = [];
  const viewBoxMatch = svgString.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 363 513";

  const tagRegex = /<(\/?)(g|path|rect|circle)([^>]*)>/g;
  let match;
  const groupStack: {
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
    transform?: string;
  }[] = [];
  let currentGroup: {
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
    transform?: string;
  } = {};

  while ((match = tagRegex.exec(svgString)) !== null) {
    const isClose = match[1] === "/";
    const tag = match[2];
    const attrsStr = match[3];

    if (isClose) {
      if (tag === "g") {
        groupStack.pop();
        currentGroup =
          groupStack.length > 0 ? groupStack[groupStack.length - 1] : {};
      }
      continue;
    }

    const fillMatch = attrsStr.match(/fill="([^"]+)"/);
    const strokeMatch = attrsStr.match(/stroke="([^"]+)"/);
    const strokeWidthMatch = attrsStr.match(/stroke-width="([^"]+)"/);
    const transformMatch = attrsStr.match(/transform="([^"]+)"/);

    const newTransform = transformMatch ? transformMatch[1] : undefined;
    const combinedTransform = [currentGroup.transform, newTransform]
      .filter(Boolean)
      .join(" ");

    const attrs = {
      fill: fillMatch ? fillMatch[1] : currentGroup.fill,
      stroke: strokeMatch ? strokeMatch[1] : currentGroup.stroke,
      strokeWidth: strokeWidthMatch
        ? strokeWidthMatch[1]
        : currentGroup.strokeWidth,
      transform: combinedTransform || undefined,
    };

    if (tag === "g") {
      groupStack.push(attrs);
      currentGroup = attrs;
    } else {
      let dStr = null;
      if (tag === "path") {
        const dMatch = attrsStr.match(/d="([^"]+)"/);
        dStr = dMatch ? dMatch[1] : null;
      } else if (tag === "rect") {
        const x = parseFloat(attrsStr.match(/x="([^"]+)"/)?.[1] || "0");
        const y = parseFloat(attrsStr.match(/y="([^"]+)"/)?.[1] || "0");
        const w = parseFloat(attrsStr.match(/width="([^"]+)"/)?.[1] || "0");
        const h = parseFloat(attrsStr.match(/height="([^"]+)"/)?.[1] || "0");
        if (w > 0 && h > 0) dStr = `M${x},${y} H${x + w} V${y + h} H${x} Z`;
      } else if (tag === "circle") {
        const cx = parseFloat(attrsStr.match(/cx="([^"]+)"/)?.[1] || "0");
        const cy = parseFloat(attrsStr.match(/cy="([^"]+)"/)?.[1] || "0");
        const r = parseFloat(attrsStr.match(/r="([^"]+)"/)?.[1] || "0");
        if (r > 0)
          dStr = `M${cx - r},${cy} a${r},${r} 0 1,0 ${r * 2},0 a${r},${r} 0 1,0 -${r * 2},0`;
      }

      if (dStr && dStr.length > 5) {
        paths.push({
          d: dStr,
          fill: attrs.fill,
          stroke: attrs.stroke,
          strokeWidth: attrs.strokeWidth,
          transform: attrs.transform,
        });
      }
    }
  }

  return { paths, viewBox };
}

export function AnimatedPath({
  className,
  rawSvg,
  paths: providedPaths,
  viewBox: providedViewBox,
  strokeColor = "#007F7E",
  strokeWidth = "3",
  fillColor = "#007F7E",
  pathLengthDuration = 1.5,
  fillDuration = 0.8,
  pathDelay = 0.1,
  fillDelay = 1.2,
}: AnimatedPathProps) {
  const { paths, viewBox } = React.useMemo(() => {
    if (rawSvg) {
      return parseSvg(rawSvg);
    }

    const parsedPaths = (providedPaths || []).map((p) =>
      typeof p === "string" ? { d: p } : p,
    );

    return {
      paths: parsedPaths,
      viewBox: providedViewBox || "0 0 363 513",
    };
  }, [rawSvg, providedPaths, providedViewBox]);

  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {paths.map((p, i) => {
        const pFill = p.fill === "none" ? "none" : p.fill || fillColor;
        return (
          <motion.path
            key={i}
            d={p.d}
            stroke={p.stroke || strokeColor}
            strokeWidth={p.strokeWidth || strokeWidth}
            transform={p.transform}
            initial={{
              pathLength: 0,
              fill: pFill === "none" ? "none" : pFill,
              fillOpacity: 0,
            }}
            animate={{
              pathLength: 1,
              fillOpacity: pFill === "none" ? 0 : 1,
            }}
            transition={{
              pathLength: {
                duration: pathLengthDuration,
                ease: "easeInOut",
                delay: i * pathDelay,
              },
              fillOpacity: {
                duration: fillDuration,
                ease: "easeOut",
                delay: fillDelay + i * (pathDelay / 2),
              },
            }}
          />
        );
      })}
    </svg>
  );
}

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
