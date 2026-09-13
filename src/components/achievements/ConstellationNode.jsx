import { Link } from "react-router-dom";
import useInView from "../../hooks/useInView";
import Medal from "./Medal";

function DownloadIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M12 3v12" />
            <path d="M7 10l5 5 5-5" />
            <path d="M5 21h14" />
        </svg>
    );
}

// Medal is rendered at this fixed size in the constellation, so its
// own rendered height can be computed here too. The vertical anchor
// offset below uses half of that height on purpose: it centers the
// medal itself on the connector line's vertex, instead of centering
// the whole node stack (medal + label + download button), which is
// what made the medal look disconnected from the line.
const MEDAL_SIZE = 80;
const MEDAL_HEIGHT = (MEDAL_SIZE * 66) / 48;

// layout: "absolute" positions the node inside the desktop
// constellation canvas using lab.position (percentages), and shows
// the full title as a hover/focus tooltip above the node. "stack"
// renders it as a normal flow item for the mobile vertical fallback,
// where there's room to print the full title directly (no tooltip,
// since touch has no hover).
function ConstellationNode({ lab, layout }) {
    const [nodeRef, isInView] = useInView({ threshold: 0.3 });
    const isUnlocked = lab.status === "unlocked";
    // Unlocked but no page yet is still "not clickable" — this guard
    // stops the app from crashing if status is flipped to "unlocked"
    // before path is filled in (React Router's Link requires a real
    // route). Fill in path when the lab's page actually exists.
    const canNavigate = isUnlocked && Boolean(lab.path);
    const hasPdf = Boolean(lab.pdfHref);
    const isAbsolute = layout === "absolute";

    const basePositionTransform = isAbsolute
        ? `translate(-50%, -${MEDAL_HEIGHT / 2}px)`
        : "";

    const positionStyle = isAbsolute
        ? {
            position: "absolute",
            left: `${lab.position.x}%`,
            top: `${lab.position.y}%`,
        }
        : {};

    const revealStyle = {
        opacity: isInView ? 1 : 0,
        transform: isInView
            ? `${basePositionTransform} translateY(0)`.trim()
            : `${basePositionTransform} translateY(12px)`.trim(),
        transition: "opacity 0.6s ease, transform 0.6s ease",
    };

    return (
        <div
            ref={nodeRef}
            style={{ ...positionStyle, ...revealStyle }}
            className="group relative flex w-32 flex-col items-center gap-3 text-center"
        >
            {isAbsolute && (
                <div
                    role="tooltip"
                    className="pointer-events-none absolute bottom-full left-1/2 mb-3 w-48 -translate-x-1/2 border border-border bg-surface px-3 py-2 font-mono text-xs leading-5 text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                    {lab.title}
                </div>
            )}

            {canNavigate ? (
                <Link
                    to={lab.path}
                    className="flex flex-col items-center gap-1 transition-transform duration-200 hover:-translate-y-1"
                    aria-label={`Ver ${lab.title}`}
                >
                    <Medal
                        status="unlocked"
                        size={MEDAL_SIZE}
                        iconPath={lab.iconPath ?? undefined}
                    />
                    <span className="text-base font-semibold">
                        {isAbsolute ? lab.shortTitle : lab.title}
                    </span>
                </Link>
            ) : (
                <div className="flex flex-col items-center gap-0.5">
                    <Medal status={isUnlocked ? "unlocked" : "locked"} size={MEDAL_SIZE} />
                    <span
                        className={
                            isUnlocked
                                ? "text-base font-semibold"
                                : "font-mono text-sm tracking-wider text-muted uppercase"
                        }
                    >
                        {isAbsolute ? lab.shortTitle : lab.title}
                    </span>
                </div>
            )}

            {hasPdf ? (
                <a
                    href={lab.pdfHref}
                    download={lab.pdfFilename ?? true}
                    className="flex h-8 w-8 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
                    aria-label={`Descargar informe de ${lab.title}`}
                >
                    <DownloadIcon />
                </a>
            ) : (
                <span
                    aria-disabled="true"
                    title="El informe se publicará cuando el laboratorio esté disponible"
                    className="flex h-8 w-8 cursor-not-allowed items-center justify-center border border-dashed border-border text-muted"
                >
                    <DownloadIcon />
                </span>
            )}
        </div>
    );
}

export default ConstellationNode;