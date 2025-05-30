import React from 'react'

interface CancelIconProps {
  isIconHovered?: boolean
}

export const CancelIcon: React.FC<CancelIconProps> = React.memo(
  ({ isIconHovered = false }) => {
    return (
      <>
        <svg
          viewBox="0 0 512 512"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          className="cancelIconSVG"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <title>cancel</title>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="work-case"
                fill={isIconHovered ? '#fff' : '#f15a5c'}
                transform="translate(91.520000, 91.520000)"
              >
                <polygon
                  id="Close"
                  points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"
                ></polygon>
              </g>
            </g>
          </g>
        </svg>
      </>
    )
  }
)
