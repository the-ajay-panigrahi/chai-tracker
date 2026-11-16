export const Spark = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
    <path
      fill="currentColor"
      d="m50 0 9 33L85 15 67 41l33 9-33 9 18 26-26-18-9 33-9-33-26 18 18-26L0 50l33-9L15 15l26 18Z"
    />
  </svg>
);

const ChaiArt = ({ className = "", small = false }) => (
  <svg
    className={className}
    viewBox="0 0 320 300"
    fill="none"
    aria-hidden="true"
  >
    {!small && (
      <g stroke="currentColor" strokeWidth="7" strokeLinecap="round">
        <path d="M111 64c-25-23 24-29 4-55M160 57c-25-24 23-31 6-53M206 65c-24-22 21-29 6-50" />
      </g>
    )}
    <path
      d="M235 111h21c61 0 60 91-4 91h-22"
      fill="#f9f5ea"
      stroke="#191919"
      strokeWidth="9"
    />
    <path
      d="M242 135h15c27 0 23 40-6 40h-13"
      fill="#d3e978"
      stroke="#191919"
      strokeWidth="7"
    />
    <path
      d="m65 105 16 129c6 44 142 44 150 0l18-129"
      fill="#f9f5ea"
      stroke="#191919"
      strokeWidth="9"
      strokeLinejoin="round"
    />
    <ellipse
      cx="157"
      cy="105"
      rx="92"
      ry="26"
      fill="#c47840"
      stroke="#191919"
      strokeWidth="9"
    />
    <path
      d="M89 103c30-12 100-14 135 0"
      stroke="#efc59b"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <g fill="#191919">
      <ellipse cx="124" cy="165" rx="7" ry="11" />
      <ellipse cx="190" cy="165" rx="7" ry="11" />
    </g>
    <path
      d="M145 188q13 16 27 0"
      stroke="#191919"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <ellipse cx="106" cy="185" rx="12" ry="6" fill="#ef81a2" />
    <ellipse cx="207" cy="185" rx="12" ry="6" fill="#ef81a2" />
    <path
      d="M48 266c28 20 190 21 220-2"
      stroke="#191919"
      strokeWidth="8"
      strokeLinecap="round"
    />
  </svg>
);
export default ChaiArt;
