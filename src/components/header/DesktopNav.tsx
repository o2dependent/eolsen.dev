import { Link } from "gatsby";
import React from "react";
import styled, { keyframes } from "styled-components";
import { useDarkMode } from "../../context/darkModeContext";
import mixins from "../../helpers/mixins";
import { DarkModeButton } from "./DarkModeButton";

export default function DesktopNav({ toggleDarkMode }) {
  // ---- hooks ----
  const { isBodyDark } = useDarkMode();
  return (
    <Container>
      <DesktopLinkContainer>
        <NavHomeLink>
          <Link to="/">Ethan Olsen</Link>
        </NavHomeLink>
        <NavLink>
          <Link to="/posts">Posts</Link>
        </NavLink>
        <NavLink>
          <Link to="/projects">Projects</Link>
        </NavLink>
      </DesktopLinkContainer>
      <DesktopButtonContainer>
        <DarkModeButton maskKey='Desktop' toggleDarkMode={toggleDarkMode} isDarkMode={isBodyDark} />
        <Button to="/contact">contact</Button>
      </DesktopButtonContainer>
    </Container>
  );
}

// --- styled components ---
const Container = styled.nav`
  ${mixins.container}
  height: 100%;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  padding: 0 1rem;
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const Button = styled(Link)`
  height: 100%;
  max-height: 2.5rem;
  width: 5.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 0.25rem;
  color: var(--gray-200);
  background-color: var(--main);

  .dark & {
    color: var(--gray-900);
  }
`;

const NavHomeLink = styled.h2`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const NavLink = styled.h3`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const DesktopLinkContainer = styled.div`
  display: flex;
  column-gap: 1rem;
  height: 100%;
  align-items: flex-end;
`;

const DesktopButtonContainer = styled.div`
  display: flex;
  height: 100%;
  column-gap: 1rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  align-items: center;
`;

const DarkButton = styled.button`
  align-items: center;
  justify-content: center;
  display: none;

  .dark & {
    display: flex;
  }
`;

const LightButton = styled.button`
  align-items: center;
  justify-content: center;
  display: flex;

  .dark & {
    display: none;
  }
`;
