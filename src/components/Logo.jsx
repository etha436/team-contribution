export default function Logo({ size = 72, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Team Contributions logo"
    >
      <defs>
        <linearGradient id="logoBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1D57E8" />
          <stop offset="100%" stopColor="#0B2A75" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#logoBlue)" />
      <circle cx="50" cy="50" r="48" fill="none" stroke="#E23744" strokeWidth="4" strokeDasharray="4 8" opacity="0.55" />
      <path
        d="M28 33 C28 29.5 30.8 27 34 27 L66 27 C69.2 27 72 29.5 72 33 C72 36.5 69.2 39 66 39 L57 39 L57 63 C57 70 62 71.5 65 71.5 C67 71.5 68.5 71 68.5 71 C69.5 74.5 67.5 78 63.5 78.8 C58 79.8 44.5 78.5 44.5 63.5 L44.5 39 L34 39 C30.8 39 28 36.5 28 33 Z"
        fill="#FFFFFF"
      />
      <circle cx="65" cy="70" r="6.5" fill="#E23744" />
    </svg>
  )
}
