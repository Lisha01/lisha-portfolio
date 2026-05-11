"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  /** Multi-line label, e.g. ["7+", "YEARS OF", "EXPERIENCE"]. */
  lines: string[];
  /** Tailwind classes positioning the pointer (e.g. "top-[20%] left-[6%]"). */
  className?: string;
  /** Text alignment of the label block. */
  align?: "left" | "right";
  /** Polyline points (SVG coords) for the L-shaped leader line. */
  svgPoints: string;
  svgWidth: number;
  svgHeight: number;
  /** Tailwind classes positioning the SVG relative to the label container. */
  svgPosition: string;
  /** Direction the terminal arrow points — into the figure. */
  arrow?: "left" | "right";
  /** Color for text, leader line, dot, and arrow. Defaults to white. */
  color?: string;
  /** Drop the text shadow (use for labels on lighter parts of the gradient). */
  noShadow?: boolean;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  /** strokeDashoffset (1 → 0) for the draw-on effect. */
  draw: MotionValue<number>;
};

const DEFAULT_COLOR = "rgba(255,255,255,0.9)";

export function PointerLabel({
  lines,
  className,
  align = "left",
  svgPoints,
  svgWidth,
  svgHeight,
  svgPosition,
  arrow,
  color = DEFAULT_COLOR,
  noShadow = false,
  opacity,
  y,
  draw,
}: Props) {
  // Last point of the polyline = the arrow tip
  const points = svgPoints.split(" ").map((p) => p.split(",").map(Number));
  const tip = points[points.length - 1];
  const tipX = tip[0];
  const tipY = tip[1];

  // Arrow fades in during the final 20% of the line draw (draw goes 1 → 0).
  const arrowOpacity = useTransform(draw, [0.2, 0], [0, 1]);

  return (
    <div
      className={cn(
        "absolute z-[6] scale-[0.55] sm:scale-[0.7] md:scale-100",
        align === "right" ? "origin-top-right" : "origin-top-left",
        className
      )}
    >
    <motion.div
      style={{ opacity, y, willChange: "transform, opacity" }}
    >
      <div
        className={cn(
          "relative inline-block",
          align === "right" ? "text-right" : "text-left"
        )}
      >
        {lines.map((line, i) => (
          <p
            key={i}
            className="whitespace-nowrap font-mono text-[15px] font-semibold uppercase leading-[1.55] tracking-[0.16em]"
            style={{
              color,
              textShadow: noShadow ? "none" : "0 1px 8px rgba(14,23,41,0.55)",
            }}
          >
            {line}
          </p>
        ))}

        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className={cn("overflow-visible", svgPosition)}
          aria-hidden
        >
          <motion.polyline
            points={svgPoints}
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            style={{
              strokeDashoffset: draw,
              willChange: "stroke-dashoffset",
            }}
          />
          {/* Small starting tick so the line origin is grounded */}
          <circle
            cx={points[0][0]}
            cy={points[0][1]}
            r="1.8"
            fill={color}
          />
          {/* Arrow head at the line's terminal tip, pointing into the figure */}
          {arrow === "right" && (
            <motion.polygon
              points={`${tipX - 6},${tipY - 4} ${tipX},${tipY} ${tipX - 6},${tipY + 4}`}
              fill={color}
              style={{ opacity: arrowOpacity }}
            />
          )}
          {arrow === "left" && (
            <motion.polygon
              points={`${tipX + 6},${tipY - 4} ${tipX},${tipY} ${tipX + 6},${tipY + 4}`}
              fill={color}
              style={{ opacity: arrowOpacity }}
            />
          )}
        </svg>
      </div>
    </motion.div>
    </div>
  );
}
