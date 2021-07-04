import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import styled, { keyframes, StyledComponent } from "styled-components";
import NavProtector from "../navProtector";
import colors from "../../helpers/colors";
import { useDarkMode } from "../../context/darkModeContext";
import { animated, AnimatedComponent, useSpring, } from '@react-spring/web';
import { DarkModeButton } from "./DarkModeButton";

export default function MobileNav({ toggleDarkMode }) {
  // --- hooks ---
  // state
  const [isNavOpen, setIsNavOpen] = useState(false);
  // dark mode
  const { isBodyDark } = useDarkMode();
  // on nav change
  useEffect(() => {
    // lock scroll
    document.body.style.overflow = isNavOpen ? 'hidden' : '';
  }, [isNavOpen]);
  // spring
  const menuButtonSpring = useButtonSpring();

  return (
    <>
      {isNavOpen &&
        <NavShadow isDarkMode={isBodyDark} onClick={() => setIsNavOpen(false)} />
      }
      <Nav>
        <DarkModeButton maskKey="mobile" toggleDarkMode={toggleDarkMode} isDarkMode={isBodyDark} />
        <MenuButton
          {...menuButtonSpring}
          isNavOpen={isNavOpen}
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Open menu"
        >
          <svg width="30" height="30" viewBox="0 0 100 100">
            <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
            <path className="line line2" d="M 20,50 H 80" />
            <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
          </svg>
        </MenuButton>
      </Nav>
      <LinkContainer isNavOpen={isNavOpen}>
        <NavProtector type="main" />
        <NavLinkContainer>
          <NavLink onClick={() => setIsNavOpen(false)} to="/">
            Home
          </NavLink>
        </NavLinkContainer>
        <NavLinkContainer>
          <NavLink onClick={() => setIsNavOpen(false)} to="/posts">
            Posts
          </NavLink>
        </NavLinkContainer>
        <NavLinkContainer>
          <NavLink onClick={() => setIsNavOpen(false)} to="/projects">
            Projects
          </NavLink>
        </NavLinkContainer>
        <NavLinkContainer>
          <NavLink onClick={() => setIsNavOpen(false)} to="/contact">
            Contact
          </NavLink>
        </NavLinkContainer>
      </LinkContainer>
    </>
  );
}


const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const useButtonSpring = () => {
  const [xys, set] = useState([0, 0, 1]);
  // > spring
  const props = useSpring({
    xys, config: {
      mass: 1,
      tension: 100,
      friction: 26,
      clamp: true,
      precision: 0.5,
      velocity: 0.05,
      easing: (t) => t
    }
  });

  // ---- functions -----
  const onDown = () => {
    set([0, 0, 1.15]);
  };
  const onReset = () => {
    set([0, 0, 1]);
  };

  return {
    onFocus: onDown,
    onMouseDown: onDown,
    onTouchStart: onDown,
    onMouseLeave: onReset,
    onBlur: onReset,
    onMouseUp: onReset,
    onTouchEnd: onReset,
    style: { transform: props.xys.to(trans) }
  };
};

// --- styled components ---
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.75rem;
  padding: 1rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const LinkContainer = styled.div<{ isNavOpen: boolean; }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 10;
  top: 0;
  position: fixed;
  padding: 1rem;
  background-color: ${colors.gray[200]};
  overflow: hidden;

  opacity: ${p => (p.isNavOpen ? "1" : "0")};
  transform: ${p => (p.isNavOpen ? "translateY(0)" : "translateY(-100%)")};
  transition: transform 750ms ease, opacity 750ms ease;

  @media (min-width: 768px) {
    display: none;
  }

  .dark & {
    background-color: ${colors.gray[900]};
  }
`;

const NavLinkContainer = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  font-weight: 500;
  border-bottom-width: 2px;
  border-color: ${colors.gray[400]};
  font-size: 1.875rem;
  line-height: 2.25rem;
`;

const NavLink = styled(Link)`
  width: 100%;
  height: 100%;
  vertical-align: middle;
`;

const Button = styled(animated.button)`
  user-select: none;
`;

const MenuButton = styled(Button) <{ isNavOpen: boolean; }>`
  transition: transform 250ms ease;
  display: flex;
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0;

& .line {
  fill: none;
  stroke: currentColor;
  stroke-width: 6;
  transition: stroke-dasharray 1000ms cubic-bezier(0.2, 0, 0.1, 1),
    stroke-dashoffset 1000ms cubic-bezier(0.2, 0, 0.1, 1);
}
& .line1 {
  stroke-dasharray: ${p => p.isNavOpen ? '90 207' : '60 207'};
  stroke-dashoffset: ${p => p.isNavOpen ? -134 : 0};
  stroke-width: 6;
}
& .line2 {
  stroke-dasharray: ${p => p.isNavOpen ? '1 60' : '60 60'};
  stroke-dashoffset: ${p => p.isNavOpen ? -30 : 0};
  stroke-width: 6;
}
& .line3 {
  stroke-dasharray: ${p => p.isNavOpen ? '90 207' : '60 207'};
  stroke-dashoffset: ${p => p.isNavOpen ? -134 : 0};
  stroke-width: 6;
}

  &:focus {
    outline: none;
  }

  .dark & {

  }
`;



const FadeIn = keyframes`
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(5px);
  }
`;

const NavShadow = styled.div<{ isDarkMode: boolean; }>`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${p => p.isDarkMode ? '#12121240' : '#fafafa40'};
  width: 100%;
  height: 100%;
  animation: ${FadeIn} 500ms ease;
  backdrop-filter: blur(5px);
`;