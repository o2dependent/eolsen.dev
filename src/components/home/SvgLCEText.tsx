import React from "react";
import styled from "styled-components";
import { useDarkMode } from "../../context/darkModeContext";
import mixins from "../../helpers/mixins";

export default function SvgLCEText() {
  // ---- hooks ----
  const { isBodyDark } = useDarkMode();

  return (
    <DesktopSvgContainer>
      <DesktopSvg viewBox="0 0 185 16">
        <defs>
          <linearGradient
            id="rainbow"
            x1="0"
            x2="100%"
            y1="0"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FDB32D" offset="0%" />
            <stop stopColor="#FF845F" offset="50%" />
            <stop stopColor="#FF5F8A" offset="100%" />
          </linearGradient>
          <linearGradient
            id="darkRainbow"
            x1="0"
            x2="100%"
            y1="0"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00ECA1" offset="0%" />
            <stop stopColor="#6F84F4" offset="50%" />
            <stop stopColor="#F256CC" offset="100%" />
          </linearGradient>
        </defs>
        <text
          fill={isBodyDark ? "url(#darkRainbow)" : "url(#rainbow)"}
          style={{ textAnchor: "middle" }}
          x="50%"
          y="15"
        >
          LEARN CREATE ENJOY
        </text>
      </DesktopSvg>
      {/* --- mobile --- */}
      <MobileSvg style={{ textAnchor: "middle" }} viewBox="0 0 65 60">
        <defs>
          <linearGradient
            id="rainbowMobile"
            x1="0"
            x2="100%"
            y1="0"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FDB32D" offset="0%" />
            <stop stopColor="#FF845F" offset="50%" />
            <stop stopColor="#FF5F8A" offset="100%" />
          </linearGradient>
          <linearGradient
            id="darkRainbowMobile"
            x1="0"
            x2="100%"
            y1="0"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00ECA1" offset="0%" />
            <stop stopColor="#6F84F4" offset="50%" />
            <stop stopColor="#F256CC" offset="100%" />
          </linearGradient>
        </defs>
        <text
          fill={isBodyDark ? "url(#darkRainbowMobile)" : "url(#rainbowMobile)"}
          x="50%"
          y="16"
        >
          LEARN
        </text>
        <text
          fill={isBodyDark ? "url(#darkRainbowMobile)" : "url(#rainbowMobile)"}
          x="50%"
          y="32"
        >
          CREATE
        </text>
        <text
          fill={isBodyDark ? "url(#darkRainbowMobile)" : "url(#rainbowMobile)"}
          x="50%"
          y="48"
        >
          ENJOY
        </text>
      </MobileSvg>
    </DesktopSvgContainer>
  );
}

// --- styled components ---

const DesktopSvgContainer = styled.div`
  ${mixins.container}
  margin: 0 auto;
  margin-top: 2.5rem;

  @media (min-width: 768px) {
    margin-top: 3.75rem;
  }
`;

const DesktopSvg = styled.svg`
  display: none;
  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    display: block;
  }
`;

const MobileSvg = styled.svg`
  width: 100%;
  height: 100%;
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;
