/**
 * Rough vertical brush-stripe band — the CTA background.
 * A stripe pattern warped by fractal noise, then feathered at the
 * top and bottom so it reads as a soft curtain rather than a shape.
 */
export function StripeBand({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <pattern id="stripe-a" width="26" height="420" patternUnits="userSpaceOnUse">
          <rect width="11" height="420" fill="#93A5DA" />
          <rect x="15" width="4" height="420" fill="#B7C3E8" />
        </pattern>
        <pattern id="stripe-b" width="58" height="420" patternUnits="userSpaceOnUse">
          <rect x="6" width="7" height="420" fill="#7C90CE" opacity="0.5" />
          <rect x="34" width="13" height="420" fill="#A9B8E6" opacity="0.65" />
        </pattern>
        <filter id="warp-a" x="-20%" y="-10%" width="140%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.02" numOctaves="4" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="34" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="warp-b" x="-20%" y="-10%" width="140%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="3" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <linearGradient id="stripe-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="14%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="86%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      <rect width="1200" height="420" fill="#F6F6F8" />
      <g filter="url(#warp-a)" opacity="0.55">
        <rect width="1200" height="420" fill="url(#stripe-a)" />
      </g>
      <g filter="url(#warp-b)" opacity="0.32">
        <rect width="1200" height="420" fill="url(#stripe-b)" />
      </g>
      <rect width="1200" height="420" fill="url(#stripe-fade)" />
    </svg>
  );
}
