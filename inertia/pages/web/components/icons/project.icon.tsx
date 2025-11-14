import { SVGProps } from "react";

export default function ProjectIcon({ ...prosp }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...prosp}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.85468 11.3691H17.0437"
        stroke="#636866"
        strokeWidth="1.44"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.9097 11.3522C14.6111 11.021 14.207 10.7161 13.712 10.4302L10.0551 8.31897C8.37759 7.35042 6.8165 7.76994 5.84543 9.45191L4.79218 11.2762"
        stroke="#636866"
        strokeWidth="1.44"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9127 17.1886C15.5973 17.1886 17.179 15.6061 17.179 12.9223L17.2 9.19771C17.2 6.45951 16.2067 5.09 13.5158 5.09H11.3932C10.8545 5.08845 10.3478 4.83507 10.0237 4.40525L9.33895 3.49432C9.01559 3.06373 8.50887 2.80957 7.97021 2.80957H6.47013C3.78553 2.80957 2.79999 4.39126 2.79999 7.07198V12.9223C2.79999 15.6061 4.38479 17.1886 7.0756 17.1886H12.9127Z"
        stroke="#636866"
        strokeWidth="1.44"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
