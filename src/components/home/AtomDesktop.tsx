import React from "react";
import styled, { keyframes } from "styled-components";
import mixins from "../../helpers/mixins";
import { T_Tags } from "../PostTags";
import SvgSwitch from "../SvgSwitch";

export default function AtomDesktop() {
  const Tags: T_Tags[] = ["React", "CSS", "Gatsby", "Nextjs", "Node", "Git"];

  return (
    <AtomDesktopContainer>
      <PulseContainer>
        <PulseDot />
        <PulseCircle />
        <PulseCircle />
        <PulseCircle />
        {Tags.map((svgName, idx) => (
          <TagContainer delay={idx * -1}>
            <SvgSwitch svgName={svgName} />
          </TagContainer>
        ))}
      </PulseContainer>
    </AtomDesktopContainer>
  );
}

// --- styled components ---
const AtomDesktopContainer = styled.div`
  ${mixins.container}
  display: none;
  margin: 0 auto;
  fill: currentColor;
  color: var(--main);

  @media (min-width: 768px) {
    display: block;
  }
`;

const PulseContainer = styled.div`
  position: relative;
  margin: 3rem auto;

  @media (min-width: 768px) {
    height: 27rem /* 432px */;
    width: 27rem /* 432px */;
  }
`;

const PulseDotAnimation = keyframes`
0% {
    width: 6rem;
    height: 6rem;
  }
  50% {
    width: 5rem;
    height: 5rem;
  }
  75%,
  100% {
    width: 6rem;
    height: 6rem;
  }
`;

const PulseDot = styled.div`
  z-index: 1;
  background-color: var(--main);
  height: 6rem;
  width: 6rem;
  border-radius: 9999px;
  position: absolute;
  top: 50%;
  bottom: 50%;
  right: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${PulseDotAnimation} 1s ease infinite;
`;

const PulseRingAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  80%,
  100% {
    opacity: 0;
  }
`;

const PulseCircle = styled.div`
  background-color: var(--main);
  top: 0px;
  left: 0px;
  position: absolute;
  border-radius: 9999px;
  animation: ${PulseRingAnimation} 3s ease infinite;

  @media (min-width: 768px) {
    width: 27rem;
    height: 27rem;
  }

  &:nth-of-type(2) {
    animation-delay: -1s;
  }
  &:nth-of-type(3) {
    animation-delay: -2s;
  }
`;

const TagCircleAnimation = keyframes`
  0% {
    transform: rotate(0deg) translate(-12.5rem) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translate(-12.5rem) rotate(-360deg);
  }
`;

const TagContainer = styled.div<{ delay: number; }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  background-color: white;
  border-radius: 9999px;
  width: 3.5rem;
  height: 3.5rem;
  animation: ${TagCircleAnimation} 6s linear infinite;
  animation-delay: ${p => p.delay}s;

  .dark & {
    background-color: var(--gray-800);
  }
`;
