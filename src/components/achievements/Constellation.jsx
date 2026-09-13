import ConstellationNode from "./ConstellationNode";

// A dense, evenly-spaced dot grid behind the constellation, using a
// CSS background pattern (not SVG) so it never distorts regardless of
// the canvas's aspect ratio.
const STAR_FIELD_STYLE = {
    backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
    backgroundSize: "22px 22px",
    opacity: 0.6,
};

// A small subset of stars placed on top of the grid with a slow
// fade/scale animation (see .constellation-star-twinkle in
// index.css), so a few of them read as gently twinkling instead of
// the whole field being static.
const TWINKLING_STARS = [
    { x: 38.8, y: 24.7, size: 3.5, delay: 1.8 },
    { x: 18.6, y: 88.9, size: 3.7, delay: 0.3 },
    { x: 57.3, y: 67.9, size: 2.8, delay: 2.3 },
    { x: 55.0, y: 39.1, size: 3.3, delay: 0.3 },
    { x: 81.9, y: 44.3, size: 3.9, delay: 0.4 },
    { x: 17.6, y: 17.1, size: 3.0, delay: 2.0 },
    { x: 71.0, y: 18.7, size: 3.9, delay: 1.1 },
    { x: 14.8, y: 66.0, size: 3.1, delay: 3.3 },
    { x: 67.8, y: 95.1, size: 2.5, delay: 1.4 },
    { x: 85.2, y: 73.6, size: 3.2, delay: 0.2 },
    { x: 25.7, y: 44.1, size: 3.3, delay: 3.3 },
    { x: 38.7, y: 86.2, size: 3.9, delay: 2.5 },
    { x: 87.8, y: 94.5, size: 2.7, delay: 2.5 },
    { x: 92.8, y: 19.4, size: 3.5, delay: 0.5 },
    { x: 36.0, y: 3.7, size: 3.2, delay: 1.2 },
    { x: 5.3, y: 43.7, size: 3.7, delay: 0.4 },
    { x: 35.0, y: 66.3, size: 3.5, delay: 2.6 },
    { x: 56.4, y: 3.8, size: 3.7, delay: 0.7 },
];

function Constellation({ labs }) {
    const connectors = labs.slice(0, -1).map((lab, index) => {
        const nextLab = labs[index + 1];
        const isActive = lab.status === "unlocked" && nextLab.status === "unlocked";

        return {
            id: `${lab.id}-${nextLab.id}`,
            from: lab.position,
            to: nextLab.position,
            isActive,
        };
    });

    return (
        <>
            {/* Desktop / tablet: scattered constellation layout */}
            <div className="relative hidden md:block" style={{ height: "28rem" }}>
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={STAR_FIELD_STYLE}
                />

                {TWINKLING_STARS.map((star) => (
                    <span
                        key={`${star.x}-${star.y}`}
                        aria-hidden="true"
                        className="constellation-star-twinkle pointer-events-none absolute rounded-full"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            backgroundColor: "var(--accent-on-dark)",
                            animationDelay: `${star.delay}s`,
                        }}
                    />
                ))}

                <svg
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    {connectors.map((connector) => (
                        <line
                            key={connector.id}
                            x1={connector.from.x}
                            y1={connector.from.y}
                            x2={connector.to.x}
                            y2={connector.to.y}
                            stroke={connector.isActive ? "var(--accent)" : "var(--border)"}
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                        />
                    ))}
                </svg>

                {labs.map((lab) => (
                    <ConstellationNode key={lab.id} lab={lab} layout="absolute" />
                ))}
            </div>

            {/* Mobile: simple vertical fallback, no scatter */}
            <div className="flex flex-col items-center gap-10 md:hidden">
                {labs.map((lab) => (
                    <ConstellationNode key={lab.id} lab={lab} layout="stack" />
                ))}
            </div>
        </>
    );
}

export default Constellation;