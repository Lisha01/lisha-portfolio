type Props = { size?: number };

export function FigmaIcon({ size = 22 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 38 57" fill="none">
      <path
        d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z"
        fill="#1ABCFE"
      />
      <path
        d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0Z"
        fill="#0ACF83"
      />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z" fill="#FF7262" />
      <path
        d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z"
        fill="#F24E1E"
      />
      <path
        d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z"
        fill="#A259FF"
      />
    </svg>
  );
}

export function AdobeIcon({ size = 22 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#FA0F00" />
      <path
        d="M9.6 7H7L4 17h2.2l.65-2.2h2.8L10.3 17h2.2L9.6 7Zm-2.3 6 .9-3 .9 3h-1.8ZM17 7h-3.1v10H16c2.4 0 4-2 4-5s-1.6-5-3-5Zm-.8 7.8h-.5V9.2h.5c1.2 0 2 1.1 2 2.8s-.8 2.8-2 2.8Z"
        fill="white"
      />
    </svg>
  );
}

export function ClaudeIcon({ size = 22 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#D97757" />
      <path
        d="M9.1 8.6 6.1 16h1.8l.65-1.7h2.85L12.05 16h1.85L10.9 8.6h-1.8Zm.5 2 .9 2.5H8.6l1-2.5Z"
        fill="white"
      />
      <path
        d="m14.7 8.6 3.1 7.4h-1.9l-.55-1.45-2.6.05.55-1.45h1.5l-.9-2.55-2.1 5.4h-1.85L13.05 8.6h1.65Z"
        fill="white"
      />
    </svg>
  );
}

export function LovableIcon({ size = 22 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#FF5C5C" />
      <path
        d="M12 18.5c-.8-.8-5.5-4-5.5-8a3 3 0 0 1 5.5-1.7A3 3 0 0 1 17.5 10.5c0 4-4.7 7.2-5.5 8Z"
        fill="white"
      />
    </svg>
  );
}

export function FramerIcon({ size = 22 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 21" fill="#0099FF">
      <path d="M0 0h14v7H7L0 0Z" />
      <path d="M0 7h7l7 7H0V7Z" />
      <path d="M0 14h7v7L0 14Z" />
    </svg>
  );
}

export function NotionIcon({ size = 22 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect
        x="0.75"
        y="0.75"
        width="22.5"
        height="22.5"
        rx="3.25"
        fill="white"
        stroke="#191919"
        strokeWidth="1.5"
      />
      <path
        d="M8 6.8v10.4l1.4-.7V11l5.2 6.5h2v-10.4l-1.4.7v6.5L10 6.8H8Z"
        fill="#191919"
      />
    </svg>
  );
}

export function DescriptIcon({ size = 22 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#1A1A1A" />
      <g
        stroke="#FF5C5C"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <line x1="5.5" y1="12" x2="5.5" y2="12" />
        <line x1="8.5" y1="9" x2="8.5" y2="15" />
        <line x1="11.5" y1="6.5" x2="11.5" y2="17.5" />
        <line x1="14.5" y1="9" x2="14.5" y2="15" />
        <line x1="17.5" y1="11" x2="17.5" y2="13" />
      </g>
    </svg>
  );
}

export function PerplexityIcon({ size = 22 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#20808D" />
      <path
        d="M12 5v14M5 12h14"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="m8 8 8 8M16 8l-8 8"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
