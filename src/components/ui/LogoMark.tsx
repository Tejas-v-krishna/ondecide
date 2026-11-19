import Link from "next/link";

/**
 * OD monogram — the solid disc, the open "D" and the cobalt stem.
 * Geometry is traced from the brand artwork (viewBox 721×375) so the mark
 * keeps its proportions at every size. Flat fills here (no gradient defs)
 * so several instances can render on one page without id collisions.
 */
export function LogoMark({ className = "h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 721 375" className={className} aria-hidden="true">
      <path
        d="M457 21 H533.5 A166.5 166.5 0 0 1 533.5 354 H457"
        fill="none"
        stroke="#0A0A0A"
        strokeWidth="42"
      />
      <rect x="420" y="0" width="10" height="375" rx="1" fill="#4B6BBB" />
      <rect x="392" y="59" width="63" height="255" rx="2" fill="#1F47AB" />
      <circle cx="187.5" cy="187.5" r="188" fill="#0A0A0A" />
    </svg>
  );
}

export function LogoLockup({
  className = "",
  markClassName = "h-6",
  textClassName = "text-[18px] font-semibold tracking-tight text-ink",
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
}) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={`${markClassName} w-auto transition-transform group-hover:-rotate-3`} />
      <span className={textClassName}>OnDecide</span>
    </Link>
  );
}
