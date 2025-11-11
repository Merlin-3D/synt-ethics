import { SVGProps } from 'react'

export default function LinkedinIcon({ ...prosp }: SVGProps<SVGSVGElement>) {
  return (
    <svg {...prosp} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_2544_3644)">
        <rect x="2" y="1" width="36" height="36" rx="8" fill="white" />
        <rect x="2.5" y="1.5" width="35" height="35" rx="7.5" stroke="#E5E5E5" />
        <g clip-path="url(#clip0_2544_3644)">
          <path
            d="M27.6676 10H12.3289C11.5941 10 11 10.5801 11 11.2973V26.6992C11 27.4164 11.5941 28 12.3289 28H27.6676C28.4023 28 29 27.4164 29 26.7027V11.2973C29 10.5801 28.4023 10 27.6676 10ZM16.3402 25.3387H13.6684V16.7465H16.3402V25.3387ZM15.0043 15.5758C14.1465 15.5758 13.4539 14.8832 13.4539 14.0289C13.4539 13.1746 14.1465 12.482 15.0043 12.482C15.8586 12.482 16.5512 13.1746 16.5512 14.0289C16.5512 14.8797 15.8586 15.5758 15.0043 15.5758ZM26.3387 25.3387H23.6703V21.1621C23.6703 20.1672 23.6527 18.884 22.2816 18.884C20.893 18.884 20.682 19.9703 20.682 21.0918V25.3387H18.0172V16.7465H20.5766V17.9207H20.6117C20.9668 17.2457 21.8387 16.532 23.1359 16.532C25.8395 16.532 26.3387 18.3109 26.3387 20.6242V25.3387Z"
            fill="#737373"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_2544_3644"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2544_3644" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2544_3644"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_2544_3644">
          <rect width="18" height="18" fill="white" transform="translate(11 10)" />
        </clipPath>
      </defs>
    </svg>
  )
}
