import React from "react"
import { createIcon } from "@chakra-ui/icons"

export const Logo = createIcon({
  displayName: "UpDownIcon",
  viewBox: "0 0 329 405",
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <>
      <path
        d="M46.718 53.9561L0 80.6052L187.201 188.846L188.846 405L235.564 378.351L233.59 161.868L46.718 53.9561Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M327.684 108.241L139.825 0L93.107 26.9781L280.966 135.219L282.282 351.373L329 324.395L327.684 108.241Z"
        fill="url(#paint1_linear)"
      />
      <path
        d="M36 155.569L72.8232 313.196L112.476 276.859L87.5339 171.526L36 155.569Z"
        fill="url(#paint2_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="117.782"
          y1="53.9561"
          x2="117.782"
          y2="405"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#0BC5EA" />
          <stop offset="1" stop-color="#56B4D3" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="211.053"
          y1="0"
          x2="211.053"
          y2="351.373"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#0BC5EA" />
          <stop offset="1" stop-color="#56B4D3" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="59.2598"
          y1="150.284"
          x2="95.1205"
          y2="308.13"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#0BC5EA" />
          <stop offset="1" stop-color="#56B4D3" />
        </linearGradient>
      </defs>
    </>
  ),
})
