import { useId } from "react"

/**
 * Lightweight SVG decorations for visual dynamism.
 * All animations are pure CSS — zero JS overhead at runtime.
 */

/* ──────────────────────────────────────────────
   1. ANIMATED PULSE DIVIDER
   Replaces static divider-gradient with a traveling
   luminous dot along a horizontal line.
   ────────────────────────────────────────────── */

export function PulseDivider({ className = "" }: { className?: string }) {
  const id = useId()
  const gradId = `dg${id}`
  const glowId = `dw${id}`

  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 4"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-[2px]"
      >
        {/* Static gradient line */}
        <line
          x1="0"
          y1="2"
          x2="1200"
          y2="2"
          stroke={`url(#${gradId})`}
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        {/* Traveling glow dot */}
        <circle r="3" fill={`url(#${glowId})`} opacity="0.9">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M0,2 L1200,2"
          />
        </circle>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="oklch(0.75 0.14 205)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="oklch(0.75 0.14 205)" stopOpacity="0.5" />
            <stop offset="70%" stopColor="oklch(0.75 0.14 205)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.85 0.14 205)" />
            <stop offset="100%" stopColor="oklch(0.75 0.14 205)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

/* ──────────────────────────────────────────────
   2. FLOATING GEOMETRIC ACCENTS
   Subtle rotating/drifting shapes for section
   backgrounds. Pure CSS keyframes.
   ────────────────────────────────────────────── */

export function FloatingGeometrics({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg className="absolute w-full h-full" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="xMidYMid slice">
        {/* Hexagon — top right */}
        <g opacity="0.04">
          <polygon
            points="60,0 120,35 120,95 60,130 0,95 0,35"
            stroke="oklch(0.75 0.14 205)"
            strokeWidth="1.5"
            fill="none"
            transform="translate(950, 80)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 980 145"
              to="360 980 145"
              dur="60s"
              repeatCount="indefinite"
              additive="sum"
            />
          </polygon>
        </g>

        {/* Diamond — left center */}
        <g opacity="0.035">
          <rect
            x="0"
            y="0"
            width="80"
            height="80"
            rx="4"
            stroke="oklch(0.75 0.14 205)"
            strokeWidth="1"
            fill="none"
            transform="translate(80, 400) rotate(45, 40, 40)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="45 120 440"
              to="405 120 440"
              dur="80s"
              repeatCount="indefinite"
            />
          </rect>
        </g>

        {/* Circle — bottom right */}
        <circle
          cx="1050"
          cy="650"
          r="50"
          stroke="oklch(0.75 0.14 205)"
          strokeWidth="1"
          fill="none"
          opacity="0.03"
        >
          <animate
            attributeName="r"
            values="50;60;50"
            dur="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.03;0.06;0.03"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Small triangle — center top */}
        <g opacity="0.04">
          <polygon
            points="0,50 25,0 50,50"
            stroke="oklch(0.75 0.14 205)"
            strokeWidth="1"
            fill="none"
            transform="translate(550, 120)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 575 145"
              to="-360 575 145"
              dur="50s"
              repeatCount="indefinite"
              additive="sum"
            />
          </polygon>
        </g>

        {/* Dashed orbit ring — center */}
        <circle
          cx="600"
          cy="400"
          r="200"
          stroke="oklch(0.75 0.14 205)"
          strokeWidth="0.5"
          strokeDasharray="4 12"
          fill="none"
          opacity="0.04"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 600 400"
            to="360 600 400"
            dur="90s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  )
}

/* ──────────────────────────────────────────────
   3. CIRCUIT NODES
   Network of connected dots that pulse,
   reinforcing the "Ecosistema" concept.
   ────────────────────────────────────────────── */

export function CircuitNodes({ className = "" }: { className?: string }) {
  const nodes = [
    { cx: 100, cy: 40 },
    { cx: 300, cy: 25 },
    { cx: 500, cy: 50 },
    { cx: 700, cy: 30 },
    { cx: 900, cy: 45 },
    { cx: 1100, cy: 35 },
  ]

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [0, 2], [1, 3], [2, 4], [3, 5],
  ]

  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 80" fill="none" preserveAspectRatio="none" className="w-full h-16 md:h-20">
        {/* Connection lines */}
        {connections.map(([a, b], i) => (
          <line
            key={`conn-${i}`}
            x1={nodes[a].cx}
            y1={nodes[a].cy}
            x2={nodes[b].cx}
            y2={nodes[b].cy}
            stroke="oklch(0.75 0.14 205)"
            strokeWidth="0.5"
            strokeOpacity="0.08"
          />
        ))}

        {/* Nodes with staggered pulse */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            {/* Outer pulse ring */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r="4"
              fill="none"
              stroke="oklch(0.75 0.14 205)"
              strokeWidth="0.5"
              opacity="0"
            >
              <animate
                attributeName="r"
                values="4;12;4"
                dur="3s"
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.15;0"
                dur="3s"
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* Core dot */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r="2"
              fill="oklch(0.75 0.14 205)"
            >
              <animate
                attributeName="opacity"
                values="0.15;0.5;0.15"
                dur="3s"
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Traveling data pulse along main path */}
        <circle r="2" fill="oklch(0.85 0.14 205)" opacity="0.6">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path={`M${nodes[0].cx},${nodes[0].cy} L${nodes[1].cx},${nodes[1].cy} L${nodes[2].cx},${nodes[2].cy} L${nodes[3].cx},${nodes[3].cy} L${nodes[4].cx},${nodes[4].cy} L${nodes[5].cx},${nodes[5].cy}`}
          />
          <animate
            attributeName="opacity"
            values="0.6;0.9;0.6"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  )
}
