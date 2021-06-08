import React from 'react'

type LogoProps = {
  height?: string;
  width?: string;
}

export const Logo: React.FC<LogoProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || "329"}
      height={props.height || "405"}
      fill="none"
      viewBox="0 0 329 405"
    >
      <path
        fill="url(#paint0_linear)"
        d="M46.718 53.956L0 80.606l187.201 108.24L188.846 405l46.718-26.649-1.974-216.483L46.718 53.956z"
      ></path>
      <path
        fill="url(#paint1_linear)"
        d="M327.684 108.241L139.825 0 93.107 26.978 280.966 135.22l1.316 216.154L329 324.395l-1.316-216.154z"
      ></path>
      <path
        fill="url(#paint2_linear)"
        d="M36 155.569l36.823 157.627 39.653-36.337-24.942-105.333L36 155.569z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="117.782"
          x2="117.782"
          y1="53.956"
          y2="405"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0BC5EA"></stop>
          <stop offset="1" stopColor="#56B4D3"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="211.053"
          x2="211.053"
          y1="0"
          y2="351.373"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0BC5EA"></stop>
          <stop offset="1" stopColor="#56B4D3"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="59.26"
          x2="95.121"
          y1="150.284"
          y2="308.13"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0BC5EA"></stop>
          <stop offset="1" stopColor="#56B4D3"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};
