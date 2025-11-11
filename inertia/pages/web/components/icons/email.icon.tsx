import { SVGProps } from 'react'

export default function EmailIcon({ ...prosp }: SVGProps<SVGSVGElement>) {
  return (
    <svg {...prosp} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_2544_3637)">
        <rect x="2" y="1" width="36" height="36" rx="8" fill="white" />
        <rect x="2.5" y="1.5" width="35" height="35" rx="7.5" stroke="#E5E5E5" />
        <path
          d="M25 28.25H15C11.35 28.25 9.25 26.15 9.25 22.5V15.5C9.25 11.85 11.35 9.75 15 9.75H25C28.65 9.75 30.75 11.85 30.75 15.5V22.5C30.75 26.15 28.65 28.25 25 28.25ZM15 11.25C12.14 11.25 10.75 12.64 10.75 15.5V22.5C10.75 25.36 12.14 26.75 15 26.75H25C27.86 26.75 29.25 25.36 29.25 22.5V15.5C29.25 12.64 27.86 11.25 25 11.25H15Z"
          fill="#737373"
        />
        <path
          d="M19.9998 19.87C19.1598 19.87 18.3098 19.61 17.6598 19.08L14.5298 16.58C14.2098 16.32 14.1498 15.85 14.4098 15.53C14.6698 15.21 15.1398 15.15 15.4598 15.41L18.5898 17.91C19.3498 18.52 20.6398 18.52 21.3998 17.91L24.5298 15.41C24.8498 15.15 25.3298 15.2 25.5798 15.53C25.8398 15.85 25.7898 16.33 25.4598 16.58L22.3298 19.08C21.6898 19.61 20.8398 19.87 19.9998 19.87Z"
          fill="#737373"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2544_3637"
          x="0"
          y="0"
          width="40"
          height="40"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0509804 0 0 0 0 0.0509804 0 0 0 0 0.0705882 0 0 0 0.06 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2544_3637" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2544_3637"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
