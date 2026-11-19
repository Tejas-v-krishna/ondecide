import Link from "next/link";

/**
 * OD monogram — solid disc overlapping an open ring, with a blue seam.
 * Renders as a single inline SVG so it stays crisp at any size.
 */
export function LogoMark({ className = "h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 24" className={className} fill="none" aria-hidden="true">
      <circle cx="11" cy="12" r="9.6" fill="#0A0F1E" />
      <circle cx="27.4" cy="12" r="9.6" stroke="#0A0F1E" strokeWidth="2.6" />
      <rect x="23.6" y="2.2" width="2.6" height="19.6" rx="1.3" fill="#1F47AB" />
    </svg>
  );
}

export function LogoLockup({
  className = "",
  markClassName = "h-5",
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
