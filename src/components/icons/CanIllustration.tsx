type CanIllustrationProps = {
  id: string;
  colorFrom: string;
  colorTo: string;
  label: string;
  className?: string;
};

export function CanIllustration({ id, colorFrom, colorTo, label, className }: CanIllustrationProps) {
  const gradId = `can-grad-${id}`;
  const glowId = `can-glow-${id}`;

  return (
    <svg
      viewBox="0 0 200 340"
      className={className}
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorFrom} />
          <stop offset="100%" stopColor={colorTo} />
        </linearGradient>
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="100" cy="300" rx="70" ry="14" fill={colorFrom} opacity="0.25" filter={`url(#${glowId})`} />

      <rect x="35" y="40" width="130" height="240" rx="26" fill="#0d0c14" stroke={`url(#${gradId})`} strokeWidth="3" />

      <rect x="35" y="40" width="130" height="240" rx="26" fill={`url(#${gradId})`} opacity="0.08" />

      <rect x="35" y="60" width="130" height="4" fill={colorFrom} opacity="0.5" />
      <rect x="35" y="256" width="130" height="4" fill={colorTo} opacity="0.5" />

      <ellipse cx="100" cy="40" rx="65" ry="12" fill="#1a1824" stroke={`url(#${gradId})`} strokeWidth="2" />
      <ellipse cx="100" cy="280" rx="65" ry="12" fill="#1a1824" stroke={`url(#${gradId})`} strokeWidth="2" />

      <g transform="translate(64 120)">
        <path
          d="M38 0 L4 46 H26 L14 92 L60 34 H36 Z"
          fill={`url(#${gradId})`}
          filter={`url(#${glowId})`}
        />
      </g>

      <circle cx="55" cy="70" r="3" fill={colorTo} opacity="0.9" />
      <circle cx="148" cy="95" r="2.5" fill={colorFrom} opacity="0.8" />
      <circle cx="150" cy="220" r="3" fill={colorTo} opacity="0.7" />
    </svg>
  );
}
