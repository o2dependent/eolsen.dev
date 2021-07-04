import { Link } from "gatsby"
import React, { useState } from "react"
import styled from "styled-components"
import NavProtector from "../navProtector"
import colors from "../../helpers/colors"

export default function MobileNav({ toggleDarkMode }) {
  // --- hooks ---
  // state
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <>
      <Nav>
        <LightButton
          onClick={toggleDarkMode}
          title="Enable dark mode"
          aria-label="Enable dark mode"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4.069 13h-4.069v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312l-2.881-2.881-1.414 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm11.209 1.414l2.881-2.881-1.414-1.414-2.881 2.881c.528.411 1.002.886 1.414 1.414zm-6.312-3.102c.339 0 .672.028 1 .069v-4.069h-2v4.069c.328-.041.661-.069 1-.069zm0 16c-.339 0-.672-.028-1-.069v4.069h2v-4.069c-.328.041-.661.069-1 .069zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-3.033 7.312l2.88 2.88 1.415-1.414-2.88-2.88c-.412.528-.886 1.002-1.415 1.414zm-11.21-1.415l-2.88 2.88 1.414 1.414 2.88-2.88c-.528-.411-1.003-.885-1.414-1.414zm2.312-4.897c0 2.206 1.794 4 4 4s4-1.794 4-4-1.794-4-4-4-4 1.794-4 4zm10 0c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6 6 2.686 6 6z" />
          </svg>
        </LightButton>
        <DarkButton
          onClick={toggleDarkMode}
          title="Enable light mode"
          aria-label="Enable light mode"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17 12c0 2.762-2.238 5-5 5s-5-2.238-5-5 2.238-5 5-5 5 2.238 5 5zm-5-7c.34 0 .672.033 1 .08v-2.08h-2v2.08c.328-.047.66-.08 1-.08zm-4.184 1.401l-1.472-1.473-1.415 1.415 1.473 1.473c.402-.537.878-1.013 1.414-1.415zm9.782 1.414l1.473-1.473-1.414-1.414-1.473 1.473c.537.402 1.012.878 1.414 1.414zm-5.598 11.185c-.34 0-.672-.033-1-.08v2.08h2v-2.08c-.328.047-.66.08-1 .08zm4.185-1.402l1.473 1.473 1.415-1.415-1.473-1.472c-.403.536-.879 1.012-1.415 1.414zm-11.185-5.598c0-.34.033-.672.08-1h-2.08v2h2.08c-.047-.328-.08-.66-.08-1zm13.92-1c.047.328.08.66.08 1s-.033.672-.08 1h2.08v-2h-2.08zm-12.519 5.184l-1.473 1.473 1.414 1.414 1.473-1.473c-.536-.402-1.012-.877-1.414-1.414z" />
          </svg>
        </DarkButton>
        <MenuButton
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
          </svg>
        </MenuButton>
      </Nav>
      <LinkContainer isNavOpen={isNavOpen}>
        <NavProtector type="main" />
        <NavLinkContainer>
          <NavLink onClick={() => setIsNavOpen(false)} to="/">
            Ethan Olsen
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
  )
}

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
`

const LinkContainer = styled.div<{ isNavOpen: boolean }>`
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
`

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
`

const NavLink = styled(Link)`
  width: 100%;
  height: 100%;
  vertical-align: middle;
`

const MenuButton = styled.button`
  transition: transform 250ms ease;

  &:focus {
    transform: scale(1.25);
    outline: none;
  }
`

const DarkButton = styled.button`
  align-items: center;
  justify-content: center;
  display: none;
  transition: transform 250ms ease;

  &:focus {
    transform: scale(1.25);
    outline: none;
  }

  .dark & {
    display: flex;
  }
`

const LightButton = styled.button`
  align-items: center;
  justify-content: center;
  display: flex;
  transition: transform 250ms ease;

  &:focus {
    transform: scale(1.25);
    outline: none;
  }

  .dark & {
    display: none;
  }
`
