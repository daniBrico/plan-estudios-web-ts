import { type JSX } from 'react'

export const RightArrowSvg = (): JSX.Element => {
  return (
    <svg
      viewBox="0 0 24 24"
      id="right-arrow"
      data-name="Flat Line"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <line
          id="primary"
          x1="3"
          y1="12"
          x2="21"
          y2="12"
          style={{
            fill: 'none',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: '2'
          }}
        ></line>
        <polyline
          id="primary-2"
          data-name="primary"
          points="18 15 21 12 18 9"
          style={{
            fill: 'none',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: '2'
          }}
        ></polyline>
      </g>
    </svg>
  )
}
