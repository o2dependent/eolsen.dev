import React, { useEffect } from "react"
import styled from "styled-components"
import useSound from "use-sound"
import { useDarkMode } from "../../context/darkModeContext"

import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"

const Header = () => {
  // ---- hooks ----
  const { toggleDarkMode } = useDarkMode()

  return (
    <HeaderContainer>
      {/* --- desktop --- */}
      <DesktopNav toggleDarkMode={toggleDarkMode} />
      {/* --- mobile --- */}
      <MobileNav toggleDarkMode={toggleDarkMode} />
    </HeaderContainer>
  )
}

export default Header

// --- styled components ---
const HeaderContainer = styled.header`
  width: 100%;
  z-index: 20;
  top: 0;
  position: sticky;
  height: 3.75rem;
`
