// Default icon: a simple 5-point star, shown until each lab's topic
// is defined and a matching icon (iconPath) is designed for it.
const DEFAULT_ICON_PATH =
  "M24 11 L25.6 15.2 L30 15.4 L26.6 18.2 L27.8 22.5 L24 20 L20.2 22.5 L21.4 18.2 L18 15.4 L22.4 15.2 Z";

// Small circles placed in a ring around the medal's center to build
// the scalloped "rosette" edge. Colors cycle through the site's warm
// neutral trio (accent, terminal success, accent-on-dark) — the same
// tones already used for the terminal's session dots and cursor.
const ROSETTE_BUMPS = [
  { x: 35, y: 18, color: "var(--accent)" },
  { x: 32.9, y: 24.47, color: "var(--terminal-success)" },
  { x: 27.4, y: 28.46, color: "var(--accent-on-dark)" },
  { x: 20.6, y: 28.46, color: "var(--accent)" },
  { x: 15.1, y: 24.47, color: "var(--terminal-success)" },
  { x: 13, y: 18, color: "var(--accent-on-dark)" },
  { x: 15.1, y: 11.53, color: "var(--accent)" },
  { x: 20.6, y: 7.54, color: "var(--terminal-success)" },
  { x: 27.4, y: 7.54, color: "var(--accent-on-dark)" },
  { x: 32.9, y: 11.53, color: "var(--accent)" },
];

function Medal({ status, size = 72, iconPath = DEFAULT_ICON_PATH }) {
  const isUnlocked = status === "unlocked";
  const viewBoxWidth = 48;
  const viewBoxHeight = 66;
  const height = (size * viewBoxHeight) / viewBoxWidth;

  if (!isUnlocked) {
    return (
      <svg
        width={size}
        height={height}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="18"
          r="15"
          stroke="var(--muted)"
          strokeWidth="1.6"
          strokeDasharray="4 3"
        />
        <rect
          x="19"
          y="17"
          width="10"
          height="8"
          rx="1"
          stroke="var(--muted)"
          strokeWidth="1.6"
        />
        <path
          d="M20.5 17 V13.5 a3.5 3.5 0 0 1 7 0 V17"
          stroke="var(--muted)"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={height}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="M14,30 24,30 20,58 14,50 6,58 Z" fill="var(--accent-on-dark)" />
      <path
        d="M34,30 24,30 28,58 34,50 42,58 Z"
        fill="var(--terminal-success)"
      />
      <path d="M21,30 27,30 24,41 Z" fill="var(--accent-hover)" />

      {ROSETTE_BUMPS.map((bump) => (
        <circle
          key={`${bump.x}-${bump.y}`}
          cx={bump.x}
          cy={bump.y}
          r="5.5"
          fill={bump.color}
        />
      ))}

      <circle cx="24" cy="18" r="13" fill="var(--accent)" />
      <path d={iconPath} fill="var(--background)" />
    </svg>
  );
}

export default Medal;
