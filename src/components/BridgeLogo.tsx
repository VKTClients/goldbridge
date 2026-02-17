export default function BridgeLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main arch */}
      <path
        d="M20,45 Q100,2 180,45"
        stroke="url(#goldGrad)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Bridge deck */}
      <path
        d="M8,48 Q100,30 192,48"
        stroke="url(#goldGrad)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Left tower */}
      <rect x="42" y="20" width="5" height="28" rx="1" fill="url(#goldGrad)" />
      {/* Right tower */}
      <rect x="153" y="20" width="5" height="28" rx="1" fill="url(#goldGrad)" />

      {/* Vertical railings - left section */}
      <line x1="54" y1="22" x2="50" y2="38" stroke="url(#goldGradLight)" strokeWidth="1" />
      <line x1="62" y1="18" x2="56" y2="36" stroke="url(#goldGradLight)" strokeWidth="1" />
      <line x1="70" y1="15" x2="63" y2="34" stroke="url(#goldGradLight)" strokeWidth="1" />
      <line x1="78" y1="13" x2="70" y2="33" stroke="url(#goldGradLight)" strokeWidth="1" />
      <line x1="86" y1="11" x2="77" y2="32" stroke="url(#goldGradLight)" strokeWidth="1" />
      <line x1="94" y1="10" x2="85" y2="31" stroke="url(#goldGradLight)" strokeWidth="1" />

      {/* Vertical railings - right section */}
      <line x1="146" y1="22" x2="150" y2="38" stroke="url(#goldGradLight)" strokeWidth="1" />
      <line x1="138" y1="18" x2="144" y2="36" stroke="url(#goldGradLight)" strokeWidth="1" />
      <line x1="130" y1="15" x2="137" y2="34" stroke="url(#goldGradLight)" strokeWidth="1" />
      <line x1="122" y1="13" x2="130" y2="33" stroke="url(#goldGradLight)" strokeWidth="1" />
      <line x1="114" y1="11" x2="123" y2="32" stroke="url(#goldGradLight)" strokeWidth="1" />
      <line x1="106" y1="10" x2="115" y2="31" stroke="url(#goldGradLight)" strokeWidth="1" />

      {/* Left approach span */}
      <path
        d="M2,52 Q10,50 20,48"
        stroke="url(#goldGrad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right approach span */}
      <path
        d="M180,48 Q190,50 198,52"
        stroke="url(#goldGrad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Left tower caps */}
      <rect x="40" y="18" width="9" height="3" rx="1" fill="url(#goldGrad)" />
      <rect x="40" y="46" width="9" height="3" rx="1" fill="url(#goldGrad)" />

      {/* Right tower caps */}
      <rect x="151" y="18" width="9" height="3" rx="1" fill="url(#goldGrad)" />
      <rect x="151" y="46" width="9" height="3" rx="1" fill="url(#goldGrad)" />

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#B8942E" />
        </linearGradient>
        <linearGradient id="goldGradLight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#B8942E" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
