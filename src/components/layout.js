import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import styled from "styled-components"
import colors from "../helpers/colors"
import mixins from "../helpers/mixins"
import { DarkModeProvider } from "../context/darkModeContext"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <DarkModeProvider>
      <LayoutContainer>
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <Main>{children}</Main>
        <Footer>
          <FooterContainer>
            <FooterLinkContainer>
              <FooterLink>
                <a
                  href="https://github.com/o2dependent"
                  target="_blank"
                  rel="noreferrer"
                  title="Github"
                >
                  <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </FooterLink>
              <FooterLink>
                <a
                  href="ethan@eolsen.dev"
                  target="_blank"
                  rel="noreferrer"
                  title="E-Mail"
                >
                  <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .02c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.99 6.98l-6.99 5.666-6.991-5.666h13.981zm.01 10h-14v-8.505l7 5.673 7-5.672v8.504z" />
                  </svg>
                </a>
              </FooterLink>
              <FooterLink>
                <a
                  href="https://www.linkedin.com/in/eolsendev"
                  target="_blank"
                  rel="noreferrer"
                  title="Linkedin"
                >
                  <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                  </svg>
                </a>
              </FooterLink>
            </FooterLinkContainer>
            <Copr>
              © {new Date().getFullYear()}, Handcrafted by Ethan Olsen
            </Copr>
          </FooterContainer>
        </Footer>
      </LayoutContainer>
    </DarkModeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

// --- styled components ---

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${colors.gray[200]};

  .dark & {
    color: ${colors.white};
    background-color: ${colors.gray[900]};
  }
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Footer = styled.footer`
  background-color: ${colors.white};
  height: 7rem;
  padding-top: 1rem;
  padding-bottom: 1rem;

  .dark & {
    background-color: ${colors.gray[800]};
  }
`

const FooterContainer = styled.div`
  ${mixins.container}
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  height: 100%;
`

const Copr = styled.p`
  margin: 0 auto;
  color: ${colors.gray[400]};
`

const FooterLinkContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2.5rem;
  width: max-content;
  margin: 0 auto;
  color: ${colors.gray[400]};
`

const FooterLink = styled.div`
  height: 3rem;
  width: 3rem;
`
