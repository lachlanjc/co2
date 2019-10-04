import React from 'react'

const Arc = ({ value = 2 / 3, strokeWidth = 2, size = 128, ...props }) => {
  const R = 16 - strokeWidth
  const C = 2 * Math.PI * R
  return (
    <svg {...props} viewBox="0 0 32 32" width={size} height={size}>
      <circle
        cx={16}
        cy={16}
        r={R}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={C}
        strokeDashoffset={C - value * C}
        strokeLinecap="round"
        transform="rotate(-90 16 16)"
      />
    </svg>
  )
}

const Stat = ({ value, label, color = 'currentColor' }) => (
  <div>
    <Arc />
    <span className="value">{value}</span>
    <span className="label">{label}</span>
    <style jsx>{`
      div {
        color: ${color};
        display: inline-flex;
        flex-direction: column;
        text-align: center;
        position: relative;
        padding: 2.5rem 1rem;
        height: 128px;
        width: 128px;
        line-height: 1;
        margin: 1rem;
      }
      @media (max-width: 24em) {
        div {
          margin: 0.25rem;
        }
      }
      div :global(svg) {
        transform: rotate(-120deg);
        position: absolute;
        left: 0;
        top: 0;
      }
      .value {
        font-size: 2.5rem;
        font-weight: 800;
        margin-bottom: 0.75rem;
      }
      .label {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 0.875rem;
      }
    `}</style>
  </div>
)

export default Stat
