/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Header } from "./Header/Header"
import { FooterFirst } from "./FooterFirst"
import { FooterSecond } from "./FooterSecond"
import { MobileMenu } from "./MobileMenu"

export const MenuContext = React.createContext(false)

export const Layout = ({ children, pageContext: { language, alternateLinks, ...pageContext }, mainP = 3 }) => {
  const [menuOpenState, setMenuOpenState] = useState(false)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          siteTitle: title
          siteUrl: url
        }
      }
    }
  `)
  const {
    site: { siteMetadata },
  } = data
  const alternateLink =
    alternateLinks && alternateLinks.length > 0
      ? alternateLinks.reduce((acc, el) => {
          return el.language !== language ? el : acc
        }, null)
      : null
  return (
    <MenuContext.Provider
      value={{
        isMenuOpen: menuOpenState,
        toggleMenu: () => setMenuOpenState(!menuOpenState),
        stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen),
      }}
    >
      <MobileMenu />
      <div
        id={`page-wrap`}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          variant: "layout.root",
        }}
      >
        <Header {...siteMetadata} {...pageContext} language={language} alternateLink={alternateLink} />

        <main
          sx={{
            width: "100%",
            variant: "layout.main",
            p: mainP,
          }}
        >
          {children}
        </main>
        <footer
          sx={{
            variant: "layout.footerWrap",
          }}
        >
          <FooterFirst />
          <FooterSecond {...siteMetadata} />
        </footer>
      </div>
    </MenuContext.Provider>
  )
}
