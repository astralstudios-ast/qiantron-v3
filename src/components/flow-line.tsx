import { motion } from "framer-motion";

/**
 * Dragon Flow — a kinetic red→gold pathway that reappears across sections
 * as the visual signature of the QianTron Industrial Flow Engine.
 */
export function FlowLine({
  className = "",
  height = 160,
  reverse = false,
}: {
  className?: string;
  height?: number;
  reverse?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      className={className}
      style={{ height }}
      aria-hidden
    >
      <defs>
        <linearGradient id="flow-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="oklch(0.48 0.19 27)" />
          <stop offset="55%" stopColor="oklch(0.62 0.19 40)" />
          <stop offset="100%" stopColor="oklch(0.78 0.14 82)" />
        </linearGradient>
        <linearGradient id="flow-glow" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="oklch(0.48 0.19 27 / 0)" />
          <stop offset="50%" stopColor="oklch(0.78 0.14 82 / 0.6)" />
          <stop offset="100%" stopColor="oklch(0.78 0.14 82 / 0)" />
        </linearGradient>
      </defs>
      <motion.path
        d={
          reverse
            ? "M1440 80 C 1120 20, 900 140, 720 80 S 320 20, 0 80"
            : "M0 80 C 320 20, 520 140, 720 80 S 1120 20, 1440 80"
        }
        stroke="url(#flow-grad)"
        strokeWidth="1.4"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.circle
        r="3"
        fill="oklch(0.78 0.14 82)"
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{
          offsetPath: reverse
            ? "path('M1440 80 C 1120 20, 900 140, 720 80 S 320 20, 0 80')"
            : "path('M0 80 C 320 20, 520 140, 720 80 S 1120 20, 1440 80')",
        }}
      />
      <rect x="0" y="78" width="1440" height="4" fill="url(#flow-glow)" opacity="0.5" />
    </svg>
  );
}
