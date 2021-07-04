import React, { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import useSound from "use-sound"
// @ts-ignore
import darkPop from "../sounds/darkPop.wav"
// @ts-ignore
import lightPop from "../sounds/lightPop.wav"

interface DarkModeValue {
  toggleDarkMode: () => void
  isBodyDark: boolean
}

// create context and use hook
const DarkModeContext = createContext<DarkModeValue>(null!)
export const useDarkMode = () => useContext(DarkModeContext)

export const DarkModeProvider: React.FC = ({ children }) => {
  // --- hooks ---
  // state
  const [isBodyDark, setIsBodyDark] = useState(true)
  // useSound
  const [playDark] = useSound(darkPop, { volume: 0.25 })
  const [playLight] = useSound(lightPop, { volume: 0.25 })

  // check for dark mode
  useEffect(() => {
    if (
      localStorage.getItem("dark") === "dark" ||
      (localStorage.getItem("dark") !== "light" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.body.classList.add("dark")
    }
  }, [])

  // --- functions ---
  const toggleDarkMode = () => {
    const newIsBodyDark = document.body.classList.contains("dark")
    setIsBodyDark(!newIsBodyDark)
    document.body.classList.toggle("dark")
    if (newIsBodyDark) {
      localStorage.setItem("darkMode", "light")
      playLight()
    } else {
      localStorage.setItem("darkMode", "dark")
      playDark()
    }
  }

  const value = {
    toggleDarkMode,
    isBodyDark,
  }

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  )
}
